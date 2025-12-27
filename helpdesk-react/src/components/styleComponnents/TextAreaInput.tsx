import { Stack, TextField, Button, CircularProgress } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useState } from "react";

interface CommentInputProps {
  onSend: (content: string) => Promise<void>;
  disabled?: boolean;
}

export function TextAreaInput({ onSend, disabled }: CommentInputProps) {
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!text.trim()) return;
    setIsSending(true);
    await onSend(text);
    setText("");
    setIsSending(false);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="flex-end">
      <TextField
        fullWidth
        multiline
        maxRows={4}
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled || isSending}
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
      />
      <Button 
        variant="contained" 
        onClick={handleSend} 
        disabled={disabled || isSending || !text.trim()}
        sx={{ borderRadius: 3, height: 54 }}
      >
        {isSending ? <CircularProgress size={24} color="inherit" /> : <Send />}
      </Button>
    </Stack>
  );
}