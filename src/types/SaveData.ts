export interface CountryData {
    gdp: number;
    pop: number;
    gdp_per_capita: number;
  }
  
  export interface SaveData {
    date: number; // e.g., 1836.34
    countries: {
      [countryCode: string]: CountryData;
    };
  }
  
  export interface HistoryData {
    records: SaveData[];
  }