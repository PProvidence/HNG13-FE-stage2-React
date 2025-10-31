import type { FC } from 'react';
import type { Page } from '../types/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {WaveBackground} from '../components/WaveBackground';
import { Ticket, TrendingUp, CheckSquare } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

const LandingPage: FC<LandingPageProps> = ({ onNavigate }) => {
  const features = [
    { icon: Ticket, title: 'Smart Ticketing', desc: 'Create and manage tickets with intelligent categorization.' },
    { icon: TrendingUp, title: 'Real-time Analytics', desc: 'Track performance with beautiful dashboards and insights.' },
    { icon: CheckSquare, title: 'Seamless Workflow', desc: 'Streamline your support process effortlessly.' },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-[1440px] mx-auto">
        <Header onLogin={() => onNavigate('login')} />

        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="relative px-6 py-24 text-center">
            <div
              className="absolute top-10 right-10 w-64 h-64 rounded-full bg-linear-to-br from-amber-300/30 to-orange-400/30 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-linear-to-br from-yellow-300/40 to-amber-400/40 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-amber-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                Your Golden Pass to Seamless Support
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
                Elevate your customer experience with an elegant ticket management system that turns every issue into an opportunity.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() => onNavigate('signup')}
                  className="px-8 py-4 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Get Started
                </button>
                <button
                  onClick={() => onNavigate('login')}
                  className="px-8 py-4 bg-white text-amber-700 font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 border-amber-200 hover:border-amber-300 transition-all"
                >
                  Login
                </button>
              </div>
            </div>
          </div>

          {/* Decorative Wave */}
          <WaveBackground />
          {/* <svg
            className="w-full"
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M0,64 C240,20 480,20 720,64 C960,108 1200,108 1440,64 L1440,120 L0,120 Z"
              fill="url(#wave-gradient)"
            />
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg> */}
        </div>

        {/* Features Section */}
        <section className="px-6 py-20 bg-linear-to-b from-amber-100/50 to-orange-100/30">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Premium Features
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <article
                  key={i}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
                >
                  <feature.icon
                    className="w-12 h-12 text-amber-500 mb-4"
                    aria-hidden="true"
                  />
                  <h4 className="text-xl font-bold mb-3 text-gray-800">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">{feature.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
