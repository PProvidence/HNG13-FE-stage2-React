import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import TicketManagement from './pages/TicketManagement';
import type { Page } from './types/navigation';

const navigateTo = (page: Page) =>
  window.location.assign(page === 'landing' ? '/' : `/${page}`);

const routes = [
  {
    path: '/',
    element: <LandingPage onNavigate={navigateTo} />,
  },
  {
    path: '/login',
    element: <AuthPage type="login" onNavigate={navigateTo} onAuth={() => navigateTo('dashboard')} />,
  },
  {
    path: '/signup',
    element: <AuthPage type="signup" onNavigate={navigateTo} onAuth={() => navigateTo('dashboard')} />,
  },
  {
    path: '/dashboard',
    element: <Dashboard onNavigate={navigateTo} onLogout={() => navigateTo('landing')} />,
  },
  {
    path: '/tickets',
    element: <TicketManagement onNavigate={navigateTo} onLogout={() => navigateTo('landing')} />,
  },
  {
    path: '*',
    element: <LandingPage onNavigate={navigateTo} />,
  },
];

export default routes;
