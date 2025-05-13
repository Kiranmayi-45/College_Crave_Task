const ServiceModal = ({ open, onClose, service }: { open: boolean, onClose: () => void, service: any }) => {
  if (!open || !service) return null;
  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-7 relative">
        <button className="absolute right-3 top-3 text-gray-500" onClick={onClose}>×</button>
        <img src={service.image} alt={service.title} className="w-full h-48 object-cover rounded mb-5" />
        <h3 className="text-blue-800 font-bold text-xl mb-2">{service.title}</h3>
        <div className="text-gray-700 text-base mb-4">{service.desc}</div>
      </div>
    </div>
  );
};
export default ServiceModal;
