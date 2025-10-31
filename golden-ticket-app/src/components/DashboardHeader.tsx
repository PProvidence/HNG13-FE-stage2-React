import type { FC } from 'react';
import { Ticket, LogOut } from 'lucide-react';
import { Button } from '../components/Button';
import { clearSession } from '../utils/session';

interface DashboardHeaderProps {
  onLogout: () => void;
  userName?: string;}

const DashboardHeader: FC<DashboardHeaderProps> = ({ onLogout }) => {
  return (
    <header className="border-b border-amber-200 bg-card/30 shadow-card backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo + Brand Name */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-linear-to-br from-amber-500 to-orange-500 shadow-golden">
            <Ticket className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent tracking-tight">
            Golden Ticket
          </h1>
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          onClick={() => {clearSession(); onLogout();}}
          className="gap-2 hover:bg-white hover:text-amber-500 transition shadow-lg hover:shadow--xl hover:shadow-golden"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
