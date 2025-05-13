const Footer = () => (
  <footer className="bg-blue-700 text-white px-8 pt-8 pb-4 mt-12">
    <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-4">
      <div>
        <div className="font-bold text-lg mb-2">Company</div>
        <p className="text-sm">AC Services Pvt Ltd, Choice Bazar, India, 700016</p>
        <p className="text-sm">Contact: +91 99999 99999</p>
        <p className="text-sm">ac-services@gmail.com</p>
      </div>
      <div>
        <div className="font-bold text-lg mb-2">Follow Us</div>
        <ul className="space-y-1 text-sm">
          <li><a href="#" className="hover:underline">Facebook</a></li>
          <li><a href="#" className="hover:underline">Instagram</a></li>
          <li><a href="#" className="hover:underline">Twitter</a></li>
        </ul>
      </div>
    </div>
    <div className="text-xs text-center border-t border-blue-600 pt-2">Copyright © 2024 AC Services Pvt Ltd. All Rights Reserved</div>
  </footer>
);
export default Footer;
