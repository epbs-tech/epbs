export type Currency = 'MAD' | 'EUR';

export interface Prices {
  MAD: number;
  EUR: number;
}

export interface Formation {
  id: number;
  title: string;
  prices: Prices;
  basePrice?: number;
  baseCurrency?: Currency;
}

export interface LocationData {
  country: string;
  countryCode: string;
}

export const detectUserCurrency = async (): Promise<Currency> => {
  try {
    const response = await fetch('/api/location');
    const data: LocationData = await response.json();
    const { countryCode } = data;

    // Pays européens utilisant l'EUR
    const euroCountries = [
      'FR', 'DE', 'ES', 'IT', 'BE', 'NL', 'PT', 'AT',
      'IE', 'GR', 'FI', 'LU', 'MT', 'CY', 'SK', 'SI',
      'EE', 'LV', 'LT'
    ];

    if (euroCountries.includes(countryCode)) return 'EUR';

    // MAD par défaut (y compris pour le Maroc)
    return 'MAD';
  } catch (error) {
    console.error('Erreur détection devise:', error);
    return 'MAD'; // MAD par défaut
  }
};