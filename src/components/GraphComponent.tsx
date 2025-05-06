import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";
import '../styles/components.css';

// Color palette for countries
const COUNTRY_COLORS = [
    "#1f77b4", // blue
    "#ff7f0e", // orange
    "#2ca02c", // green
    "#d62728", // red
    "#9467bd", // purple
    "#8c564b", // brown
    "#e377c2", // pink
    "#7f7f7f", // gray
    "#bcbd22", // yellow-green
    "#17becf", // cyan
    "#aec7e8", // light blue
    "#ffbb78", // light orange
    "#98df8a", // light green
    "#ff9896", // light red
    "#c5b0d5", // light purple
];

const formatLargeNumber = (value: number) => {
    if (value >= 1000000) {
        return `${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
        return `${(value / 1000).toFixed(2)}K`;
    }
    return value.toLocaleString();
};

const formatCurrency = (value: number) => {
    return `£${formatLargeNumber(value)}`;
};

interface GraphComponentProps {
    title: string;
    dataKey: 'gdp' | 'population' | 'gdp_per_capita';
    countryData: Record<string, Array<{ date: number; gdp: number; population: number; gdp_per_capita: number }>>;
    countries: string[];
    icon?: string;
}

interface TooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
    countryData: Record<string, Array<{ date: number; gdp: number; population: number; gdp_per_capita: number }>>;
    dataKey: 'gdp' | 'population' | 'gdp_per_capita';
}

const CustomTooltip = ({ active, payload, label, countryData, dataKey }: TooltipProps) => {
    if (active && payload && payload.length) {
        const date = payload[0].payload.date;
        
        const dataPoints = Object.entries(countryData).map(([country, data]) => {
            const point = data.find(d => d.date === date);
            return {
                country,
                value: point ? point[dataKey] : null
            };
        }).filter((point): point is { country: string; value: number } => point.value !== null);

        return (
            <div className="custom-tooltip">
                <p className="tooltip-year">Year: {label}</p>
                {dataPoints.map((point, index) => (
                    <p key={index} className="tooltip-data-point" style={{ color: COUNTRY_COLORS[index % COUNTRY_COLORS.length] }}>
                        {point.country}: {dataKey === 'gdp' 
                            ? formatCurrency(point.value)
                            : formatLargeNumber(point.value)}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function GraphComponent({ title, dataKey, countryData, countries, icon = "📊" }: GraphComponentProps) {
    const [useLogScale, setUseLogScale] = useState(false);

    // Debug log to verify data
    console.log('GraphComponent data:', { title, dataKey, countryData, countries });

    return (
        <div className="graph-container">
            <div className="graph-header">
                <h2 className="graph-title">{icon} {title}</h2>
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
            <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart margin={{ left: 10, right: 0, top: 0, bottom: 0 }}>
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
                            tickFormatter={dataKey === 'gdp' ? formatCurrency : formatLargeNumber}
                            scale={useLogScale ? "log" : "linear"}
                            domain={useLogScale ? ['dataMin', 'dataMax'] : ['auto', 'auto']}
                            width={80}
                        />
                        <Tooltip content={<CustomTooltip countryData={countryData} dataKey={dataKey} />} />
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
                                stroke={COUNTRY_COLORS[index % COUNTRY_COLORS.length]}
                                dot={{ fill: COUNTRY_COLORS[index % COUNTRY_COLORS.length] }}
                                name={country}
                                animationDuration={300}
                                animationBegin={0}
                                connectNulls={true}
                                isAnimationActive={true}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
} 