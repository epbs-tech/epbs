// hooks/useCurrency.ts
import { useState, useEffect } from 'react';
import { Currency, detectUserCurrency } from '@/utils/currency';

interface UseCurrencyReturn {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  isLoading: boolean;
}

export const useCurrency = (): UseCurrencyReturn => {
  const [currency, setCurrencyState] = useState<Currency>('MAD');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initCurrency = async (): Promise<void> => {
      try {
        // Vérifier d'abord le localStorage
        const savedCurrency = localStorage.getItem('preferred-currency') as Currency;
        if (savedCurrency && (savedCurrency === 'MAD' || savedCurrency === 'EUR')) {
          setCurrencyState(savedCurrency);
          setIsLoading(false);
          return;
        }

        // Sinon détecter automatiquement
        const detectedCurrency = await detectUserCurrency();
        setCurrencyState(detectedCurrency);
        localStorage.setItem('preferred-currency', detectedCurrency);
      } catch (error) {
        console.error('Erreur initialisation devise:', error);
        setCurrencyState('MAD'); // Fallback vers MAD
      } finally {
        setIsLoading(false);
      }
    };

    initCurrency();
  }, []);

  const setCurrency = (newCurrency: Currency): void => {
    setCurrencyState(newCurrency);
    localStorage.setItem('preferred-currency', newCurrency);
  };

  return { currency, setCurrency, isLoading };
};