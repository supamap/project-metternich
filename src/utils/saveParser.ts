import { CountryData, SaveData } from '../types/SaveData.js';

export function convertDateToFraction(dateStr: string): number {
    const [year, month, day, _] = dateStr.split('.').map(Number);

    // Convert to fractional year (e.g., 1836.3.4.2 -> 1836 + (3-1)/12 + (4-1)/365)
    const fractionOfYear = (month - 1) / 12 + (day - 1) / 365;
    return Number((year + fractionOfYear).toFixed(2));
}

export function parseSaveText(rawData: string): SaveData {
    const lines = rawData.split('\n').map(line => line.trim());

    let currentDate = 0;
    let currentCountries: Record<string, CountryData> = {};

    let parsingCountries = false; // To start parsing after 'countries:' line

    lines.forEach(line => {
        if (line.startsWith('date:')) {
            // Parse the date into a fractional year
            currentDate = convertDateToFraction(line.split(':')[1].trim());
        } else if (line.startsWith('countries:')) {
            // Skip the 'countries:' line and start parsing countries data
            parsingCountries = true;
        } else if (parsingCountries && line) {
            // Match the country code (e.g., USA:, GBR:)
            const countryMatch = line.match(/^(\w+):$/);  // Match country (e.g., USA: or GBR:)
            if (countryMatch) {
                const country = countryMatch[1]; // Extract country code (e.g., USA, GBR)
                currentCountries[country] = { gdp: 0, pop: 0, gdp_per_capita: 0 }; // Initialize country data
            } else {
                // This part handles GDP and population data
                const [key, value] = line.split(':').map(str => str.trim());

                // We only handle the 'gdp' and 'pop' fields for the current country
                const lastCountry = Object.keys(currentCountries).pop(); // Get the last parsed country
                if (lastCountry && (key === 'gdp' || key === 'pop')) {
                    const numberValue = Number(value);
                    currentCountries[lastCountry][key as keyof CountryData] = numberValue;
                    
                    // Calculate GDP per capita whenever either GDP or population is updated
                    const country = currentCountries[lastCountry];
                    if (country.pop > 0) {
                        country.gdp_per_capita = country.gdp / country.pop;
                    } else {
                        country.gdp_per_capita = 0;
                    }
                }
            }
        }
    });

    return { date: currentDate, countries: currentCountries };
} 