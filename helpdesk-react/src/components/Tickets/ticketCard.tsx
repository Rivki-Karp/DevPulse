import { formatDate } from '../../utils/dateUtils';
import { Card, CardContent, Typography, Box, Stack, Avatar, TextField, MenuItem, IconButton, Button } from "@mui/material";
import { CalendarToday, Edit, Assignment, Visibility, Delete } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { UserRole } from "../../models/user.model";
import { STATUS_LABELS, PRIORITY_LABELS } from "../../models/ticket.model";
import StatusChip from "./StatusChip";
import PriorityChip from "./PriorityChip";
import { useNavigate } from "react-router-dom";

export interface TicketCardProps {
        onDeleteClick?: () => void;
    ticket: {
        id: string;
        subject: string;
        description: string;
        status_name: string;
        priority_name: string;
        created_by: string;
        creator_name?: string;
        assigned_to_name?: string;
        assignedDeveloperId?: string;
        createdAt: string;
        updatedAt?: string;

        status_id?: number;
        priority_id?: number;
        status?: number;
        priority?: number;
    };
    editable?: boolean;
    statuses?: { id: number; name: string }[];
    priorities?: { id: number; name: string }[];
    users?: { id: number; name: string; role?: string }[];
    onTicketChange?: (updatedTicket: any) => void;
    onEditClick?: () => void;
}

function TicketCard({ ticket, editable, statuses, priorities, users, onTicketChange, onEditClick, onDeleteClick }: TicketCardProps) {
        // מיפוי created_at ל-createdAt אם קיים
        const normalizedTicket = { ...ticket, createdAt: ticket.createdAt || (ticket as any).created_at };
    const [editableData, setEditableData] = useState(ticket);
    const user = useSelector((state: RootState) => state.auth.user);
    const role = user?.role;
    const navigate = useNavigate();

    useEffect(() => {
        setEditableData(ticket);
    }, [ticket]);
    
    const handleViewDetails = () => {
        navigate(`/tickets/${ticket.id}`, { state: { ticket } });
    };
    // שימוש בפונקציית העזר מה-utils

    const displayName = ticket.creator_name || String(ticket.created_by);
    const initials = displayName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

    const handleFieldChange = (field: string, value: any) => {
        let updatedData = { ...editableData, [field]: value };

        if (field === "status_id") updatedData.status_name = STATUS_LABELS[value as keyof typeof STATUS_LABELS] || updatedData.status_name;
        if (field === "priority_id") updatedData.priority_name = PRIORITY_LABELS[value as keyof typeof PRIORITY_LABELS] || updatedData.priority_name;

        setEditableData(updatedData);

        if (onTicketChange) onTicketChange({ ...ticket, ...updatedData });
    };

    return (
        <Card
            elevation={0}
            sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                borderRadius: "16px",
                overflow: "hidden",
                border: (theme) => `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => theme.palette.mode === 'dark'
                        ? '0 8px 24px rgba(0,0,0,0.5)'
                        : '0 8px 24px rgba(0,0,0,0.12)',
                    borderColor: (theme) => theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.2)'
                        : 'rgba(0,0,0,0.15)'
                }
            }}
        >
            {/* כפתור עריכה */}
            {!editable && (role === UserRole.TEAM_LEAD || role === UserRole.DEVELOPER) && onEditClick && (
                <IconButton onClick={(e) => { e.stopPropagation(); onEditClick(); }} sx={{ position: "absolute", top: 12, right: 12 }} size="small">
                    <Edit fontSize="small" />
                </IconButton>
            )}
            {/* כפתור מחיקה למנהל בלבד */}
            {!editable && role === UserRole.TEAM_LEAD && onDeleteClick && (
                <IconButton onClick={(e) => { e.stopPropagation(); onDeleteClick(); }} sx={{ position: "absolute", top: 12, right: 48 }} size="small" color="error">
                    <Delete fontSize="small" />
                </IconButton>
            )}

            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} sx={{ mb: 2.5 }}>
                    {editable ? (
                        <>
                            <TextField 
                                select 
                                label="Status" 
                                size="small" 
                                value={editableData.status_id || editableData.status || ""} 
                                onChange={(e) => handleFieldChange("status_id", Number(e.target.value))} 
                                sx={{ minWidth: 120 }}
                            >
                                {statuses?.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
                            </TextField>
                            <TextField 
                                select 
                                label="Priority" 
                                size="small" 
                                value={editableData.priority_id || editableData.priority || ""} 
                                onChange={(e) => handleFieldChange("priority_id", Number(e.target.value))} 
                                sx={{ minWidth: 120 }}
                            >
                                {priorities?.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
                            </TextField>
                        </>
                    ) : (
                        <>
                            <StatusChip statusName={ticket.status_name || STATUS_LABELS[(ticket.status || ticket.status_id || 1) as keyof typeof STATUS_LABELS]} />
                            <PriorityChip priorityName={ticket.priority_name || PRIORITY_LABELS[(ticket.priority || ticket.priority_id || 1) as keyof typeof PRIORITY_LABELS]} />
                        </>
                    )}
                </Stack>

                {editable ? (
                    <TextField fullWidth label="Subject" value={editableData.subject} onChange={(e) => handleFieldChange("subject", e.target.value)} sx={{ mb: 1.5 }} />
                ) : (
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                        {ticket.subject}
                    </Typography>
                )}

                {editable ? (
                    <TextField fullWidth multiline rows={3} label="Description" value={editableData.description} onChange={(e) => handleFieldChange("description", e.target.value)} sx={{ mb: 3 }} />
                ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
                        {ticket.description}
                    </Typography>
                )}

                <Box sx={{ mt: "auto", pt: 2.5, borderTop: (theme) => `2px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}` }}>
                    <Stack spacing={1.5}>
                        {/* Assigned To */}
                        {editable && users && users.length > 0 ? (
                            <TextField
                                select
                                fullWidth
                                label="Assigned To"
                                size="small"
                                value={editableData.assignedDeveloperId || ""}
                                onChange={(e) => {
                                    const selectedUserId = e.target.value;
                                    const selectedUser = users.find(u => String(u.id) === selectedUserId);
                                    
                                    let updatedData = { 
                                        ...editableData, 
                                        assignedDeveloperId: selectedUserId 
                                    };
                                    
                                    if (selectedUser) {
                                        updatedData.assigned_to_name = selectedUser.name;
                                    } else {
                                        updatedData.assigned_to_name = undefined;
                                    }
                                    
                                    setEditableData(updatedData);
                                    if (onTicketChange) onTicketChange({ ...ticket, ...updatedData });
                                }}
                            >
                                <MenuItem value="">Unassigned</MenuItem>
                                {users.map((u) => (
                                    <MenuItem key={u.id} value={String(u.id)}>
                                        {u.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        ) : (
                            <Stack direction="row" alignItems="center" spacing={1.5}>
                                <Avatar
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        fontSize: "0.75rem",
                                        fontWeight: 700,
                                        bgcolor: 'primary.main',
                                        color: 'primary.contrastText',
                                        opacity: (ticket.assigned_to_name || ticket.assignedDeveloperId) ? 1 : 0.5
                                    }}
                                >
                                    <Assignment fontSize="small" />
                                </Avatar>
                                <Box>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.7rem", opacity: 0.7, mb: 0.2 }}>
                                        Assigned To
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: "0.9rem",
                                            color: (ticket.assigned_to_name || ticket.assignedDeveloperId) ? "text.primary" : "text.secondary",
                                            fontStyle: (ticket.assigned_to_name || ticket.assignedDeveloperId) ? "normal" : "italic"
                                        }}
                                    >
                                        {ticket.assigned_to_name || ticket.assignedDeveloperId || "Unassigned"}
                                    </Typography>
                                </Box>
                            </Stack>
                        )}

                        {/* Created By */}
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Avatar sx={{ width: 32, height: 32, fontSize: "0.75rem", fontWeight: 700 }}>{initials}</Avatar>
                            <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.7rem", opacity: 0.7, mb: 0.2 }}>Created by</Typography>
                                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "0.9rem", color: "text.primary" }}>{displayName}</Typography>
                            </Box>
                        </Stack>

                        {/* Created Date */}
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <CalendarToday sx={{ fontSize: 16, color: "text.secondary", opacity: 0.7 }} />
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.8rem" }}>{formatDate(normalizedTicket.createdAt, { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</Typography>
                        </Stack>
                        <Button
                            fullWidth
                            variant="contained"
                            size="small"
                            startIcon={<Visibility fontSize="small" />}
                            onClick={handleViewDetails}
                            sx={{ mt: 1, borderRadius: 2, textTransform: 'none', fontWeight: 700 }}
                        >
                            View Details
                        </Button>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
}

export default TicketCard;