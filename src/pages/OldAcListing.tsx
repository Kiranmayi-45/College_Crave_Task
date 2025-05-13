import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const acListings = [
  {
    title: 'Blue Star 1.5 Ton',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    features: [
      'Brand: Blue Star',
      'Smart WiFi AC',
      '1.5 Ton',
      'Copper condenser',
      'Good filter',
    ],
    details: 'AC with awesome experience. Smart AC with Smart filter. Good filter and copper condenser for long-term use.'
  },
  {
    title: 'Blue Star 1.5 Ton',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    features: [
      'Brand: Blue Star',
      'Smart WiFi AC',
      '1.5 Ton',
      'Copper condenser',
      'Good filter',
    ],
    details: 'AC with awesome experience. Smart AC with Smart filter. Good filter and copper condenser for long-term use.'
  }
  // Add more as needed
];

const OldAcListing = ({ user, openAuth }: { user: any, openAuth: () => void }) => {
  function handleBtn(type: 'cart' | 'buy') {
    alert(type === 'cart' ? 'Added to cart!' : 'Redirecting to purchase flow!');
  }

  return (
    <div className="bg-[#F5F8FD] min-h-screen flex flex-col">
      <Navbar user={user} onLogin={openAuth} />
      <main className="max-w-5xl mx-auto flex-1 px-4 mt-10">
        <h2 className="font-semibold text-xl text-blue-700 mb-6">Old Listed ACs</h2>
        <div className="flex flex-col gap-8">
          {acListings.map((ac, i) => (
            <div key={i} className="bg-white rounded-2xl shadow px-6 py-6 flex gap-6 items-start flex-wrap md:flex-nowrap">
              <img src={ac.image} alt={ac.title} className="w-44 h-32 object-cover rounded-lg shadow-sm" />
              <div className="flex-1">
                <div className="flex gap-4 items-center mb-2">
                  <h3 className="font-bold text-lg text-blue-800">{ac.title}</h3>
                  <button
                    onClick={() => handleBtn('cart')}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded border border-blue-200 text-xs"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleBtn('buy')}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-xs"
                  >
                    Purchase Now
                  </button>
                </div>
                <ul className="list-disc ml-4 mb-1 text-sm text-gray-700">
                  {ac.features.map((f, j) => <li key={j}>{f}</li>)}
                </ul>
                <div className="text-xs text-gray-600">{ac.details}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link to="/sell" className="bg-blue-700 text-white px-6 py-2 rounded font-medium text-lg hover:bg-blue-800">
            Post Your Old AC
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OldAcListing;
