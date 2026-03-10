import { CheckCircle, HourglassEmpty, RadioButtonUnchecked } from "@mui/icons-material";
import { ArrowDownward, Remove, ArrowUpward, PriorityHigh } from "@mui/icons-material";
import type { ChipConfig } from "./ColoredChip";

// Status color configurations
export const STATUS_COLORS: Record<string, ChipConfig> = {
  done: {
    bgcolor: '#4caf50',
    icon: <CheckCircle />
  },
  closed: {
    bgcolor: '#4caf50',
    icon: <CheckCircle />
  },
  'in progress': {
    bgcolor: '#ff9800',
    icon: <HourglassEmpty />
  },
  'in-progress': {
    bgcolor: '#ff9800',
    icon: <HourglassEmpty />
  },
  open: {
    bgcolor: '#2196f3',
    icon: <RadioButtonUnchecked />
  }
};

// Priority color configurations
export const PRIORITY_COLORS: Record<string, ChipConfig> = {
  urgent: {
    bgcolor: '#f44336',
    icon: <PriorityHigh />
  },
  high: {
    bgcolor: '#ff9800',
    icon: <ArrowUpward />
  },
  medium: {
    bgcolor: '#2196f3',
    icon: <Remove />
  },
  low: {
    bgcolor: '#9e9e9e', // Will be overridden by theme in component if needed
    icon: <ArrowDownward />
  }
};

// Default configurations
export const DEFAULT_STATUS_CONFIG: ChipConfig = {
  bgcolor: '#2196f3',
  icon: <RadioButtonUnchecked />
};

export const DEFAULT_PRIORITY_CONFIG: ChipConfig = {
  bgcolor: '#9e9e9e',
  icon: <ArrowDownward />
};
