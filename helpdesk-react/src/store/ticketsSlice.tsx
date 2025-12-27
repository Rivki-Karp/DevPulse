import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Ticket } from '../models/ticket.model';

export interface TicketsState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
}

const initialState: TicketsState = {
  tickets: [],
  loading: false,
  error: null,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setTickets(state, action: PayloadAction<Ticket[]>) {
      state.tickets = action.payload;
      state.loading = false;
      state.error = null;
    },
    addTicket(state, action: PayloadAction<Ticket>) {
      state.tickets.push(action.payload);
    },
    updateTicket(state, action: PayloadAction<Ticket>) {
      const idx = state.tickets.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) {
        state.tickets[idx] = action.payload;
      }
    },
    removeTicket(state, action: PayloadAction<string>) {
      state.tickets = state.tickets.filter(t => t.id !== action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setTickets, addTicket, updateTicket, removeTicket, setLoading, setError } = ticketsSlice.actions;
export default ticketsSlice.reducer;
