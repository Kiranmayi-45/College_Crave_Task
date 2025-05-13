import { Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

const Navbar = ({ user, onLogin }: { user: any, onLogin: () => void }) => (
  <nav className="w-full bg-white shadow flex items-center px-6 py-2 justify-between">
    <div className="flex items-center gap-4">
      <span className="font-bold text-xl text-blue-700">Logo</span>
      <ul className="flex gap-6 ml-8 font-medium">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/old-acs">Old AC Listing</Link></li> 
        <li><Link to="/pricing">Pricing</Link></li>
      </ul>
    </div>
    <div className="flex gap-4 items-center">
      {user ? (
        <>
          <span className="text-gray-800 text-sm mr-1">{user.email}</span>
          <button
            className="px-4 py-1 rounded-lg border border-blue-700 text-blue-700 hover:bg-blue-50"
            onClick={() => signOut(auth)}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            className="px-4 py-1 rounded-lg border border-blue-700 text-blue-700 hover:bg-blue-50"
            onClick={onLogin}
          >
            Login
          </button>
          <button
            className="px-4 py-1 rounded-lg bg-blue-700 text-white hover:bg-blue-800"
            onClick={onLogin}
          >
            Sign up
          </button>
        </>
      )}
    </div>
  </nav>
);

export default Navbar;
