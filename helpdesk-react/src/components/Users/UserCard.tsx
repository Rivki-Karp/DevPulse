import { Card, CardContent, Typography, Avatar, Stack, Box, Chip } from "@mui/material";
import {Email, Security } from "@mui/icons-material";
import { type User, ROLE_DISPLAY_NAMES, getRoleColor } from "../../models/user.model";


function UserCard({ user }: { user: User }) {

    return (
        <Card 
            elevation={3} 
            sx={{ 
                borderRadius: 3, 
                position: 'relative', 
                minHeight: 250,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: (theme) => theme.palette.mode === 'dark' 
                        ? '0 12px 32px rgba(0,0,0,0.6)' 
                        : '0 12px 32px rgba(0,0,0,0.15)',
                    borderColor: (theme) => theme.palette.mode === 'dark' 
                        ? 'rgba(255,255,255,0.2)' 
                        : 'rgba(0,0,0,0.15)'
                }
            }}
        >
            <CardContent>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                        {user.name?.[0]}
                    </Avatar>
                </Box>

                <Stack spacing={2}>
                    <Typography variant="h6" fontWeight={700}>
                        {user.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Email fontSize="small" color="action" />
                        <Typography variant="body2">{user.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Security fontSize="small" color="action" />
                        <Chip
                            label={ROLE_DISPLAY_NAMES[user.role] || user.role}
                            size="small"
                            color={getRoleColor(user.role)}
                        />
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default UserCard;