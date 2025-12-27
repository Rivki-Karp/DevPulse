import { createBrowserRouter } from "react-router-dom";
import RoleGuard from "./guards/RoleGuard";
import AuthGuard from "./guards/AuthGuard";
import { UserRole } from "./models/user.model";

import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import TicketList from "./components/Tickets/TicketList";
import UserList from "./components/Users/UserList";
import TicketDetails from "./components/Tickets/TicketDetails";
import AddTicket from "./components/Tickets/AddTicket";
import LandingPage from "./components/LandingPage";

const allowed = [UserRole.TEAM_LEAD, UserRole.DEVELOPER, UserRole.CLIENT_PM];

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        element: (
          <AuthGuard>
            <Layout />
          </AuthGuard>
        ),
        children: [
          { index: true, element: <LandingPage /> },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "tickets",
            element: (
              <RoleGuard allowedRoles={allowed}>
                <TicketList />
              </RoleGuard>
            ),
          },
          {
            path: "tickets/new",
            element: (
              <RoleGuard allowedRoles={[UserRole.CLIENT_PM]}>
                <AddTicket asPage={true} />
              </RoleGuard>
            ),
          },
          {
            path: "/users",
            element: (
              <RoleGuard allowedRoles={[UserRole.TEAM_LEAD]}>
                <UserList />
              </RoleGuard>
            ),
          },
          {
            path: "tickets/:id",
            element: (
              <RoleGuard allowedRoles={allowed}>
                <TicketDetails />
              </RoleGuard>
            ),
          },
        ],
      },
      { path: "*", element: <h2>404 - Page Not Found</h2> },
    ],
  },
]);

export default route;