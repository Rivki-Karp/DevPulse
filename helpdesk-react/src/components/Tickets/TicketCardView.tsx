import { Card, CardContent, Stack, Typography } from "@mui/material";
import { type Ticket, STATUS_LABELS, PRIORITY_LABELS } from "../../models/ticket.model";
import StatusChip from "./StatusChip";
import PriorityChip from "./PriorityChip";

export function TicketCardView(ticket: Ticket) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" spacing={1}>
            <StatusChip statusName={STATUS_LABELS[ticket.status]} />
            <PriorityChip priorityName={PRIORITY_LABELS[ticket.priority]} />
          </Stack>

          <Typography variant="h6">{ticket.subject}</Typography>
          <Typography variant="body2" color="text.secondary">
            {ticket.description}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
export default TicketCardView;