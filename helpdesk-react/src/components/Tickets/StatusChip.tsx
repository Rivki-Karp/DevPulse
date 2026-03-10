import ColoredChip from "../styleComponnents/ColoredChip";
import { STATUS_COLORS, DEFAULT_STATUS_CONFIG } from "../styleComponnents/chipStyles.tsx";

interface StatusChipProps {
  statusName: string;
}

function StatusChip({ statusName }: StatusChipProps) {
  const statusLower = statusName.toLowerCase();
  const config = STATUS_COLORS[statusLower] || DEFAULT_STATUS_CONFIG;
  
  return <ColoredChip label={statusName} config={config} />;
}

export default StatusChip;
