import { formatDateTime } from '../../utils/dateUtils';
import { Box, Button, Chip, CircularProgress, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { ArrowBack, Person, Schedule } from '@mui/icons-material';
import type { Ticket } from '../../models/ticket.model';
import { STATUS_LABELS, PRIORITY_LABELS } from '../../models/ticket.model';
import { useNavigate, useParams ,useLocation} from 'react-router-dom';
import { useState,useEffect } from 'react';
import { getTicketByID } from '../../service/Tickets';
import CommentSection from '../Comments/CommentSection';

function TicketDetails() {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const navigate = useNavigate();

    // מיפוי created_at ל-createdAt גם בטעינה מ-location.state
    const initialTicket = location.state?.ticket
        ? { ...location.state.ticket, createdAt: location.state.ticket.createdAt || location.state.ticket.created_at }
        : null;
    const [ticket, setTicket] = useState<Ticket | null>(initialTicket);
    

    const [loading, setLoading] = useState(!ticket);

    useEffect(() => {

        if (!ticket && id) {
            getTicketByID(Number(id)).then(data => {
                if (data) {
                    // Ensure all required fields exist and map created_at to createdAt
                    setTicket({
                        id: data.id ?? "",
                        subject: data.subject ?? "",
                        description: data.description ?? "",
                        status: data.status ?? "open",
                        priority: data.priority ?? "low",
                        created_by: data.created_by ?? "",
                        clientOwnerId: data.clientOwnerId ?? "",
                        assignedDeveloperId: data.assignedDeveloperId,
                        createdAt: data.createdAt  ?? "",
                        updatedAt: data.updatedAt ?? "",
                    });
                } else {
                    setTicket(null);
                }
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            });
        }
    }, [id, ticket]);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
    if (!ticket) return <Typography variant="h6">Ticket not found.</Typography>;

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            {/* כפתור חזרה */}
            <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>
                Back to List
            </Button>

            <Grid container spacing={4}>
                {/* צד שמאל: פרטי הטיקט */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
                        <Typography variant="h4" fontWeight={800} gutterBottom>
                            {ticket.subject}
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                            <Chip label={STATUS_LABELS[ticket.status]} color="primary" variant="outlined" />
                            <Chip label={PRIORITY_LABELS[ticket.priority]} color="warning" />
                        </Stack>
                        <Divider sx={{ mb: 3 }} />
                        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                            {ticket.description}
                        </Typography>
                    </Paper>

                    {/* קומפוננטת תגובות */}
                    <CommentSection ticketId={id!} />
                </Grid>

                {/* צד ימין: Sidebar עם Metadata */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Ticket Info</Typography>
                        <Stack spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Person color="action" />
                                <Box>
                                    <Typography variant="caption" display="block" color="text.secondary">Reporter</Typography>
                                    <Typography variant="body2" fontWeight={600}>{ticket.created_by || 'System'}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Schedule color="action" />
                                <Box>
                                    <Typography variant="caption" display="block" color="text.secondary">Created At</Typography>
                                    <Typography variant="body2">{formatDateTime(ticket.createdAt)}</Typography>
                                </Box>
                            </Box>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default TicketDetails;