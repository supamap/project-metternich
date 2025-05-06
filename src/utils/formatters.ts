export const formatLargeNumber = (value: number): string => {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(2)}K`;
    return value.toLocaleString();
};

export const formatCurrency = (value: number): string => {
    return `£${formatLargeNumber(value)}`;
};

export type DataKey = 'gdp' | 'pop' | 'gdp_per_capita';


// Map data keys to formatters
export const DATA_KEY_FORMATTERS: Record<
    DataKey,
    (value: number) => string
> = {
    gdp: formatCurrency,
    gdp_per_capita: formatCurrency,
    pop: formatLargeNumber,
};
