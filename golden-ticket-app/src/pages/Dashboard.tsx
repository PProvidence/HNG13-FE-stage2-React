import type { FC } from 'react';
import type { Page } from '../types/navigation';
import { getTickets } from '../utils/storage';
import { LogOut, Ticket, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';

interface DashboardProps {
    onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const Dashboard: FC<DashboardProps> = ({ onNavigate, onLogout }) => {
  const tickets = getTickets();
  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === 'open').length,
    inProgress: tickets.filter((t) => t.status === 'in_progress').length,
    closed: tickets.filter((t) => t.status === 'closed').length,
  };

  const cards = [
    { label: 'Total', value: stats.total, icon: Ticket, color: 'from-amber-400 to-orange-500' },
    { label: 'Open', value: stats.open, icon: AlertCircle, color: 'from-green-400 to-emerald-500' },
    { label: 'In Progress', value: stats.inProgress, icon: Clock, color: 'from-yellow-400 to-amber-500' },
    { label: 'Closed', value: stats.closed, icon: CheckCircle, color: 'from-gray-400 to-slate-500' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-6 py-2 bg-white text-gray-700 rounded-xl shadow hover:shadow-md"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </header>

      <main className="flex-1 p-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition">
            <div
              className={`w-12 h-12 rounded-xl bg-linear-to-br ${card.color} flex items-center justify-center mb-3`}
            >
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-gray-600">{card.label}</p>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </main>

      <section className="p-8 text-center">
        <button
          onClick={() => onNavigate('tickets')}
          className="px-8 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow hover:shadow-xl"
        >
          Go to Ticket Management
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
