import { useState } from "react";
import { MenuItem, Stack, Typography, Container, Paper, Button, CircularProgress } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { postTicket } from "../../service/Tickets";
import type { Ticket } from "../../models/ticket.model";
import { Status, Priority, PRIORITY_LABELS } from "../../models/ticket.model";
import { showSuccessAlert, showWarningAlert } from "../styleComponnents/myAlert";
import FormTextField from "../styleComponnents/FormTextField";
import FormButton from "../styleComponnents/FormButton";

interface AddTicketProps {
  open?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  tickets?: Ticket[];
  asPage?: boolean;
}

function AddTicket({ onSuccess }: AddTicketProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    priority: Priority.medium,
    status: Status.open,
    assigned_to: 0,
  });
  const [isLoading, setIsLoading] = useState(false);


  const priorityOptions = Object.entries(PRIORITY_LABELS).map(([id, name]) => ({
    id: Number(id),
    name,
  }));


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formFields = [
    {
      name: "subject",
      label: "Subject",
      value: formData.subject,
      required: true,
    },
    {
      name: "description",
      label: "Description",
      value: formData.description,
      multiline: true,
    },
    {
      name: "priority",
      label: "Priority",
      value: formData.priority,
      select: true,
      options: priorityOptions,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject.trim()) {
      showWarningAlert("Oops...", "Subject is required");
      return;
    }
    setIsLoading(true);
    try {
      await postTicket({
        subject: formData.subject,
        description: formData.description,
        status_id: formData.status,
        priority_id: formData.priority,
        assigned_to: formData.assigned_to,
      });
      showSuccessAlert("Success!", "Ticket created successfully");
      onSuccess?.();
      navigate("/tickets");
      setFormData({
        subject: "",
        description: "",
        status: Status.open,
        priority: Priority.medium,
        assigned_to: 0,
      });
    } catch (error) {
      showWarningAlert("Oops...", "Failed to create ticket. Please check your input and try again.");
      console.error("Failed to create ticket:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate("/tickets")} 
        sx={{ mb: 3 }}
      >
        Back to Tickets
      </Button>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Create New Ticket
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Fill in the details below to create a new support ticket
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {formFields.map((field) => (
              <FormTextField
                key={field.name}
                onChange={handleChange}
                {...field}
              >
                {field.select && field.options?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </FormTextField>
            ))}
            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <FormButton type="submit" fullWidth disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Create Ticket"}
              </FormButton>
              <Button 
                variant="outlined" 
                fullWidth
                onClick={() => navigate("/tickets")}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}

export default AddTicket;
