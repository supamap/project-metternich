import { createContext, useContext, useState, ReactNode } from "react";
import { HistoryData, SaveData } from "../types/SaveData.js";

interface HistoryDataContextType {
  historyData: HistoryData;
  addRecord: (record: SaveData) => void;
}

const HistoryDataContext = createContext<HistoryDataContextType | undefined>(undefined);

export function HistoryDataProvider({ children }: { children: ReactNode }) {
  const [historyData, setHistoryData] = useState<HistoryData>({ records: [] });

  const addRecord = (record: SaveData) => {
    setHistoryData(prev => ({
      records: [...prev.records, record].sort((a, b) => a.date - b.date),
    }));
  };

  return (
    <HistoryDataContext.Provider value={{ historyData, addRecord }}>
      {children}
    </HistoryDataContext.Provider>
  );
}

export function useHistoryData() {
  const context = useContext(HistoryDataContext);
  if (!context) {
    throw new Error("useHistoryData must be used within a HistoryDataProvider");
  }
  return context;
}