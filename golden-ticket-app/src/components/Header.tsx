import type { FC } from 'react';
import { LogIn, Ticket } from 'lucide-react';
import { Button } from './Button';

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
        {/* Login Button */}
        <Button
          variant="outline"
          onClick={onLogin}
          className="gap-2 hover:bg-white hover:text-amber-500 transition flex items-center"
        >
          <LogIn className="w-4 h-4" />
          LogIn
        </Button>
  </header>
);

export default Header;
