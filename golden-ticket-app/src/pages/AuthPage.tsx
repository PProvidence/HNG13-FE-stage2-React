import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Ticket } from 'lucide-react';
import type { Page } from '../types/navigation';
import Toast from '../components/Toast';
import { setSession, registerUser, validateUser, setCurrentUser } from '../utils/session';
interface AuthPageProps {
  type: 'login' | 'signup';
  onNavigate: (page: Page) => void;
  onAuth: () => void;
}

interface FormData {
  name?: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

const AuthPage: FC<AuthPageProps> = ({ type, onNavigate, onAuth }) => {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '', name: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [isVisible, setIsVisible] = useState(false); // for slide-in animation

  // Animate in when mounted
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.password || formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (type === 'signup' && !formData.name) newErrors.name = 'Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      setToast({ message: 'Please fix the errors below', type: 'error' });
      return;
    }

    if (type === 'signup') {
      try {
        registerUser({
          name: formData.name || '',
          email: formData.email,
          password: formData.password,
        });
        setToast({ message: `Account created for ${formData.name}!`, type: 'success' });
        setTimeout(() => onNavigate('login'), 800);
      } catch (err: unknown) {
        setToast({ message: err instanceof Error ? err.message : 'User already exists', type: 'error' });
      }
      return;
    }
    
    if (type === 'login') {
      const user = validateUser(formData.email, formData.password);
      if (!user) {
        setToast({ message: 'Invalid email or password', type: 'error' });
        return;
      }
      
      const mockToken = 'golden_ticket_' + Date.now();
      setSession(mockToken);
      setCurrentUser(user);
      setToast({ message: `Welcome back, ${user.name}!`, type: 'success' });
      setTimeout(() => onAuth(), 600);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 px-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* Slide-in effect via Tailwind transitions */}
      <div
        className={`w-full max-w-md transform transition-all duration-700 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        <div className="text-center mb-8">
          <Ticket className="w-16 h-16 text-amber-600 mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-4xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
            {type === 'login' ? 'Welcome Back' : 'Get Started'}
          </h2>
          <p className="text-gray-600">Enter your golden credentials</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 transition-all duration-700 ease-out transform hover:scale-[1.02]">
          <div className="space-y-6">
            {type === 'signup' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:outline-none transition"
                  placeholder="John Doe"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 text-sm text-red-500" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:outline-none transition"
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm text-red-500" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:outline-none transition"
                placeholder="••••••••"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              {errors.password && (
                <p id="password-error" className="mt-2 text-sm text-red-500" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              {type === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate(type === 'login' ? 'signup' : 'login')}
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              {type === 'login' ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
