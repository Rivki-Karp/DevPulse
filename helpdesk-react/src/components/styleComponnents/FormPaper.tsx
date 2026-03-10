import { Paper, type SxProps, type Theme } from '@mui/material';
import type { ReactNode } from 'react';

interface FormPaperProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

/**
 * Reusable Paper component with consistent styling for forms
 */
function FormPaper({ children, sx = {} }: FormPaperProps) {
  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 3,
        ...sx
      }}
    >
      {children}
    </Paper>
  );
}

export default FormPaper;
