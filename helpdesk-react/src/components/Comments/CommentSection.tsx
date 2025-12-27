import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setComments, setLoading, setError } from "../../store/commentsSlice";
import { Box, Typography, Paper, Stack, CircularProgress, Divider } from "@mui/material";
import { getCommentsByTicketID, postCommentsByTicketID } from "../../service/Comments";
import type { Comment } from "../../models/comments.model";
import type { User } from "../../models/user.model";
import { CommentItem } from "./CommentItem";
import { getMyUser } from "../../service/Authentication";
import { TextAreaInput } from "../styleComponnents/TextAreaInput";


interface CommentSectionProps {
  ticketId: string;
}

function CommentSection({ ticketId }: CommentSectionProps) {
  const comments = useSelector((state: any) => state.comments.comments) as Comment[];
  const loading = useSelector((state: any) => state.comments.loading);
  //const error = useSelector((state: any) => state.comments.error);
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  const canAddComment = true; 

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadComments = async () => {
    dispatch(setLoading(true));
    try {
      const data = await getCommentsByTicketID(Number(ticketId));
      dispatch(setComments(data));
    } catch {
      dispatch(setError("שגיאה בטעינת תגובות"));
    } finally {
      dispatch(setLoading(false));
      setTimeout(scrollToBottom, 100);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getMyUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    loadComments();
  }, [ticketId]);

  const handlePostComment = async (content: string) => {
    const commentPayload = { content, ticket_id: ticketId } as Comment;
    const status = await postCommentsByTicketID(Number(ticketId), commentPayload);
    if (status !== -1) {
      await loadComments();
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: 4, border: '1px solid #e0e0e0', mt: 4 }}>
      <Typography variant="h6" fontWeight={800} sx={{ mb: 3, color: '#1a237e' }}>
        Discussion
      </Typography>

      <Box sx={{ maxHeight: '450px', overflowY: 'auto', mb: 3, pr: 1 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress size={30} /></Box>
        ) : (
          <Stack spacing={2}>
            {comments.map((comment: Comment) => (
              <CommentItem 
                key={comment.id} 
                comment={comment} 
                currentUserId={currentUser?.id} 
              />
            ))}
            <div ref={commentsEndRef} />
          </Stack>
        )}
      </Box>

      <Divider sx={{ mb: 3 }} />

      {canAddComment ? (
        <TextAreaInput onSend={handlePostComment} />
      ) : (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          You don't have permission to post comments.
        </Typography>
      )}
    </Paper>
  );
}

export default CommentSection;