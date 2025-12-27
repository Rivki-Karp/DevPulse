import { MenuItem, Stack, TextField } from "@mui/material";
import { type Ticket, Status, Priority, STATUS_LABELS, PRIORITY_LABELS } from "../../models/ticket.model";

interface Props {
  ticket: Ticket;
  onChange: <K extends keyof Ticket>(key: K, value: Ticket[K]) => void;
}

export function TicketCardEdit({ ticket, onChange }: Props) {
  const fields = [
    {
      key: "subject",
      label: "Subject",
      value: ticket.subject,
      type: "text",
    },
    {
      key: "description",
      label: "Description",
      value: ticket.description,
      type: "multiline",
      rows: 3,
    },
    {
      key: "status",
      label: "Status",
      value: ticket.status,
      type: "select",
      options: Object.entries(STATUS_LABELS),
      getValue: (v: string) => Number(v) as Status,
    },
    {
      key: "priority",
      label: "Priority",
      value: ticket.priority,
      type: "select",
      options: Object.entries(PRIORITY_LABELS),
      getValue: (v: string) => Number(v) as Priority,
    },
  ];

  return (
    <Stack spacing={2}>
      {fields.map(field => {
        if (field.type === "text") {
          return (
            <TextField
              key={field.key}
              label={field.label}
              value={field.value}
              onChange={e => onChange(field.key as keyof Ticket, e.target.value)}
              fullWidth
            />
          );
        }
        if (field.type === "multiline") {
          return (
            <TextField
              key={field.key}
              label={field.label}
              value={field.value}
              onChange={e => onChange(field.key as keyof Ticket, e.target.value)}
              multiline
              rows={field.rows}
              fullWidth
            />
          );
        }
        if (field.type === "select") {
          return (
            <TextField
              key={field.key}
              select
              label={field.label}
              value={field.value}
              onChange={e => onChange(field.key as keyof Ticket, field.getValue ? field.getValue(e.target.value) : e.target.value)}
              fullWidth
            >
              {field.options?.map(([value, label]) => (
                <MenuItem key={value} value={value}>{label}</MenuItem>
              ))}
            </TextField>
          );
        }
        return null;
      })}
    </Stack>
  );
}
export default TicketCardEdit;