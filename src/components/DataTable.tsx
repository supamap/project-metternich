import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";
import { useState } from "react";
import { DATA_KEY_FORMATTERS, DataKey } from "../utils/formatters";

type Order = "asc" | "desc";

interface DataTableProps {
  data: Array<{
    countryCode: string;
    [key: string]: string | number;
  }>;
  columns: Array<{
    id: string;
    label: string;
    numeric?: boolean;
  }>;
  dataType?: DataKey; // Optional prop to override formatting for all numeric columns
}

export default function DataTable({ data, columns, dataType }: DataTableProps) {
  const [orderBy, setOrderBy] = useState<string>(columns[0].id);
  const [order, setOrder] = useState<Order>("desc");

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    return order === "asc"
      ? aValue > bValue
        ? 1
        : -1
      : bValue > aValue
      ? 1
      : -1;
  });

  const formatValue = (columnId: string, value: number) => {
    // If dataType is provided, use it for all numeric columns
    if (dataType) {
      return DATA_KEY_FORMATTERS[dataType as DataKey](value);
    }
    // Otherwise, use the column ID to determine formatting
    const formatter = DATA_KEY_FORMATTERS[columnId as DataKey];
    return formatter ? formatter(value) : value.toLocaleString();
  };

  return (
    <TableContainer 
      component={Paper} 
      elevation={2}
      sx={{ 
        bgcolor: '#faf0eb',
        '& .MuiTableHead-root': {
          bgcolor: '#f5e6de',
        },
        '& .MuiTableRow-root:hover': {
          bgcolor: '#f8eae3',
        }
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="data table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.numeric ? "right" : "left"}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : "asc"}
                  onClick={() => handleRequestSort(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow
              key={row.countryCode}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              hover
            >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.numeric ? "right" : "left"}
                >
                  {column.id === "countryCode" 
                    ? row[column.id]
                    : typeof row[column.id] === "number"
                    ? formatValue(column.id, Number(row[column.id]))
                    : row[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 