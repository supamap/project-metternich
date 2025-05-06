import { HistoryData } from "../types/SaveData.js";
import GraphComponent from "./GraphComponent.js";

interface DashboardProps {
    data: HistoryData;
}

export default function Dashboard({ data }: DashboardProps) {
    // Process data by country for proper line connections
    const countryData = data.records.reduce((acc, record) => {
        Object.entries(record.countries).forEach(([country, info]) => {
            if (!acc[country]) {
                acc[country] = [];
            }
            // Only add data points that are positive for log scale
            if (info.gdp > 0 && info.pop > 0) {
                acc[country].push({
                    date: record.date,
                    gdp: info.gdp,
                    population: info.pop,
                    gdp_per_capita: info.gdp_per_capita
                });
            }
        });
        return acc;
    }, {} as Record<string, Array<{ date: number; gdp: number; population: number; gdp_per_capita: number }>>);

    // Sort each country's data by date
    Object.values(countryData).forEach(data => {
        data.sort((a, b) => a.date - b.date);
    });

    // Get array of countries for color assignment
    const countries = Object.keys(countryData);

    // Debug log to verify data structure
    console.log('Processed country data:', countryData);

    return (
        <div className="mt-6 space-y-8">
            <GraphComponent
                title="GDP Over Time"
                dataKey="gdp"
                countryData={countryData}
                countries={countries}
                icon="📈"
            />
            <GraphComponent
                title="Population Over Time"
                dataKey="population"
                countryData={countryData}
                countries={countries}
                icon="👥"
            />
            <GraphComponent
                title="GDP per Capita Over Time"
                dataKey="gdp_per_capita"
                countryData={countryData}
                countries={countries}
                icon="💰"
            />
        </div>
    );
}
