import { createSlice,type PayloadAction } from '@reduxjs/toolkit';
import type { Comment } from '../models/comments.model';

export interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload;
      state.loading = false;
      state.error = null;
    },
    addComment(state, action: PayloadAction<Comment>) {
      state.comments.push(action.payload);
    },
    updateComment(state, action: PayloadAction<Comment>) {
      const idx = state.comments.findIndex(c => c.id === action.payload.id);
      if (idx !== -1) {
        state.comments[idx] = action.payload;
      }
    },
    removeComment(state, action: PayloadAction<string>) {
      state.comments = state.comments.filter(c => c.id !== action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setComments, addComment, updateComment, removeComment, setLoading, setError } = commentsSlice.actions;
export default commentsSlice.reducer;
