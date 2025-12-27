import { useState, useMemo } from "react";
import { ThemeProvider, CssBaseline, Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { StyleDefinitions } from "./StyleDefinitions";
import Header from "./components/Header";
import { ThemeContext } from "./contexts/ThemeContext";
import { useAutoLogout } from "./service/useAutoLogout";

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const theme = useMemo(() => StyleDefinitions(mode), [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  useAutoLogout();
  
  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ toggleColorMode }}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          <Header toggleColorMode={toggleColorMode} />
          <Toolbar />
          <Box component="main" sx={{ p: 3 }}>
            <Outlet />
          </Box>
        </Box>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;