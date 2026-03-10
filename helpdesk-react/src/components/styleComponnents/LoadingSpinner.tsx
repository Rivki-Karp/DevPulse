import { Box, CircularProgress, type SxProps, type Theme } from '@mui/material';

interface LoadingSpinnerProps {
  size?: number;
  sx?: SxProps<Theme>;
}

/**
 * Reusable centered loading spinner component
 */
function LoadingSpinner({ size = 40, sx = {} }: LoadingSpinnerProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 10,
        ...sx
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
}

export default LoadingSpinner;
