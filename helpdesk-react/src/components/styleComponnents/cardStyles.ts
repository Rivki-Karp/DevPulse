import type { SxProps, Theme } from '@mui/material';

/**
 * Reusable card hover effect styles
 */
export const cardHoverEffect: SxProps<Theme> = {
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: (theme) =>
      theme.palette.mode === 'dark'
        ? '0 12px 32px rgba(0,0,0,0.6)'
        : '0 12px 32px rgba(0,0,0,0.15)',
    borderColor: (theme) =>
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,0.2)'
        : 'rgba(0,0,0,0.15)'
  }
};

/**
 * Reusable card base styles
 */
export const cardBaseStyles: SxProps<Theme> = {
  borderRadius: 3,
  position: 'relative',
  ...cardHoverEffect
};
