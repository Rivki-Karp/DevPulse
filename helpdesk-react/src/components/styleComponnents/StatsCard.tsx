import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color }) => {
  return (
    <Paper
      elevation={0}
      sx={theme => ({
        p: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: theme.palette.background.paper,
        borderLeft: `6px solid ${color}`,
        borderRadius: 2,
        boxShadow: 0,
        cursor: 'pointer',
        transition: 'box-shadow 0.2s, background 0.2s, border-color 0.2s',
        '&:hover': {
          boxShadow: 4,
          bgcolor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[900]
              : theme.palette.grey[100],
          borderLeft: `6px solid ${theme.palette.primary.main}`,
        },
      })}
    >
      <Box>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
      </Box>
      <Box sx={{ color: color, display: 'flex', opacity: 0.8 }}>
        {icon}
      </Box>
    </Paper>
  );
};

export default StatsCard;