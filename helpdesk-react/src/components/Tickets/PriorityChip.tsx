import { useTheme } from "@mui/material";
import ColoredChip from "../styleComponnents/ColoredChip";
import { PRIORITY_COLORS, DEFAULT_PRIORITY_CONFIG } from "../styleComponnents/chipStyles.tsx";

interface PriorityChipProps {
  priorityName: string;
}

function PriorityChip({ priorityName }: PriorityChipProps) {
  const theme = useTheme();
  const priorityLower = priorityName.toLowerCase();
  
  let config = PRIORITY_COLORS[priorityLower] || DEFAULT_PRIORITY_CONFIG;
  
  // Apply theme-aware bgcolor for low priority
  if (priorityLower === "low") {
    config = {
      ...config,
      bgcolor: theme.palette.mode === 'dark' ? '#616161' : '#9e9e9e'
    };
  }
  
  return <ColoredChip label={priorityName} config={config} />;
}

export default PriorityChip;
