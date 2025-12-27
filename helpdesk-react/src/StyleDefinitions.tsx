import { createTheme } from '@mui/material/styles';

// הוספת הפרמטר (mode) מאפשרת לנו לשלוט בעיצוב מבחוץ
export const StyleDefinitions = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode: mode, // כאן נקבע האם המוד כהה או בהיר
    primary: {
      main: '#00ffa3',      
      contrastText: '#050505',
    },
    secondary: {
      main: '#7000ff', 
    },
    background: {
      default: mode === 'dark' ? '#050a10' : '#f4f6f8', 
      paper: mode === 'dark' ? '#0d1620' : '#ffffff',   
    },
    text: {
      primary: mode === 'dark' ? '#e6edf3' : '#1a1a1a',
      secondary: mode === 'dark' ? '#7d8590' : '#666666',
    },
    divider: mode === 'dark' ? 'rgba(48, 54, 61, 0.8)' : 'rgba(0, 0, 0, 0.12)',
  },
  shape: {
    borderRadius: 12, 
  },
  typography: {
    fontFamily: '"Fira Code", "Roboto Mono", monospace', 
    h2: {
      fontWeight: 800,
      letterSpacing: '-0.5px',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: mode === 'dark' ? '0 0 15px rgba(0, 255, 163, 0.4)' : '0 4px 8px rgba(0, 0, 0, 0.1)', 
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)', 
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: mode === 'dark' ? '#1a2332' : '#ffffff',
            '& input': {
              color: mode === 'dark' ? '#e6edf3' : '#1a1a1a',
              WebkitTextFillColor: mode === 'dark' ? '#e6edf3' : '#1a1a1a',
            },
            '& textarea': {
              color: mode === 'dark' ? '#e6edf3' : '#1a1a1a',
              WebkitTextFillColor: mode === 'dark' ? '#e6edf3' : '#1a1a1a',
            },
            '& fieldset': {
              borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.87)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00ffa3',
            },
          },
          '& .MuiInputLabel-root': {
            color: mode === 'dark' ? '#7d8590' : '#666666',
          },
        },
      },
    },
  },
});