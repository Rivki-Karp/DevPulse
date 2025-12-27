import React, { useEffect, useState } from 'react';
import { formatDate } from '../../utils/dateUtils';
import { Box, Typography, Paper, Stack, CircularProgress } from '@mui/material';
import { getAllTickets } from '../../service/Tickets';
import type { Ticket } from '../../models/ticket.model';
import { Status, Priority, PRIORITY_LABELS, STATUS_LABELS } from '../../models/ticket.model';
import PeopleIcon from '@mui/icons-material/People';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StatsCard from '../styleComponnents/StatsCard';

const TeamLeadView: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllTickets();
            // מיפוי נתונים מהשרת לשדות הפנימיים, כולל המרת created_at ל-createdAt
            const mapped = data.map(t => ({
                ...t,
                createdAt: t.createdAt || t.created_at,
                status: t.status_id ?? t.status,
                priority: t.priority_id ?? t.priority,
                assignedDeveloperId: t.assigned_to ?? undefined,
            }));
            setTickets(mapped);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) return <CircularProgress sx={{ display: 'block', m: 'auto', mt: 5, color: '#00ffa3' }} />;

    // חישוב לוגיקה ניהולית
        const openTickets = tickets.filter(t => t.status !== Status.done);
        const highPriorityTickets = tickets.filter(t => t.priority === Priority.high && t.status !== Status.done);
        const unassignedTickets = tickets.filter(
            t =>
                (t.assignedDeveloperId === null || t.assignedDeveloperId === undefined || t.assignedDeveloperId === "") &&
                t.status !== Status.done
        );

    // חישוב עומס מפתחים (כמה טיקטים לכל מפתח)
    const workloadMap: Record<string, number> = {};
    tickets.forEach(t => {
        if (t.assignedDeveloperId && t.status !== Status.done) {
            workloadMap[t.assignedDeveloperId] = (workloadMap[t.assignedDeveloperId] || 0) + 1;
        }
    });

    return (
        <Stack spacing={4}>
            {/* 1. כרטיסי ניהול גלובליים */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', '& > *': { flex: '1 1 240px' } }}>
                <StatsCard title="Total Open" value={openTickets.length} color="#00ffa3" icon={<AssignmentIcon />} />
                <StatsCard title="High Priority Fixes" value={highPriorityTickets.length} color="#ff5252" icon={<ErrorOutlineIcon />} />
                <StatsCard title="Unassigned" value={unassignedTickets.length} color="#ffab40" icon={<PeopleIcon />} />
            </Box>


            <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>

                {/* 2. רשימת טיקטים להקצאה מיידית */}
                <Paper sx={theme => ({
                    flex: 1.5,
                    p: 3,
                    borderRadius: '16px',
                    bgcolor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                })}>
                    <Typography variant="h6"fontWeight="700"gutterBottom sx={theme => ({ color: theme.palette.primary.main })}>
                        Unassigned Triage
                    </Typography>

                    <Typography variant="caption" color="text.secondary">Tickets waiting for a developer assignment</Typography>
                    <Stack spacing={2} sx={{ mt: 3 }}>
                        {unassignedTickets.slice(0, 5).map(ticket => (
                            <Box key={ticket.id} sx={theme => ({
                                p: 2,
                                borderRadius: '12px',
                                bgcolor: theme.palette.mode === 'dark' ? '#16202c' : theme.palette.grey[100],
                                border: `1px solid ${theme.palette.divider}`,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'box-shadow 0.2s, background 0.2s',
                                boxShadow: 0,
                                cursor: 'pointer',
                                '&:hover': {
                                    boxShadow: 4,
                                    bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[200],
                                },
                            })}>
                                <Box>
                                    <Typography variant="subtitle2">{ticket.subject}</Typography>
                                        <Typography variant="caption" color="text.secondary">Created: {formatDate(ticket.createdAt)}</Typography>
                                </Box>
                                <Box sx={theme => ({
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: 1,
                                    bgcolor: ticket.priority === Priority.high
                                        ? (theme.palette.mode === 'dark' ? '#ff525233' : '#ffebee')
                                        : theme.palette.divider,
                                })}>
                                    <Typography variant="caption" color={ticket.priority === Priority.high ? '#ff5252' : 'inherit'}>
                                        {PRIORITY_LABELS[ticket.priority]}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                        {unassignedTickets.length === 0 && <Typography color="text.disabled">All tickets are assigned!</Typography>}
                    </Stack>
                </Paper>

                {/* 3. עומס עבודה לפי מפתח */}
                <Paper sx={theme => ({
                    flex: 1,
                    p: 3,
                    borderRadius: '16px',
                    bgcolor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                })}>
                    <Typography variant="h6" fontWeight="700" gutterBottom>Developer Load</Typography>
                    <Stack spacing={3} sx={{ mt: 2 }}>
                        {Object.entries(workloadMap).map(([devId, count]) => (
                            <Box key={devId}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Developer ID: {devId}</Typography>
                                    <Typography variant="body2" fontWeight="bold">{count} Tasks</Typography>
                                </Box>
                                {/* פס התקדמות המציג עומס יחסי */}
                                <Box sx={theme => ({ width: '100%', height: 6, bgcolor: theme.palette.divider, borderRadius: 3 })}>
                                    <Box sx={theme => ({
                                        width: `${Math.min(count * 10, 100)}%`,
                                        height: '100%',
                                        bgcolor: count > 5 ? theme.palette.error.main : theme.palette.primary.main,
                                        borderRadius: 3,
                                        transition: '0.5s width',
                                    })} />
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                </Paper>

            </Box>
        </Stack>
    );
};

export default TeamLeadView;