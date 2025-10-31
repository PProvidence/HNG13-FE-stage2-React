import type { FC } from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  color: 'open' | 'in-progress' | 'closed' | 'total';
  interactive?: boolean;
}

const StatCard: FC<StatCardProps> = ({ label, value, icon: Icon, color, interactive = true }) => {
  const colors = {
    total: 'border-l-4 border-l-pink-500',
    open: 'border-l-4 border-l-[hsl(var(--status-open))]',
    'in-progress': 'border-l-4 border-l-[hsl(var(--status-in-progress))]',
    closed: 'border-l-4 border-l-[hsl(var(--status-closed))]',
  };

  return (
    <div
      className={`relative p-6 shadow-xl rounded-xl bg-white hover:bg-white transition-shadow duration-300 ${colors[color]} hover:shadow-[0_0_25px_hsl(45_95%_50%/0.4)] ${
        interactive ? ' hover:-translate-y-1 hover:scale-[1.02] group' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-muted/30">
          <Icon className={`w-6 h-6 ${color === 'open' ? 'text-[hsl(var(--status-open))]' : color === 'in-progress' ? 'text-[hsl(var(--status-in-progress))]' : color === 'closed' ? 'text-[hsl(var(--status-closed))]' : 'text-pink-500'}`} />
        </div>
        <span className={`text-3xl font-bold ${color === 'open' ? 'text-[hsl(var(--status-open))]' : color === 'in-progress' ? 'text-[hsl(var(--status-in-progress))]' : color === 'closed' ? 'text-[hsl(var(--status-closed))]' : 'text-pink-500'}`}>{value}</span>
      </div>
      <h3 className="text-lg font-semibold">{label}</h3>
      {/* <div className="absolute inset--0 opacity-0 group-hover:opacity-10 bg-linear-to-r from-amber-400 via-orange-400 to-yellow-400 transition-opacity duration-500" /> */}
    </div>
  );
};

export default StatCard;
