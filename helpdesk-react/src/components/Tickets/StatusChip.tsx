import { Chip } from "@mui/material";
import { CheckCircle, HourglassEmpty, RadioButtonUnchecked } from "@mui/icons-material";

interface StatusChipProps {
  statusName: string;
}

function StatusChip({ statusName }: StatusChipProps) {
  const statusLower = statusName.toLowerCase();
  
  // Done/Closed - ירוק
  if (statusLower === "done" || statusLower === "closed") {
    return (
      <Chip 
        icon={<CheckCircle />} 
        label={statusName} 
        size="small" 
        sx={{
          bgcolor: '#4caf50',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: '0.85rem',
          '& .MuiChip-icon': { color: '#ffffff' }
        }} 
      />
    );
  }
  
  // In Progress - כתום
  if (statusLower === "in progress" || statusLower === "in-progress") {
    return (
      <Chip 
        icon={<HourglassEmpty />} 
        label={statusName} 
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
  
  // Open - כחול
  return (
    <Chip 
      icon={<RadioButtonUnchecked />} 
      label={statusName} 
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

export default StatusChip;
