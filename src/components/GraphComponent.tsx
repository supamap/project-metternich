import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";
import { DATA_KEY_FORMATTERS, DataKey } from "../utils/formatters";
import { useTheme } from "@mui/material/styles";
import { getColor } from "../utils/getColor";

interface GraphComponentProps {
    title: string;
    dataKey: DataKey;
    countryData: Record<string, Array<{ date: number; gdp: number; pop: number; gdp_per_capita: number }>>;
    countries: string[];
    icon?: string;
}

interface TooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
    countryData: Record<string, Array<{ date: number; gdp: number; pop: number; gdp_per_capita: number }>>;
    dataKey: DataKey;
}

const CustomTooltip = ({ active, payload, label, countryData, dataKey }: TooltipProps) => {
    if (active && payload && payload.length) {
        // Get the date from the payload
        const date = payload[0].payload.date;

        // Find the data point for each country at this date
        const dataPoints = Object.entries(countryData).map(([country, data]) => {
            const point = data.find(d => d.date === date);
            return {
                country,
                value: point ? point[dataKey] : null
            };
        }).filter((point): point is { country: string; value: number } => point.value !== null);

        return (
            <div style={{
                backgroundColor: 'white',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px'
            }}>
                <p>Year: {label}</p>
                {dataPoints.map((point, index) => (
                    <p key={index} style={{ color: getColor(index) }}>
                        {point.country}: {DATA_KEY_FORMATTERS[dataKey](point.value)}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function GraphComponent({ title, dataKey, countryData, countries, icon = "📊" }: GraphComponentProps) {
    const [useLogScale, setUseLogScale] = useState(false);
    const theme = useTheme(); // 👈 Access MUI theme

    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center gap-4 mb-4">
                <h2 className="text-xl font-semibold" style={{ color: theme.palette.text.primary }}>
                    {icon} {title}
                </h2>
                <ButtonGroup size="small">
                    <Button
                        variant={!useLogScale ? "contained" : "outlined"}
                        onClick={() => setUseLogScale(false)}
                    >
                        Linear
                    </Button>
                    <Button
                        variant={useLogScale ? "contained" : "outlined"}
                        onClick={() => setUseLogScale(true)}
                    >
                        Log
                    </Button>
                </ButtonGroup>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart margin={{ left: 10, right: 0, top: 10, bottom: 0 }}>
                    <XAxis
                        type="number"
                        dataKey="date"
                        name="Year"
                        domain={['auto', 'auto']}
                    />
                    <YAxis
                        type="number"
                        dataKey={dataKey}
                        name={title}
                        tickFormatter={DATA_KEY_FORMATTERS[dataKey]}
                        scale={useLogScale ? "log" : "linear"}
                        domain={useLogScale ? ['dataMin', 'dataMax'] : ['auto', 'auto']}
                    />
                    <Tooltip
                        content={
                            <CustomTooltip
                                countryData={countryData}
                                dataKey={dataKey}
                            />
                        }
                    />
                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                    />
                    {Object.entries(countryData).map(([country, data], index) => (
                        <Line
                            key={country}
                            type="monotone"
                            data={data}
                            dataKey={dataKey}
                            stroke={getColor(index)}
                            dot={{ fill: getColor(index) }}
                            name={country}
                            animationDuration={300}
                            connectNulls
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}