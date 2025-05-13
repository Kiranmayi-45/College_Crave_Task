import { useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthModal = ({ open, onClose, setUser }: { open: boolean, onClose: () => void, setUser: (user: any) => void }) => {
  const [mode, setMode] = useState<'login'|'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        const res = await signInWithEmailAndPassword(auth, email, password);
        setUser(res.user);
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        setUser(res.user);
      }
      onClose();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl w-[340px] p-7 flex flex-col shadow-lg relative">
        <button className="absolute right-2 top-2 text-gray-500" onClick={onClose}>×</button>
        <h2 className="font-bold text-xl mb-3 text-blue-700 text-center">{mode==='login'? 'Login':'Sign Up'}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input required type="email" placeholder="Email" className="border p-2 rounded w-full" value={email} onChange={e=>setEmail(e.target.value)} autoFocus />
          <input required type="password" placeholder="Password" className="border p-2 rounded w-full" value={password} onChange={e=>setPassword(e.target.value)} />
          <button type="submit" className="bg-blue-700 text-white p-2 rounded font-semibold mt-2 disabled:opacity-60" disabled={loading}>{mode==='login'? 'Login' : 'Sign Up'}</button>
        </form>
        {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-gray-800">{mode==='login' ? "Don't have an account?" : 'Already have an account?'}</span>
          <button onClick={()=>setMode(mode==='login'?'signup':'login')} className="text-blue-700 text-sm underline">
            {mode==='login'?'Sign Up':'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
