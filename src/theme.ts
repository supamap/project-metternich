import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#311721',
      contrastText: '#fff',
    },
    secondary: {
      main: '#9b4d4d',
    },
    background: {
      default: '#f3e2d8',
      paper: '#ffffff',
    },
    text: {
      primary: '#311721',
      secondary: '#5e5e5e',
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8, // Base spacing unit
  typography: {
    h4: {
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '3.2rem',
      lineHeight: 1.1,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        body: {
          minWidth: '320px',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1.1rem',
        },
      },
    },
  },
});

export default theme;
