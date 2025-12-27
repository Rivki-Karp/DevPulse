
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import ticketsReducer from './ticketsSlice';
import usersReducer from './usersSlice';
import commentsReducer from './commentsSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketsReducer,
    users: usersReducer,
    comments: commentsReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;