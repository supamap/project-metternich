import { Chip } from "@mui/material";
import { HistoryData } from "../types/SaveData";

interface HistoryDataChipProps {
  historyData: HistoryData;
}

const HistoryDataChip = ({ historyData }: HistoryDataChipProps) => {
  if (historyData.records.length === 0) return null;
  
  return (
    <Chip 
      label={`${historyData.records.length} dates`}
      color="secondary"
      size="small"
    />
  );
};

export default HistoryDataChip; 