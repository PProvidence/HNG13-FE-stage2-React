import { useState } from 'react';
import type  {FC} from 'react';
import type {Page} from '../types/navigation'
import Toast from '../components/Toast';
import { setSession } from '../utils/session';
import { Ticket } from 'lucide-react';

interface AuthPageProps {
  type: 'login' | 'signup';
  onNavigate: (page: Page) => void;
  onAuth: () => void;
}

const AuthPage: FC<AuthPageProps> = ({ type, onNavigate, onAuth }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = () => {
    if (!formData.email.includes('@') || formData.password.length < 6) {
      setToast({ message: 'Enter valid credentials', type: 'error' });
      return;
    }
    setSession('golden_ticket_' + Date.now());
    setToast({ message: type === 'login' ? 'Welcome back!' : 'Account created!', type: 'success' });
    setTimeout(onAuth, 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 px-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <Ticket className="w-12 h-12 text-amber-600 mx-auto mb-2" />
          <h2 className="text-3xl font-bold text-amber-700">
            {type === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
        </div>

        {type === 'signup' && (
          <input
            placeholder="Full Name"
            className="w-full mb-4 p-3 border rounded-xl"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        )}
        <input
          placeholder="Email"
          type="email"
          className="w-full mb-4 p-3 border rounded-xl"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          className="w-full mb-6 p-3 border rounded-xl"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-linear-to-br from-amber-500 to-orange-500 text-white rounded-xl font-semibold"
        >
          {type === 'login' ? 'Sign In' : 'Sign Up'}
        </button>

        <p className="text-center mt-4 text-sm">
          {type === 'login' ? (
            <>
              Don’t have an account?{' '}
              <button
                onClick={() => onNavigate('signup')}
                className="text-amber-600 font-medium"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-amber-600 font-medium"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
