import { useState } from "react";
import FileUpload from "./components/FileUpload.js";
import Dashboard from "./components/Dashboard.js";
import DataByDate from "./components/DataByDate.js";
import DataByCountry from "./components/DataByCountry.js";
import DataByType from "./components/DataByType.js";
import HistoryDataChip from "./components/HistoryDataChip";
import { SaveData, HistoryData } from "./types/SaveData.js";
import { AppBar, Box, Container } from "@mui/material";
import { StyledToolbar, NavButton, LogoTypography } from "./components/styled/AppStyles";
import nightingaleLogo from './assets/nightingale_logo.png';

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
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="static" color="primary" elevation={0}>
        <StyledToolbar>
          <LogoTypography>
            <img src={nightingaleLogo} alt="Nightingale Logo" style={{ height: '80px', width: 'auto' }} />
            Vic3 Nightingale
          </LogoTypography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <HistoryDataChip historyData={historyData} />

            <FileUpload onDataLoaded={handleDataLoaded} />
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
