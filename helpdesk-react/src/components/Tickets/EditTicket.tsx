import { useState, useEffect } from "react";
import { Box, Button, Drawer, IconButton, Stack, Typography } from "@mui/material";
import { Close, Save } from "@mui/icons-material";
import { patchTicketByID } from "../../service/Tickets";
import type { Ticket } from "../../models/ticket.model";
import TicketCard from "./ticketCard";

interface EditTicketProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    ticketToEdit: Ticket;
    users: { id: number; name: string; role?: string }[]; 
    statuses: { id: number; name: string }[]; 
    priorities: { id: number; name: string }[]; 
}

function EditTicket({ open, onClose, onSuccess, ticketToEdit, users, statuses, priorities }: EditTicketProps) {
    const [editedTicket, setEditedTicket] = useState<any>(null);

    useEffect(() => {
        if (ticketToEdit) {
            const statusId = typeof ticketToEdit.status === 'object' && ticketToEdit.status !== null ? (ticketToEdit.status as any).id : ticketToEdit.status;
            const priorityId = typeof ticketToEdit.priority === 'object' && ticketToEdit.priority !== null ? (ticketToEdit.priority as any).id : ticketToEdit.priority;
            
            const statusName = statuses.find(s => s.id === statusId)?.name || "";
            const priorityName = priorities.find(p => p.id === priorityId)?.name || "";
            
            const assignedId = ticketToEdit.assignedDeveloperId || "";
            
            setEditedTicket({
                ...ticketToEdit,
                status_name: statusName,
                priority_name: priorityName,
                status_id: statusId,
                priority_id: priorityId,
                assignedDeveloperId: assignedId ? String(assignedId) : ""
            });
        }
    }, [ticketToEdit, statuses, priorities]);

    const handleTicketChange = (updated: any) => {
        setEditedTicket(updated);
    };

    const handleSave = async () => {
        if (!editedTicket) return;

        const payload: any = {
            subject: editedTicket.subject,
            description: editedTicket.description,
            status_id: editedTicket.status_id || editedTicket.status,
            priority_id: editedTicket.priority_id || editedTicket.priority
        };

        if (editedTicket.assignedDeveloperId && editedTicket.assignedDeveloperId !== "") {
            payload.assigned_to = parseInt(editedTicket.assignedDeveloperId);
        }

        const result = await patchTicketByID(parseInt(editedTicket.id), payload);
        if (result === 200) {
            onSuccess();
            onClose();
        }
    };

    if (!editedTicket) return null;

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: { xs: "100vw", sm: 450 }, p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="h5" fontWeight={700}>Edit Ticket</Typography>
                    <IconButton onClick={onClose}><Close /></IconButton>
                </Stack>

                <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2, px: 1 }}>
                    <TicketCard 
                        ticket={editedTicket}
                        editable={true}
                        statuses={statuses}
                        priorities={priorities}
                        users={users}
                        onTicketChange={handleTicketChange}
                    />
                </Box>

                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    startIcon={<Save />}
                    onClick={handleSave}
                    sx={{ mt: "auto", fontWeight: 700, py: 1.5 }}
                >
                    Save Changes
                </Button>
            </Box>
        </Drawer>
    );
}

export default EditTicket;
