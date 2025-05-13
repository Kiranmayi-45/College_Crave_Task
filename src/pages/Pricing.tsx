import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const pricingPlans = [
  {
    title: 'Basic',
    price: '₹50',
    features: [
      '1 Listing',
      '30 Days validity',
      'Standard Support'
    ],
    highlight: false
  },
  {
    title: 'Standard',
    price: '₹200',
    features: [
      '10 Listings',
      '90 Days validity',
      'Priority Support',
      'Featured Placement'
    ],
    highlight: true
  },
  {
    title: 'Premium',
    price: '₹150',
    features: [
      '5 Listings',
      '60 Days validity',
      'Highlight Support'
    ],
    highlight: false
  }
];

const Pricing = ({ user, openAuth }: { user: any, openAuth: () => void }) => (
  <div className="bg-[#F5F8FD] min-h-screen flex flex-col">
    <Navbar user={user} onLogin={openAuth} />
    <main className="flex-1 max-w-4xl mx-auto px-4 pt-14 pb-8">
      <h2 className="text-2xl font-bold text-blue-800 text-center mb-3">Our Subscription Models</h2>
      <div className="flex flex-wrap justify-center gap-8 mt-8 mb-20">
        {pricingPlans.map((p, i) => (
          <div
            key={i}
            className={`flex flex-col border rounded-2xl px-7 py-8 shadow transition bg-white w-72 ${p.highlight ? 'border-blue-700 shadow-2xl scale-105 z-10' : 'border-blue-100'}`}
          >
            <div className={`text-xl font-bold mb-2 ${p.highlight ? 'text-blue-700' : 'text-blue-900'}`}>{p.title}</div>
            <div className="text-blue-700 text-3xl font-extrabold mb-3">{p.price}</div>
            <ul className="mb-5 space-y-2 text-gray-700">
              {p.features.map((f, idx) => <li key={idx}>• {f}</li>)}
            </ul>
            <button
              className={`rounded-lg py-2 mt-auto border font-semibold ${p.highlight ? 'bg-blue-700 text-white border-blue-700 hover:bg-blue-800' : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'}`}
              onClick={() => alert('Subscription flow is demo!')}
            >Choose Plan</button>
          </div>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default Pricing;
