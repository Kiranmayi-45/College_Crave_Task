import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { db, storage } from '../firebaseConfig';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';

const SellersPage = ({ user, openAuth }: { user: any, openAuth: () => void }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    brand: '',
    year: '',
    type: 'Window',
    dimensions: '',
    owners: 1,
    price: '',
    image: null as File | null
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function handlePostAC(e: any) {
    e.preventDefault();
    setStatus('');
    if (!user) {
      setStatus('Please log in to post your AC.');
      openAuth();
      return;
    }
    if (!form.title || !form.description || !form.brand || !form.year || !form.type || !form.dimensions || !form.owners || !form.price || !form.image) {
      setStatus('Please fill all fields (add an image).');
      return;
    }
    setLoading(true);
    try {
      // Upload image
      const imgRef = ref(storage, `acImages/${user.uid}_${Date.now()}_${form.image.name}`);
      await uploadBytes(imgRef, form.image);
      const imgUrl = await getDownloadURL(imgRef);
      // Save listing
      await addDoc(collection(db, 'ac-listings'), {
        ...form,
        image: imgUrl,
        owners: Number(form.owners),
        year: Number(form.year),
        price: Number(form.price),
        userId: user.uid,
        postedAt: Timestamp.now(),
      });
      setStatus('AC posted successfully!');
      setForm({ title:'', description:'', brand:'', year:'', type:'Window', dimensions:'', owners:1, price:'', image:null });
    } catch(err) {
      setStatus('Error posting listing. Try again.');
    }
    setLoading(false);
  }

  return (
    <div className="bg-[#F5F8FD] min-h-screen flex flex-col">
      <Navbar user={user} onLogin={openAuth} />
      <main className="flex-1 max-w-2xl mx-auto px-4 mt-10">
        <h2 className="font-semibold text-xl text-blue-700 mb-6">Post Your Old AC</h2>
        <form className="bg-white rounded-2xl shadow px-8 py-8 flex flex-col gap-5" onSubmit={handlePostAC}>
          <div>
            <label className="block text-sm font-medium mb-1">Write Heading/Ads</label>
            <input
              type="text"
              className="border px-3 py-2 rounded w-full"
              required
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Write Description</label>
            <textarea
              className="border px-3 py-2 rounded w-full resize-none"
              rows={3}
              required
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Select Brand</label>
              <input
                type="text"
                className="border px-3 py-2 rounded w-full"
                value={form.brand}
                onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Enter Manufacturing Year</label>
              <input
                type="number"
                className="border px-3 py-2 rounded w-full"
                min="1970"
                max="2025"
                value={form.year}
                onChange={e => setForm(f => ({ ...f, year: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Select Type</label>
              <select
                className="border px-3 py-2 rounded w-full"
                value={form.type}
                onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
              >
                <option>Window</option>
                <option>Split</option>
                <option>Portable</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Enter Dimensions of your AC</label>
              <input
                type="text"
                className="border px-3 py-2 rounded w-full"
                placeholder="e.g. 100x50x20cm"
                value={form.dimensions}
                onChange={e => setForm(f => ({ ...f, dimensions: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">No. of Owners (Select one)</label>
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((n) => (
                <label key={n} className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="owners"
                    value={n}
                    checked={Number(form.owners) === n}
                    onChange={() => setForm(f => ({ ...f, owners: n }))}
                    className="mr-2"
                  />
                  {n}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Set a Price</label>
            <input
              type="number"
              className="border px-3 py-2 rounded w-full"
              min="1"
              required
              value={form.price}
              onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Add Image/s & Photo of Your AC</label>
            <input
              type="file"
              accept="image/*"
              className="border px-3 py-2 rounded w-full"
              required
              onChange={e => setForm(f => ({ ...f, image: e.target.files && e.target.files[0] }))}
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-2 rounded font-semibold text-lg hover:bg-blue-800 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post Now'}
            </button>
          </div>
          {status && (
            <div className={(status.includes('success') ? 'text-green-700' : 'text-red-700') + " text-sm mt-2"}>
              {status}
            </div>
          )}
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default SellersPage;
