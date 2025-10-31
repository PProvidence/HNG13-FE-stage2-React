import { useEffect, useState } from 'react';
import type { FC } from 'react';
import type { Page } from '../types/navigation';
import { getTickets } from '../utils/storage';
import { getCurrentUser, getSession, clearSession } from '../utils/session';
import DashboardHeader from '../components/DashboardHeader';
import StatCard from '../components/StatCard';
import Footer from '../components/Footer';
import { Ticket, AlertCircle, Clock, CheckCircle } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const Dashboard: FC<DashboardProps> = ({ onNavigate, onLogout }) => {
  const [tickets] = useState(getTickets());
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const session = getSession();
    if (!session) return (clearSession(), onNavigate('login'));
    setUserName(getCurrentUser()?.name || '');
  }, [onNavigate]);

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in_progress').length,
    closed: tickets.filter(t => t.status === 'closed').length,
  };

  const cards = [
    { label: 'Total Tickets', value: stats.total, icon: Ticket, color: 'total' },
    { label: 'Open', value: stats.open, icon: AlertCircle, color: 'open' },
    { label: 'In Progress', value: stats.inProgress, icon: Clock, color: 'in-progress' },
    { label: 'Resolved', value: stats.closed, icon: CheckCircle, color: 'closed' },
  ] as const;


  return (
    <div className="min-h-screen flex flex-col item bg-linear-to-br from-amber-50/5 via-orange-50/5 to-yellow-50/5">
      <div
        className="absolute top-10 right-10 w-64 h-64 rounded-full bg-linear-to-br from-amber-300/30 to-orange-400/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-linear-to-br from-yellow-300/40 to-amber-400/40 blur-2xl"
        aria-hidden="true"
      />
      <DashboardHeader onLogout={onLogout} userName={userName} />

      <main className="flex-1 px-6 py-12 max-w-6xl mx-auto w-full">
        <header className="mb-12">
          <h2 className="text-4xl font-bold mb-2">Welcome back{userName && `, ${userName}`}👋!</h2>
          <p className="text-muted-foreground text-lg">Here’s an overview of your tickets</p>
        </header>

        <section className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-6 mb-12">
          {cards.map((card, i) => <StatCard key={i} {...card} />)}
        </section>

        <section className="p-8 text-center bg-linear-to-r from-amber-500 to-orange-500 rounded-2xl shadow-2xl text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to manage your tickets?</h2>
          <p className="mb-6 opacity-90">Create, view, edit, and resolve tickets with ease.</p>
          <button
            onClick={() => onNavigate('tickets')}
            className="px-8 py-3 bg-white text-amber-600 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Go to Ticket Management
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
