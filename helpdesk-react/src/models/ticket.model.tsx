export const Status = {
  open: 1,  
  inProgress: 2, 
  done: 3
} as const;
export type Status = typeof Status[keyof typeof Status];

export const Priority = {
  low: 1,  
  medium: 2, 
  high: 3
} as const;
export type Priority = typeof Priority[keyof typeof Priority];

export const STATUS_LABELS: Record<Status, string> = {
  [Status.open]: "Open",
  [Status.inProgress]: "In Progress",
  [Status.done]: "Done",
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  [Priority.low]: "Low",
  [Priority.medium]: "Medium",
  [Priority.high]: "High"
};

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: Status;
  priority: Priority;
  created_by: string;
  clientOwnerId: string;
  assignedDeveloperId?: string; 
  createdAt: string;
  updatedAt: string;
}