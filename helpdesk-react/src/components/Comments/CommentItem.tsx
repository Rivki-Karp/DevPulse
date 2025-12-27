import { Box, Avatar, Paper, Typography } from "@mui/material";
import type { Comment } from "../../models/comments.model";

interface CommentItemProps {
  comment: Comment;
  currentUserId: string | undefined;
}

export function CommentItem({ comment, currentUserId }: CommentItemProps) {
  const isMe = String(comment.author_id) === String(currentUserId);
  const authorName = (comment as any).author_name || "Unknown User";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMe ? "row-reverse" : "row",
        gap: 1.5,
        mb: 2,
      }}
    >
      <Avatar
        sx={{
          width: 36,
          height: 36,
          bgcolor: isMe ? "primary.main" : "grey.400",
          fontSize: "14px",
        }}
      >
        {authorName[0].toUpperCase()}
      </Avatar>

      <Box sx={{ maxWidth: "75%" }}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: isMe ? "18px 18px 0 18px" : "18px 18px 18px 0",
            bgcolor: isMe ? "primary.main" : "#ffffff",
            color: isMe ? "#ffffff" : "#333",
            border: isMe ? "none" : "1px solid #e0e0e0",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          {!isMe && (
            <Typography
              variant="caption"
              fontWeight={900}
              display="block"
              sx={{ mb: 0.5, color: "primary.main" }}
            >
              {authorName}
            </Typography>
          )}
          <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
            {comment.content}
          </Typography>
        </Paper>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 0.5, display: "block", px: 1, textAlign: isMe ? "right" : "left" }}
        >
          {new Date(comment.created_at).toLocaleDateString([], {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
          })}
          {" "}
          {new Date(comment.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </Box>
    </Box>
  );
}