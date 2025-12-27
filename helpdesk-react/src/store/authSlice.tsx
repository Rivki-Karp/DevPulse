import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../models/user.model';

const TOKEN_KEY = 'devpulse_token';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const loadFromLocalStorage = (): AuthState => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        user: null, 
        token,
        isAuthenticated: true,
      };
    }
  } catch (error) {
    console.error('Failed to load auth from localStorage:', error);
  }
  return {
    user: null,
    token: null,
    isAuthenticated: false,
  };
};

const initialState: AuthState = loadFromLocalStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
    setCredentials: (state, action: PayloadAction<{ user?: User; token: string }>) => {
      const { user, token } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem(TOKEN_KEY, token);
      if (user) {
        state.user = user;
      }
    },
    
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem(TOKEN_KEY);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;