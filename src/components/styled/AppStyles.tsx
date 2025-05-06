import { styled } from "@mui/material/styles";
import { Toolbar, Button, Box, Typography } from "@mui/material";

export const LogoTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '2rem',
  display: 'flex',
  alignItems: 'center',
  fontFamily: '"Crimson Text", serif',
  color: theme.palette.background.default,
  gap: theme.spacing(1)
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
//   padding: theme.spacing(1, 2),
}));

export const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  marginLeft: theme.spacing(2),
  fontSize: '1.1rem',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));
