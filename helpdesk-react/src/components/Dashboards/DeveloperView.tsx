import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Paper, Stack, CircularProgress } from '@mui/material';
import { getAllTickets } from '../../service/Tickets';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import type { RootState } from '../../store/store';
import { Priority, Status, type Ticket } from '../../models/ticket.model';
import StatsCard from '../styleComponnents/StatsCard';


const Developerview: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllTickets();

            const mappedTickets = data.map(ticket => {

                return {
                    ...ticket,
                    status: ticket.status_id ?? ticket.status,
                    priority: ticket.priority_id ?? ticket.priority,
                };
            });

            setTickets(mappedTickets);
            setLoading(false);
        };
        fetchData();
    }, []); // Removed user?.id to prevent redundant API calls

    const userTasks = tickets.filter(t => {
        const isAssignedToUser = t.assignedDeveloperId === user?.id;
        const isUnassigned = !t.assignedDeveloperId;
        return isAssignedToUser || isUnassigned;
    });

    const highPriorityTasks = userTasks.filter(t => {
        const isHighPriority = t.priority === Priority.high;
        const isNotDone = t.status !== Status.done;
        return isHighPriority && isNotDone;
    });

    const blockedTasks = userTasks.filter(t => {
        const isBlocked = t.status === Status.inProgress;
        return isBlocked;
    });

    const completedThisWeek = userTasks.filter(t => {
        const isCompleted = t.status === Status.done;
        return isCompleted;
    }).length;

    if (loading) return <CircularProgress sx={{ display: 'block', m: 'auto', mt: 5, color: '#00e5ff' }} />;

    return (
        <Stack spacing={4}>
            {/* 1. ניתוח נתונים (Analytics Cards) */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', '& > *': { flex: '1 1 250px' } }}>
                <StatsCard title="Completed (Global)" value={completedThisWeek} color="#00e676" icon={<TaskAltIcon />} />
                <StatsCard title="Your High Priority" value={highPriorityTasks.length} color="#ff5252" icon={<AssignmentLateIcon />} />
                <StatsCard title="Blocked Tasks" value={blockedTasks.length} color="#ffab40" icon={<HourglassEmptyIcon />} />
            </Box>

            {/* 2. חלוקה לקבוצות מיקוד (Focus Groups) */}
            <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>

                {/* עמודת משימות דחופות */}
                <Paper sx={{
                    flex: 1, p: 3, borderRadius: '16px', bgcolor: '#111b27', border: '1px solid #1e293b'
                }}>
                    <Typography variant="h6" fontWeight="700" color="#ff5252" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AssignmentLateIcon fontSize="small" /> High Priority & Ready
                    </Typography>
                    <Typography variant="caption" color="text.secondary">Top 3 tasks that need your immediate attention</Typography>

                    <Stack spacing={2} sx={{ mt: 3 }}>
                        {highPriorityTasks.slice(0, 3).map(ticket => (
                            <Box key={ticket.id} sx={{
                                p: 2, borderRadius: '12px', bgcolor: '#1a222c', border: '1px solid #2d3748',
                                '&:hover': { borderColor: '#ff5252', transition: '0.3s' }
                            }}>
                                <Typography variant="subtitle2" fontWeight="600">{ticket.subject}</Typography>
                                <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
                                    {ticket.description}
                                </Typography>
                            </Box>
                        ))}
                        {highPriorityTasks.length === 0 && <Typography variant="body2" color="text.disabled">No high priority tasks. Good job!</Typography>}
                    </Stack>
                </Paper>

                {/* עמודת משימות חסומות */}
                <Paper sx={{
                    flex: 1, p: 3, borderRadius: '16px', bgcolor: '#111b27', border: '1px solid #1e293b'
                }}>
                    <Typography variant="h6" fontWeight="700" color="#ffab40" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <HourglassEmptyIcon fontSize="small" /> Waiting / Blocked
                    </Typography>
                    <Typography variant="caption" color="text.secondary">Tasks pending feedback or external blockers</Typography>

                    <Stack spacing={2} sx={{ mt: 3 }}>
                        {blockedTasks.map(ticket => (
                            <Box key={ticket.id} sx={{
                                p: 2, borderRadius: '12px', bgcolor: '#1a222c', border: '1px solid #2d3748',
                                opacity: 0.8
                            }}>
                                <Typography variant="subtitle2" fontWeight="600">{ticket.subject}</Typography>
                                <Typography variant="caption" sx={{ color: '#ffab40' }}>Status: On Hold</Typography>
                            </Box>
                        ))}
                        {blockedTasks.length === 0 && <Typography variant="body2" color="text.disabled">Nothing is blocking you right now.</Typography>}
                    </Stack>
                </Paper>

            </Box>
        </Stack>
    );
};

export default Developerview;