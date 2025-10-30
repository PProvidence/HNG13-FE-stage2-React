import type { FC } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import type { Ticket } from '../types/ticket';

interface TicketCardProps {
  ticket: Ticket;
  onEdit: (ticket: Ticket) => void;
  onDelete: (id: string) => void;
}

const statusColors: Record<Ticket['status'], string> = {
  open: 'from-green-400 to-emerald-500',
  in_progress: 'from-yellow-400 to-amber-500',
  closed: 'from-gray-400 to-slate-500',
};

const TicketCard: FC<TicketCardProps> = ({ ticket, onEdit, onDelete }) => (
  <article className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6">
    <div className="flex justify-between items-start mb-4">
      <span
        className={`px-4 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${statusColors[ticket.status]}`}
      >
        {ticket.status.replace('_', ' ').toUpperCase()}
      </span>
      <span className="text-xs font-medium text-gray-500 uppercase">
        {ticket.priority}
      </span>
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{ticket.title}</h3>
    <p className="text-gray-600 text-sm mb-4">
      {ticket.description || 'No description'}
    </p>
    <div className="flex gap-2">
      <button
        onClick={() => onEdit(ticket)}
        className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition text-sm font-medium"
      >
        <Edit2 className="w-4 h-4" />
        Edit
      </button>
      <button
        onClick={() => onDelete(ticket.id)}
        className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-medium"
      >
        <Trash2 className="w-4 h-4" />
        Delete
      </button>
    </div>
  </article>
);

export default TicketCard;
