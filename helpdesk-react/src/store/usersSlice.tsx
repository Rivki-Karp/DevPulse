import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../models/user.model';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    updateUser(state, action: PayloadAction<User>) {
      const idx = state.users.findIndex(u => u.id === action.payload.id);
      if (idx !== -1) {
        state.users[idx] = action.payload;
      }
    },
    removeUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter(u => u.id !== action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setUsers, addUser, updateUser, removeUser, setLoading, setError } = usersSlice.actions;
export default usersSlice.reducer;
