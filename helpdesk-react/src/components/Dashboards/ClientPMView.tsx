import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Paper, Stack, CircularProgress, LinearProgress } from '@mui/material';
import { getAllTickets } from '../../service/Tickets';
import type { Ticket } from '../../models/ticket.model';
import { Status, STATUS_LABELS } from '../../models/ticket.model';
import type { RootState } from '../../store/store'; 
import DashboardIcon from '@mui/icons-material/Dashboard';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import StatsCard from '../styleComponnents/StatsCard';

const ClientPMView: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTickets();
      const myOrgTickets = data.filter(t => t.created_by === user?.id);
      // התאמת טיפוס Ticket לשדות שמגיעים מהשרת
      // אם צריך, אפשר להגדיר טיפוס חדש או להרחיב את Ticket
      setTickets(myOrgTickets);
      setLoading(false);
    };
    fetchData();
  }, [user?.id]);

  if (loading) return <CircularProgress sx={{ display: 'block', m: 'auto', mt: 5, color: '#00ffa3' }} />;

  // חישוב נתונים עבור הלקוח
  const total = tickets.length;
  // ספירה לפי status_id או status_name
  const doneCount = tickets.filter(t => t.status_id === Status.done || t.status_name === 'closed').length;
  const inProgressCount = tickets.filter(t => t.status_id === Status.inProgress || t.status_name === 'inProgress').length;
  const completionRate = total > 0 ? Math.round((doneCount / total) * 100) : 0;

    function getStatusLabel(status_id: number) {
      return STATUS_LABELS[status_id as keyof typeof STATUS_LABELS] || '';
    }

  return (
    <Stack spacing={4}>
      {/* 1. כרטיסי סיכום עבור הלקוח */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', '& > *': { flex: '1 1 280px' } }}>
        <StatsCard title="My Requests" value={total} color="#2196f3" icon={<DashboardIcon />} />
        <StatsCard title="In Development" value={inProgressCount} color="#ffab40" icon={<AutorenewIcon />} />
        <StatsCard title="Resolved" value={doneCount} color="#00ffa3" icon={<DoneAllIcon />} />
      </Box>

      {/* 2. התקדמות פרויקט כללית */}
      <Paper sx={{ p: 4, borderRadius: '16px', bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" fontWeight="700" gutterBottom>
          Overall Delivery Progress
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <LinearProgress 
              variant="determinate" 
              value={completionRate} 
              sx={{ height: 12, borderRadius: 5, bgcolor: 'background.paper', '& .MuiLinearProgress-bar': { bgcolor: 'success.main' } }} 
            />
          </Box>
          <Typography variant="h5" fontWeight="bold" color="success.main">{completionRate}%</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {doneCount} out of {total} tickets have been successfully resolved.
        </Typography>
      </Paper>

      {/* 3. רשימת פעילות אחרונה */}
      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        <Paper sx={{ flex: 1, p: 3, borderRadius: '16px', bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" fontWeight="700" mb={2}>Recently Updated</Typography>
          <Stack spacing={2}>
            {tickets
              .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
              .slice(0, 4)
              .map(ticket => (
                <Box key={ticket.id} sx={{ p: 2, borderRadius: '12px', bgcolor: 'background.paper' }}>
                  <Typography variant="subtitle2">{ticket.subject}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Updated: {ticket.updated_at ? new Date(ticket.updated_at).toLocaleDateString() : ''}
                    </Typography>
                    <Typography variant="caption" sx={{ color: ticket.status_id === Status.done ? 'success.main' : 'warning.main' }}>
                      ● {getStatusLabel(ticket.status_id)}
                    </Typography>
                  </Box>
                </Box>
              ))}
          </Stack>
        </Paper>
      </Box>
    </Stack>
  );
};

export default ClientPMView;