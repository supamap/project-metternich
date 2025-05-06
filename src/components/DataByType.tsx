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

export default function DataByType({ historyData }: Props) {
  const [dataType, setDataType] = useState<"gdp" | "pop" | "gdp_per_capita">("gdp");

  const allCountries = Array.from(
    new Set(historyData.records.flatMap((r) => Object.keys(r.countries)))
  );

  const tableData = historyData.records.map((record) => {
    const countryData = allCountries.reduce(
      (acc, countryCode) => {
        const value = record.countries[countryCode]?.[dataType] ?? 0;
        acc[countryCode] = value;
        return acc;
      },
      {} as Record<string, number>
    );

    return {
      countryCode: String(record.date),
      ...countryData,
    };
  });

  const columns = [
    { id: "countryCode", label: "Date" },
    ...allCountries.map((country) => ({
      id: country,
      label: country,
      numeric: true,
    }))
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        📊 Data by Type
      </Typography>
      
      <FormControl sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel>Data Type</InputLabel>
        <Select
          value={dataType}
          label="Data Type"
          onChange={(e) => setDataType(e.target.value as "gdp" | "pop" | "gdp_per_capita")}
        >
          <MenuItem value="gdp">GDP</MenuItem>
          <MenuItem value="pop">Population</MenuItem>
          <MenuItem value="gdp_per_capita">GDP per Capita</MenuItem>
        </Select>
      </FormControl>

      <DataTable data={tableData} columns={columns} dataType={dataType} />
    </Box>
  );
}
