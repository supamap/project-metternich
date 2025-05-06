import { useState } from "react";
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

export default function DataByCountry({ historyData }: Props) {
  const allCountries = Array.from(
    new Set(historyData.records.flatMap((r) => Object.keys(r.countries)))
  );

  const [selectedCountry, setSelectedCountry] = useState<string>(allCountries[0]);

  const tableData = historyData.records.map((record) => {
    const country = record.countries[selectedCountry];
    return {
      countryCode: String(record.date),
      gdp: country?.gdp ?? 0,
      pop: country?.pop ?? 0,
      gdp_per_capita: country?.gdp_per_capita ?? 0,
    };
  });

  const columns = [
    { id: "countryCode", label: "Date" },
    { id: "gdp", label: "GDP", numeric: true },
    { id: "pop", label: "Population", numeric: true },
    { id: "gdp_per_capita", label: "GDP per Capita", numeric: true },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        🏳️ Data by Country
      </Typography>
      
      <FormControl sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel>Select Country</InputLabel>
        <Select
          value={selectedCountry}
          label="Select Country"
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {allCountries.map((countryCode) => (
            <MenuItem key={countryCode} value={countryCode}>
              {countryCode}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <DataTable data={tableData} columns={columns} />
    </Box>
  );
}
