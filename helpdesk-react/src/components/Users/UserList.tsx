import { Grid, Box, Typography, CircularProgress, Container, InputAdornment, MenuItem, Stack, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsers, setLoading, setError } from "../../store/usersSlice";
import { getAllUsers } from "../../service/Users";
import UserCard from "./UserCard";
import {UserRole, ROLE_DISPLAY_NAMES ,type User} from "../../models/user.model";
import { showWarningAlert } from "../styleComponnents/myAlert";
import { Search, Add as AddIcon } from "@mui/icons-material";
import AddUser from "./AddUser";
import FormTextField from "../styleComponnents/FormTextField";

function UserManagementList() {
   
    const users: User[] = useSelector((state: any) => state.users.users);
    const loading = useSelector((state: any) => state.users.loading);
   // const error = useSelector((state: any) => state.users.error);
    const dispatch = useDispatch();
    const [openAddDialog, setOpenAddDialog] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState<string>("All");

    const loadUsers = async () => {
        dispatch(setLoading(true));
        try {
            const data = await getAllUsers();
            dispatch(setUsers(data));
        } catch (error) {
            dispatch(setError("שגיאה בטעינת משתמשים"));
            showWarningAlert("Error", "Failed to load team members");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => { loadUsers(); }, [dispatch]);


    const filteredUsers = users.filter((user: User) => {
        const matchesName = user.name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "All" || user.role === roleFilter;
        return matchesName && matchesRole;
    });

    const handleAddSuccess = () => {
        loadUsers();
    };

    const filterFields = [
        {
            name: "search",
            label: "Search by name",
            value: searchQuery,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
            InputProps: {
                startAdornment: (
                    <InputAdornment position="start">
                        <Search color="action" />
                    </InputAdornment>
                ),
            },
        },
        {
            name: "role",
            label: "Filter by role",
            value: roleFilter,
            onChange: (e: React.ChangeEvent<any>) => setRoleFilter(e.target.value as string),
            select: true,
            sx: { minWidth: { sm: 200 } },
        },
    ];

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;

 return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={900}>Manage Team Members</Typography>
                <Button 
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenAddDialog(true)}
                >
                    Add New User
                </Button>
            </Stack>

            <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                sx={{ mb: 5, p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}
            >
                {filterFields.map((field) => (
                    <FormTextField
                        key={field.name}
                        {...field}
                    >
                        {field.name === "role"
                            ? [
                                <MenuItem key="All" value="All">All roles</MenuItem>,
                                ...Object.values(UserRole).map((role) => (
                                    <MenuItem key={role} value={role}>
                                        {ROLE_DISPLAY_NAMES[role] || role}
                                    </MenuItem>
                                ))
                            ]
                            : null}
                    </FormTextField>
                ))}
            </Stack>

            <Grid container spacing={3}>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <Grid  key={user.id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <UserCard user={user}  />
                        </Grid>
                    ))
                ) : (
                    <Box sx={{ width: '100%', textAlign: 'center', mt: 5 }}>
                        <Typography variant="h6" color="text.secondary">
                            No team members found.
                        </Typography>
                    </Box>
                )}
            </Grid>

            <AddUser 
                open={openAddDialog} 
                onClose={() => setOpenAddDialog(false)} 
                onSuccess={handleAddSuccess} 
            />
        </Container>
    );
}
export default UserManagementList;