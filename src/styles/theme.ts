import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      background: string;
      textSecondary: string;
    }
  }
  interface PaletteOptions {
    custom?: {
      background: string;
      textSecondary: string;
    }
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#311721',
    },
    background: {
      default: '#f3e2d8',
    },
    text: {
      primary: '#374151',
    },
    custom: {
      background: '#f3e2d8',
      textSecondary: '#6B7280',
    },
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    h4: {
      fontFamily: '"Crimson Text", serif',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          transition: 'background-color 150ms ease',
        },
      },
    },
  },
}); 