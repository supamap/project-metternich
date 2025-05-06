import { useState, useEffect } from "react";
import { HistoryData } from "../types/SaveData.js";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import DataTable from "./DataTable.js";

interface Props {
  historyData: HistoryData;
}

export default function DataByDate({ historyData }: Props) {
  const [selectedDate, setSelectedDate] = useState<number>(
    historyData.records[0]?.date || 0
  );

  // Update selectedDate when new data arrives
  useEffect(() => {
    if (historyData.records.length > 0) {
      setSelectedDate(historyData.records[0].date);
    }
  }, [historyData.records]);

  const selectedRecord = historyData.records.find((r) => r.date === selectedDate);

  const tableData = selectedRecord
    ? Object.entries(selectedRecord.countries).map(([countryCode, info]) => ({
        countryCode,
        ...info,
      }))
    : [];

  const columns = [
    { id: "countryCode", label: "Country" },
    { id: "gdp", label: "GDP", numeric: true },
    { id: "pop", label: "Population", numeric: true },
    { id: "gdp_per_capita", label: "GDP per Capita", numeric: true },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        📅 Data by Date
      </Typography>
      
      <FormControl sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel>Select Date</InputLabel>
        <Select
          value={selectedDate}
          label="Select Date"
          onChange={(e) => setSelectedDate(Number(e.target.value))}
        >
          {historyData.records.map((r) => (
            <MenuItem key={r.date} value={r.date}>
              {r.date}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedRecord ? (
        <DataTable data={tableData} columns={columns} />
      ) : (
        <Typography color="text.secondary">No data for selected date.</Typography>
      )}
    </Box>
  );
}
