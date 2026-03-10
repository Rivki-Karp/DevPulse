import { Chip, useTheme, type SxProps, type Theme } from "@mui/material";
import type { ReactElement } from "react";

export interface ChipConfig {
  bgcolor: string;
  color?: string;
  icon?: ReactElement;
}

interface ColoredChipProps {
  label: string;
  config: ChipConfig;
  size?: "small" | "medium";
  sx?: SxProps<Theme>;
}

/**
 * Reusable colored chip component that consolidates StatusChip and PriorityChip logic
 */
function ColoredChip({ label, config, size = "small", sx = {} }: ColoredChipProps) {
  return (
    <Chip 
      icon={config.icon} 
      label={label} 
      size={size} 
      sx={{
        bgcolor: config.bgcolor,
        color: config.color || '#ffffff',
        fontWeight: 700,
        fontSize: '0.85rem',
        '& .MuiChip-icon': { color: config.color || '#ffffff' },
        ...sx
      }} 
    />
  );
}

export default ColoredChip;
