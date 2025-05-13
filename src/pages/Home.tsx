import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceModal from '../components/ServiceModal';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const services = [
  {
    title: 'AC Installation',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    desc: 'AC Installation, Comprehensive AC Diagnosis, Service & Maintenance by professionals.'
  },
  {
    title: 'AC Repair',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    desc: 'Expert repairs for all major AC brands. Quick troubleshooting & guaranteed solutions.'
  },
  {
    title: 'Gas Filling',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    desc: 'Prompt and reliable gas filling for all types of air conditioners.'
  },
  {
    title: 'AC Repair',  // Intentional dupe for matching design
    image: 'https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=400&q=80',
    desc: 'We provide fast and affordable in-home AC repairs and diagnostics.'
  }
];

const acProducts = [
  {
    title: 'Voltas 182V CZJ 1.5 Ton',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'Voltas 182V CZJ 1.5 Ton',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'Voltas 182V CZJ 1.5 Ton',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80'
  }
];

const testimonials = [
  {
    name: 'Pranav Kumar',
    feedback: 'Capable & skilled engineers for installation & repair. Transparent pricing & prompt service. I highly recommend their AC repair solutions.'
  }
];

const Home = ({ user, openAuth }: { user: any, openAuth: () => void }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [detailService, setDetailService] = useState<any>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '' });
  const [bookingStatus, setBookingStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleBookNow(e: any) {
    e.preventDefault();
    setBookingStatus('');
    if (!user) {
      setBookingStatus('Please login before booking.');
      openAuth();
      return;
    }
    if (!form.name || !form.email || !form.phone || !form.service) {
      setBookingStatus('Please fill all fields.');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        ...form,
        userId: user.uid,
        bookedAt: Timestamp.now()
      });
      setBookingStatus('Booking successful! We will contact you soon.');
      setForm({ name: '', email: '', phone: '', service: '' });
    } catch (err) {
      setBookingStatus('Failed to book. Please try again.');
    }
    setLoading(false);
  }

  return (
    <div className="bg-[#F5F8FD] min-h-screen flex flex-col justify-between">
      <Navbar user={user} onLogin={openAuth} />
      <ServiceModal open={modalOpen} onClose={() => setModalOpen(false)} service={detailService} />
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto mt-8 px-4">
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row items-center gap-6 relative">
          <img
            src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
            alt="AC hero"
            className="w-[320px] h-44 object-cover rounded-xl shadow-md"
          />
          <div className="w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Your Complete AC Solution:<br />
              <span className="text-blue-700 font-extrabold">Buy, Sell, Repair</span>, All in One Place
            </h2>
            <div className="flex flex-wrap gap-2 text-sm mb-2">
              <span className="px-3 py-1 bg-blue-50 rounded shadow text-blue-700">AC Services</span>
              <span className="px-3 py-1 bg-blue-50 rounded shadow text-blue-700">AC Gas Charging</span>
              <span className="px-3 py-1 bg-blue-50 rounded shadow text-blue-700">AC Repair</span>
            </div>
            <form onSubmit={handleBookNow} className="flex flex-wrap items-center gap-2 mt-1 mb-1">
              <input type="text" className="border px-2 py-1 rounded w-32" placeholder="Full Name*" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <input type="email" className="border px-2 py-1 rounded w-40" placeholder="Email Id*" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              <input type="text" className="border px-2 py-1 rounded w-40" placeholder="Phone Number*" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              <select className="border px-2 py-1 rounded w-36" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}>
                <option value=''>Choose Service*</option>
                {services.map((s, idx) => <option key={idx} value={s.title}>{s.title}</option>)}
              </select>
              <button type="submit" disabled={loading} className="bg-blue-700 text-white px-4 py-1.5 rounded-lg ml-2 disabled:opacity-50">{loading ? 'Booking...' : 'Book Now'}</button>
            </form>
            {bookingStatus && <div className={bookingStatus.includes('success') ? 'text-green-600 text-sm pt-1' : 'text-red-600 text-sm pt-1'}>{bookingStatus}</div>}
          </div>
        </div>
      </div>
      {/* Services Section */}
      <div className="mt-12 mx-auto max-w-5xl px-4">
        <h3 className="text-center text-xl font-bold mb-6 text-blue-800">Our Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <div key={i} className="bg-white rounded-xl shadow flex items-center gap-4 pr-4 hover:shadow-lg transition">
              <img src={s.image} alt={s.title} className="w-32 h-24 object-cover rounded-l-xl" />
              <div>
                <h4 className="font-semibold mb-1">{s.title}</h4>
                <div className="text-sm text-gray-600 mb-2">{s.desc}</div>
                <button onClick={() => { setModalOpen(true); setDetailService(s); }} className="inline-block px-3 py-1 text-xs rounded bg-blue-50 text-blue-700 border border-blue-300 hover:bg-blue-700 hover:text-white">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Old Listed AC Products */}
      <div className="my-12 px-4 max-w-5xl mx-auto">
        <h3 className="text-xl font-bold mb-4 text-blue-800">Old Listed AC Products</h3>
        <div className="flex gap-6 flex-wrap">
          {acProducts.map((prod, i) => (
            <div key={i} className="bg-white rounded-xl shadow flex flex-col items-center p-4 w-52">
              <img src={prod.image} alt={prod.title} className="w-40 h-28 object-cover rounded mb-2" />
              <div className="text-center font-medium text-sm mb-1">{prod.title}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonials */}
      <div className="bg-white max-w-5xl mx-auto px-4 py-8 rounded-2xl shadow mb-12">
        <h3 className="text-xl font-bold mb-4 text-blue-800">What Are Happy Customers Saying !</h3>
        <div className="flex items-center gap-6">
          {/* Testimonial Card (no face/avatar) */}
          <div className="bg-blue-50 rounded-xl p-4 flex-1">
            <div className="text-base text-blue-800 font-semibold mb-2">{testimonials[0].name}</div>
            <div className="text-sm text-gray-700">{testimonials[0].feedback}</div>
          </div>
          <div className="bg-blue-100 rounded-xl p-4 max-w-xs flex-1">
            <div className="text-blue-700 font-semibold mb-1">Looking to sell your Old AC?</div>
            <div className="mb-2 text-sm">List for free & get best price instantly.</div>
            <Link to="/sell" className="px-4 py-2 rounded bg-blue-700 text-white font-medium">Sell Now</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home;
