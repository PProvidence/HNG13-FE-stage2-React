import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import TicketManagement from './pages/TicketManagement';
import type { Page } from './types/navigation';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const handleNavigate = (page: Page) => setCurrentPage(page);
  const handleLogout = () => setCurrentPage('landing');

  switch (currentPage) {
    case 'landing':
      return <LandingPage onNavigate={handleNavigate} />;
    case 'login':
      return <AuthPage type="login" onNavigate={handleNavigate} onAuth={() => setCurrentPage('dashboard')} />;
    case 'signup':
      return <AuthPage type="signup" onNavigate={handleNavigate} onAuth={() => setCurrentPage('dashboard')} />;
    case 'dashboard':
      return <Dashboard onNavigate={handleNavigate} onLogout={handleLogout} />;
    case 'tickets':
      return <TicketManagement onNavigate={handleNavigate} onLogout={handleLogout} />;
    default:
      return <LandingPage onNavigate={handleNavigate} />;
  }
}

export default App;
