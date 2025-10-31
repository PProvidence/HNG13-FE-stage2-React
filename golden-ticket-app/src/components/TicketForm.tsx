import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Ticket as TicketIcon } from 'lucide-react';
import type { Ticket } from '../types/ticket';

interface TicketFormProps {
  editingTicket?: Ticket | null;
  onSave: (ticket: Omit<Ticket, 'id'>, editing?: boolean) => void;
  onCancel: () => void;
}

const TicketForm: FC<TicketFormProps> = ({ editingTicket, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Ticket, 'id'>>({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load editing ticket into form safely
  useEffect(() => {
    if (editingTicket) {
      const { title, description, status, priority } = editingTicket;
      setFormData({
        title: title ?? '',
        description: description ?? '',
        status,
        priority,
      });
    }
  }, [editingTicket]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!['open', 'in_progress', 'closed'].includes(formData.status))
      newErrors.status = 'Invalid status';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave(formData, !!editingTicket);
  };

  return (
    <section className="bg-white z-10 rounded-2xl shadow-2xl p-8 mb-8 ">
      <div className="flex items-center gap-3 mb-6">
        <TicketIcon className="w-6 h-6 text-amber-500" />
        <h2 className="text-2xl font-bold text-gray-800">
          {editingTicket ? 'Edit Ticket' : 'Create New Ticket'}
        </h2>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:outline-none transition"
          />
          {errors.title && <p className="mt-2 text-sm text-red-500">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:outline-none transition"
            rows={4}
          />
        </div>

        {/* Status & Priority */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as 'open' | 'in_progress' | 'closed',
                })
              }
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:outline-none transition"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            {errors.status && <p className="mt-2 text-sm text-red-500">{errors.status}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priority: e.target.value as 'low' | 'medium' | 'high',
                })
              }
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:outline-none transition"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition"
          >
            {editingTicket ? 'Update' : 'Create'} Ticket
          </button>
          <button
            onClick={onCancel}
            className="px-8 py-3 bg-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};

export default TicketForm;