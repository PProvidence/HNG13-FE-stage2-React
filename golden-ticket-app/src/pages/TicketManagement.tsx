import { useState } from 'react';
import type { FC } from 'react';
import type { Page } from '../types/navigation';
import type { Ticket } from '../types/ticket';
import { getTickets, saveTickets } from '../utils/storage';
// import { clearSession } from '../utils/session';
import { X, Plus, Inbox } from 'lucide-react';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import TicketForm from '../components/TicketForm';
import TicketCard from '../components/TicketCard';
import DashboardHeader from '../components/DashboardHeader';

interface TicketManagementProps {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

const TicketManagement: FC<TicketManagementProps> = ({ onNavigate, onLogout }) => {
  const [tickets, setTickets] = useState<Ticket[]>(getTickets());
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // 🧮 Save and refresh tickets
  const handleSave = (ticketData: Omit<Ticket, 'id'>, editing?: boolean) => {
    const updatedTickets = editing && editingTicket
      ? tickets.map((t) => (t.id === editingTicket.id ? { ...editingTicket, ...ticketData } : t))
      : [...tickets, { ...ticketData, id: Date.now().toString() }];

    setTickets(updatedTickets);
    saveTickets(updatedTickets);
    setToast({ message: editing ? 'Ticket updated!' : 'Ticket created!', type: 'success' });
    setShowForm(false);
    setEditingTicket(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this ticket?')) {
      const updated = tickets.filter((t) => t.id !== id);
      setTickets(updated);
      saveTickets(updated);
      setToast({ message: 'Ticket deleted', type: 'success' });
    }
  };

  const handleEdit = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen z-10 bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
  <div
              className="absolute top-10 right-10 w-64 h-64 rounded-full bg-linear-to-br from-amber-300/30 to-orange-400/30 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -z-10 bottom-20 left-20 w-48 h-48 rounded-full bg-linear-to-br from-yellow-300/40 to-amber-400/40 blur-2xl"
              aria-hidden="true"
            />
      

      <DashboardHeader onLogout={onLogout} />

      <div className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="text-amber-600 cursor-pointer hover:text-amber-700 font-medium"
            >
              ← Back
            </button>
            <h1 className="text-3xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Ticket Management
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setEditingTicket(null);
                setShowForm(!showForm);
              }}
              className="flex items-center z-10 cursor-pointer gap-2 px-6 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition"
            >
              {showForm ? (
                <>
                  <X className="w-5 h-5" /> Cancel
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" /> New Ticket
                </>
              )}
            </button>
            {/* <button
              onClick={() => {
                clearSession();
                onLogout();
              }}
              className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-xl shadow-lg hover:shadow-xl transition"
            >
              <LogOut className="w-5 h-5" />
            </button> */}
          </div>
        </header>

        {/* Ticket Form */}
        {showForm && (
          <TicketForm
            editingTicket={editingTicket || undefined}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingTicket(null);
            }}
          />
        )}

        {/* Ticket Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Ticket list">
          {tickets.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center h-72 text-center">
              <Inbox className="w-16 h-16 text-amber-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700">No tickets yet</h2>
              <p className="text-gray-500 mt-1">
                You don’t have any tickets yet. Create one to get started.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-6 px-8 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow hover:shadow-xl hover:scale-105 transition-all"
              >
                Create Ticket
              </button>
            </div>
          ) : (
            tickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default TicketManagement;
