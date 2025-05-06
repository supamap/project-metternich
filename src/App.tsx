import { useState } from "react";
import FileUpload from "./components/FileUpload.js";
import Dashboard from "./components/Dashboard.js";
import DataByDate from "./components/DataByDate.js";
import DataByCountry from "./components/DataByCountry.js";
import DataByType from "./components/DataByType.js";
import { SaveData, HistoryData } from "./types/SaveData.js";
import { AppBar, Toolbar, Typography, Button, Box, Container, Chip, ThemeProvider, CssBaseline } from "@mui/material";
import nightingaleLogo from './assets/nightingale_logo.png';
import './styles/theme.css';
import { theme } from './styles/theme';

type View = "dashboard" | "by-date" | "by-country" | "by-type";

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="app-container">
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar className="nav-toolbar">
            <Typography 
              variant="h4" 
              component="div" 
              className="nav-title"
            >
              <img src={nightingaleLogo} alt="Nightingale Logo" className="nav-logo" />
              Project Nightingale
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box className="file-upload-container">
                <FileUpload onDataLoaded={handleDataLoaded} />
                {historyData.records.length > 0 && (
                  <Chip 
                    label={`${historyData.records.length} dates`}
                    color="secondary"
                    size="small"
                  />
                )}
              </Box>
              <Box>
                <Button className="nav-button" onClick={() => setView("dashboard")}>Dashboard</Button>
                <Button className="nav-button" onClick={() => setView("by-date")}>Data by Date</Button>
                <Button className="nav-button" onClick={() => setView("by-country")}>Data by Country</Button>
                <Button className="nav-button" onClick={() => setView("by-type")}>Data by Type</Button>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" className="content-container">
          <Box>
            {view === "dashboard" && historyData.records.length > 0 && (
              <Dashboard data={historyData} />
            )}
            {view === "by-date" && <DataByDate historyData={historyData} />}
            {view === "by-country" && <DataByCountry historyData={historyData} />}
            {view === "by-type" && <DataByType historyData={historyData} />}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
