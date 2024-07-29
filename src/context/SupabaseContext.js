import { createContext } from "react";

// Define the initial context values
const initialContext = {
  isLoggedIn: false,
  login: async (email, password) => {},
  register: async (email, password) => {},
  forgotPassword: async (email) => {},
  logout: async () => {},
  supabase: null,
};

// Create the context with the initial values
export const SupabaseContext = createContext(initialContext);