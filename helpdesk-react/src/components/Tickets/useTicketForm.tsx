import { useState } from "react";
import {type Ticket } from "../../models/ticket.model";

export function useTicketForm(initial: Ticket) {
  const [ticket, setTicket] = useState<Ticket>(initial);

  const update = <K extends keyof Ticket>(key: K, value: Ticket[K]) => {
    setTicket(prev => ({ ...prev, [key]: value }));
  };

  return { ticket, update, setTicket };
}
export default useTicketForm;
