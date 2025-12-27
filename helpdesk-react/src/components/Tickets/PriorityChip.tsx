import { Chip, useTheme } from "@mui/material";
import { ArrowDownward, Remove, ArrowUpward, PriorityHigh } from "@mui/icons-material";

interface PriorityChipProps {
  priorityName: string;
}

function PriorityChip({ priorityName }: PriorityChipProps) {
  const theme = useTheme();
  const priorityLower = priorityName.toLowerCase();
  
  // Urgent - אדום
  if (priorityLower === "urgent") {
    return (
      <Chip 
        icon={<PriorityHigh />} 
        label={priorityName} 
        size="small" 
        sx={{
          bgcolor: '#f44336',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: '0.85rem',
          '& .MuiChip-icon': { color: '#ffffff' }
        }} 
      />
    );
  }
  
  // High - כתום
  if (priorityLower === "high") {
    return (
      <Chip 
        icon={<ArrowUpward />} 
        label={priorityName} 
        size="small" 
        sx={{
          bgcolor: '#ff9800',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: '0.85rem',
          '& .MuiChip-icon': { color: '#ffffff' }
        }} 
      />
    );
  }
  
  // Medium - כחול
  if (priorityLower === "medium") {
    return (
      <Chip 
        icon={<Remove />} 
        label={priorityName} 
        size="small" 
        sx={{
          bgcolor: '#2196f3',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: '0.85rem',
          '& .MuiChip-icon': { color: '#ffffff' }
        }} 
      />
    );
  }
  
  // Low - אפור
  return (
    <Chip 
      icon={<ArrowDownward />} 
      label={priorityName} 
      size="small" 
      sx={{
        bgcolor: theme.palette.mode === 'dark' ? '#616161' : '#9e9e9e',
        color: '#ffffff',
        fontWeight: 700,
        fontSize: '0.85rem',
        '& .MuiChip-icon': { color: '#ffffff' }
      }} 
    />
  );
}

export default PriorityChip;
