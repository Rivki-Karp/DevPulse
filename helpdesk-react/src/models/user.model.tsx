export const UserRole = {
  TEAM_LEAD: 'admin',  
  DEVELOPER: 'agent', 
  CLIENT_PM: 'customer'
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  password?: string;
  is_active: boolean;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const ROLE_DISPLAY_NAMES: Record<string, string> = {
  [UserRole.TEAM_LEAD]: "Team Lead",
  [UserRole.DEVELOPER]: "Developer",
  [UserRole.CLIENT_PM]: "Client PM"
};

export const getRoleColor = (role: UserRole): 'error' | 'warning' | 'primary' => {
  const colors = {
    [UserRole.TEAM_LEAD]: 'error' as const,
    [UserRole.DEVELOPER]: 'warning' as const,
    [UserRole.CLIENT_PM]: 'primary' as const,
  };
  return colors[role] || 'default';
};