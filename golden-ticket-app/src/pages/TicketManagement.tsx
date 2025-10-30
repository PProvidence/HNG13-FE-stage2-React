import { useState } from 'react';
import type { FC } from 'react';
import type { Page } from '../types/navigation';
import { getTickets, saveTickets } from '../utils/storage';
import type { Ticket } from '../types/ticket';
import Toast from '../components/Toast';
import TicketCard from '../components/TicketCard';
import { Plus, LogOut } from 'lucide-react';

interface TicketManagementProps {
    onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const TicketManagement: FC<TicketManagementProps> = ({ onNavigate, onLogout }) => {
  const [tickets, setTickets] = useState<Ticket[]>(getTickets());
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleDelete = (id: string) => {
    const updated = tickets.filter((t) => t.id !== id);
    setTickets(updated);
    saveTickets(updated);
    setToast({ message: 'Ticket deleted', type: 'success' });
  };

  return (
    <div className="min-h-screen p-8">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <header className="flex justify-between items-center mb-8">
        <button onClick={() => onNavigate('dashboard')} className="text-amber-700 font-medium">
          ← Back
        </button>
        <div className="flex gap-3">
          <button onClick={() => setShowForm(!showForm)} 
          className="flex items-center gap-2 px-6 py-3 bg-linear-to-br from-amber-500 to-orange-500 text-white font-semibold rounded-xl">
            <Plus className="w-5 h-5" /> New Ticket
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl shadow"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </header>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.length > 0 ? (
          tickets.map((t) => (
            <TicketCard key={t.id} ticket={t} onEdit={() => {}} onDelete={handleDelete} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full py-12">No tickets yet.</p>
        )}
      </section>
    </div>
  );
};

export default TicketManagement;
