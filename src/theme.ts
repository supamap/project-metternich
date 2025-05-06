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
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          elevation: 0,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: '24px',
        },
      },
    },
  },
});

export default theme;
