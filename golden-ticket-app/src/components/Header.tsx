// Header.tsx
import type { FC } from 'react';
import { Ticket } from 'lucide-react';

interface HeaderProps {
  onLogin: () => void;
}

const Header: FC<HeaderProps> = ({ onLogin }) => (
  <header className="px-6 py-6 flex justify-between items-center">
    <div className="flex items-center gap-2">
      <Ticket className="w-8 h-8 text-amber-600" />
      <h1 className="text-2xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
        Golden Ticket
      </h1>
    </div>
    <button
      onClick={onLogin}
      className="px-6 py-2 text-amber-700 font-medium hover:text-amber-900 transition"
    >
      Login
    </button>
  </header>
);

export default Header;
