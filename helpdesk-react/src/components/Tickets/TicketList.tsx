import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Grid, MenuItem, Stack, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { type Ticket, STATUS_LABELS, PRIORITY_LABELS, Status, Priority } from "../../models/ticket.model";
import { useSelector, useDispatch } from "react-redux";
import { setTickets, setLoading, setError } from "../../store/ticketsSlice";
import EditTicket from "./EditTicket";
import { getAllTickets } from "../../service/Tickets";
import { getDevelopers } from "../../service/Users";
import { showSuccessAlert, showWarningAlert } from "../styleComponnents/myAlert";
import TicketCard from "./ticketCard";
import { UserRole, type User } from "../../models/user.model";
import FormTextField from "../styleComponnents/FormTextField";
import type { RootState } from "../../store/store";


function TicketList() {
  const tickets = useSelector((state: RootState) => state.tickets.tickets);
  const loading = useSelector((state: RootState) => state.tickets.loading);
  //const error = useSelector((state: RootState) => state.tickets.error);
  const dispatch = useDispatch();
  const [users, setUsers] = useState<User[]>([]);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<number | 'All'>('All');
  const [priorityFilter, setPriorityFilter] = useState<number | 'All'>('All');

  const navigate = useNavigate();

  const filterFields = [
    {
      name: "status",
      label: "Status",
      value: statusFilter,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value === 'All' ? 'All' : Number(e.target.value);
        setStatusFilter(val);
      },
      select: true,
      children: [
        <MenuItem key={-1} value="All">All Statuses</MenuItem>,
        ...Object.entries(STATUS_LABELS).map(([id, name]) => (
          <MenuItem key={id} value={Number(id)}>{name}</MenuItem>
        ))
      ]
    },
    {
      name: "priority",
      label: "Priority",
      value: priorityFilter,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value === 'All' ? 'All' : Number(e.target.value);
        setPriorityFilter(val);
      },
      select: true,
      children: [
        <MenuItem key={-1} value="All">All Priorities</MenuItem>,
        ...Object.entries(PRIORITY_LABELS).map(([id, name]) => (
          <MenuItem key={id} value={Number(id)}>{name}</MenuItem>
        ))
      ]
    }
  ];

  useEffect(() => {
    const loadData = async () => {
      dispatch(setLoading(true));
      try {
        const ticketsData = await getAllTickets();
        const mappedTickets = ticketsData.map((ticket: any) => ({
          ...ticket,
          status: ticket.status_id as Status,
          priority: ticket.priority_id as Priority,
        }));
        dispatch(setTickets(mappedTickets));
        if (user?.role === UserRole.TEAM_LEAD) {
          try {
            const allUsersData = await getDevelopers();
            setUsers(allUsersData);
          } catch (error) {
            showWarningAlert("Oops...", "Failed to load users. Please try again.");
            console.error("Failed to fetch users:", error);
          }
        }
      } catch (error) {
        dispatch(setError("שגיאה בטעינת טיקטים"));
        showWarningAlert("Oops...", "Failed to load tickets. Please try again.");
        console.error("Failed to fetch tickets:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    loadData();
  }, [user, dispatch]);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' || ticket.status === Number(statusFilter);
    const matchesPriority =
      priorityFilter === 'All' || ticket.priority === Number(priorityFilter);

    const isMatch = matchesSearch && matchesStatus && matchesPriority;
    console.log("Ticket:", ticket, "Matches:", isMatch); // Log filtering results
    return isMatch;
  });
  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setPriorityFilter("All");
  };

  const handleEditClick = (ticket: any) => {
    setEditingTicket(ticket);
  };

  const handleEditClose = () => {
    setEditingTicket(null);
  };

  const handleEditSuccess = () => {
    handleEditClose();
    showSuccessAlert("Success", "Ticket updated successfully");
    dispatch(setLoading(true));
    getAllTickets()
      .then(data => {
        const mappedTickets = data.map((ticket: any) => ({
          ...ticket,
          status: ticket.status_id as Status,
          priority: ticket.priority_id as Priority,
        }));
        dispatch(setTickets(mappedTickets));
      })
      .catch(() => {
        dispatch(setError("שגיאה בטעינת טיקטים"));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={800}>
          Ticket Explorer
        </Typography>
        {user?.role === UserRole.CLIENT_PM && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/tickets/new")}
          >
            New Ticket
          </Button>
        )}
      </Stack>

      {/* Filters */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mb: 5, bgcolor: "background.paper", p: 2, borderRadius: 2, boxShadow: 1 }}
      >
        <FormTextField
          name="search"
          label="Search by subject..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />
        {filterFields.map((field) => (
          <FormTextField
            key={field.name}
            {...field}
          />
        ))}
        {(searchQuery || statusFilter !== "All" || priorityFilter !== "All") && (
          <Button
            variant="text"
            color="error"
            onClick={handleClearFilters}
            sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
          >
            Clear All
          </Button>
        )}
      </Stack>

      {/* Ticket list */}
      {filteredTickets.length > 0 ? (
        <Grid container spacing={3}>
          {filteredTickets.map((ticket) => (
            <Grid key={ticket.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <TicketCard
                  ticket={{
                    ...ticket,
                    status_name: STATUS_LABELS[ticket.status],
                    priority_name: PRIORITY_LABELS[ticket.priority]
                  }}
                  users={users.map(user => ({ id: Number(user.id), name: user.name || '', role: user.role }))}
                  onEditClick={() => handleEditClick(ticket)}
                  onDeleteClick={async () => {
                    // מחיקת טיקט עם SweetAlert2
                    const Swal = (await import('sweetalert2')).default;
                    const result = await Swal.fire({
                      title: 'Are you sure?',
                      text: 'You will not be able to recover this ticket after deletion!',
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#d33',
                      cancelButtonColor: '#3085d6',
                      confirmButtonText: 'Delete',
                      cancelButtonText: 'Cancel',
                      background: '#0d1620',
                      color: '#fff',
                    });
                    if (result.isConfirmed) {
                      dispatch(setLoading(true));
                      const status = await import('../../service/Tickets').then(m => m.deleteTicketByID(Number(ticket.id)));
                      if (status === 200) {
                        dispatch(setTickets(tickets.filter(t => t.id !== ticket.id)));
                        showSuccessAlert('Deleted!','The ticket has been deleted successfully.');
                      } else {
                        showWarningAlert('Error','Failed to delete the ticket.');
                      }
                      dispatch(setLoading(false));
                    }
                  }}
                />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography sx={{ mt: 4, textAlign: "center", color: "text.secondary" }}>
          No tickets found for status: {statusFilter}
        </Typography>
      )}

      {editingTicket && (
        <EditTicket
          open={!!editingTicket}
          onClose={handleEditClose}
          onSuccess={handleEditSuccess}
          ticketToEdit={editingTicket}
          users={users.map(user => ({ id: Number(user.id), name: user.name || '', role: user.role }))}
          statuses={Object.entries(STATUS_LABELS).map(([id, name]) => ({ id: Number(id), name }))}
          priorities={Object.entries(PRIORITY_LABELS).map(([id, name]) => ({ id: Number(id), name }))}
        />
      )}
    </Box>
  );
}

export default TicketList;
