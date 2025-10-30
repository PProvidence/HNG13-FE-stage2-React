export const getSession = (): string | null => localStorage.getItem('ticketapp_session');

export const setSession = (token: string): void =>
  localStorage.setItem('ticketapp_session', token);

export const clearSession = (): void =>
  localStorage.removeItem('ticketapp_session');
