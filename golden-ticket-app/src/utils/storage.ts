import type { Ticket } from '../types/ticket';

export const getTickets = (): Ticket[] =>
  JSON.parse(localStorage.getItem('tickets') || '[]');

export const saveTickets = (tickets: Ticket[]): void =>
  localStorage.setItem('tickets', JSON.stringify(tickets));
