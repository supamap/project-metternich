import { useState } from "react";
import FileUpload from "./components/FileUpload.js";
import Dashboard from "./components/Dashboard.js";
import DataByDate from "./components/DataByDate.js";
import DataByCountry from "./components/DataByCountry.js";
import DataByType from "./components/DataByType.js";
import { SaveData, HistoryData } from "./types/SaveData.js";
import { AppBar, Toolbar, Typography, Button, Box, Container, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import nightingaleLogo from './assets/nightingale_logo.png';


type View = "dashboard" | "by-date" | "by-country" | "by-type";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(1, 2),
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  marginLeft: theme.spacing(2),
  fontSize: '1.1rem',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const StyledFileUpload = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  '& input[type="file"]': {
    display: 'none',
  },
  '& label': {
    color: theme.palette.primary.contrastText,
    cursor: 'pointer',
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.primary.contrastText}`,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
}));

function App() {
  const [historyData, setHistoryData] = useState<HistoryData>({ records: [] });
  const [view, setView] = useState<View>("dashboard");

  const handleDataLoaded = (newRecord: SaveData) => {
    setHistoryData(prev => {
      const filteredRecords = prev.records.filter(record => record.date !== newRecord.date);
      const newRecords = [...filteredRecords, newRecord].sort((a, b) => a.date - b.date);
      return { records: newRecords };
    });
  };

  return (
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
        <AppBar position="static" color="primary" elevation={0}>
          <StyledToolbar>
            <Typography 
              variant="h4" 
              component="div" 
              sx={{ 
                fontWeight: 700, 
                display: 'flex', 
                alignItems: 'center',
                fontFamily: '"Crimson Text", serif',
                color: 'background.default',
                gap: 1
              }}
            >
              <img src={nightingaleLogo} alt="Nightingale Logo" style={{ height: '80px', width: 'auto' }} />
              Project Nightingale
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <StyledFileUpload>
                <FileUpload onDataLoaded={handleDataLoaded} />
                {historyData.records.length > 0 && (
                  <Chip 
                    label={`${historyData.records.length} dates`}
                    color="secondary"
                    size="small"
                  />
                )}
              </StyledFileUpload>
              <Box>
                <NavButton onClick={() => setView("dashboard")}>DASHBOARD</NavButton>
                <NavButton onClick={() => setView("by-date")}>BY DATE</NavButton>
                <NavButton onClick={() => setView("by-country")}>BY COUNTRY</NavButton>
                <NavButton onClick={() => setView("by-type")}>BY TYPE</NavButton>
              </Box>
            </Box>
          </StyledToolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Box sx={{ mt: 4 }}>
            {view === "dashboard" && historyData.records.length > 0 && (
              <Dashboard data={historyData} />
            )}
            {view === "by-date" && <DataByDate historyData={historyData} />}
            {view === "by-country" && <DataByCountry historyData={historyData} />}
            {view === "by-type" && <DataByType historyData={historyData} />}
          </Box>
        </Container>
      </Box>
  );
}

export default App;
