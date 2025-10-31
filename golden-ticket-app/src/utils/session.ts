export interface User {
  name: string;
  email: string;
  password: string;
}

const SESSION_KEY = 'ticketapp_session';
const USERS_KEY = 'ticketapp_users';
const CURRENT_USER_KEY = 'ticketapp_current_user';

export const getSession = (): string | null => localStorage.getItem(SESSION_KEY);
export const setSession = (token: string): void => localStorage.setItem(SESSION_KEY, token);
export const clearSession = (): void => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
};

// Save a new user to localStorage
export const registerUser = (user: User): void => {
  const users = getAllUsers();
  // prevent duplicate email registration
  if (users.some((u) => u.email === user.email)) {
    throw new Error('Email already registered');
  }
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Get all registered users
export const getAllUsers = (): User[] => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

// Validate login credentials
export const validateUser = (email: string, password: string): User | null => {
  const users = getAllUsers();
  return users.find((u) => u.email === email && u.password === password) || null;
};

// ✅ Save the active user for personalized messages
export const setCurrentUser = (user: User): void => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
};