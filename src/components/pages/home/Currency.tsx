import { useState, useEffect, forwardRef, FC } from "react";
import './Currency.css';
import usa from './assets/currency/usa.png';
import europa from './assets/currency/europa.png';
import { useTranslation } from 'react-i18next';

interface CurrencyRates {
    usd: string | null;
    eur: string | null;
    usdToEur: string | null;
    eurToUsd: string | null;
}

interface CurrencyData {
    usd: string;
    eur: string;
    usdToEur: string;
    eurToUsd: string;
}

const CurrencyWidget = forwardRef<HTMLDivElement>((_, ref) => {
    const [rates, setRates] = useState<CurrencyRates>({ usd: null, eur: null, usdToEur: null, eurToUsd: null });
    const { i18n } = useTranslation();

    useEffect(() => {
        const savedCurrencyData = sessionStorage.getItem('currencyData');
        if (savedCurrencyData) {
            const parsedData = JSON.parse(savedCurrencyData) as CurrencyData;
            setRates({
                usd: parsedData.usd,
                eur: parsedData.eur,
                usdToEur: parsedData.usdToEur,
                eurToUsd: parsedData.eurToUsd
            });
        } else {

            const urlServerC = import.meta.env.VITE_URL_SERVER_C;

            fetch(urlServerC || "https://server-one-lemon.vercel.app/currency")
                .then(response => response.json())
                .then(data => {
                    const usd = data.usd.slice(0, -2) as string;
                    const eur = data.eur.slice(0, -2) as string;
                
                    const usdNum = parseFloat(usd);
                    const eurNum = parseFloat(eur);
                
                    const usdToEurLong = usdNum / eurNum;
                    const eurToUsdLong = eurNum / usdNum;
                
                    const usdToEur = usdToEurLong.toFixed(2).replace('.', ',');
                    const eurToUsd = eurToUsdLong.toFixed(2).replace('.', ',');
                    
                    setRates({ usd, eur, usdToEur, eurToUsd });
                
                    const currencyInfo: CurrencyData = {
                        usd: usd,
                        eur: eur,
                        usdToEur: usdToEur,
                        eurToUsd: eurToUsd
                    };
                
                    sessionStorage.setItem('currencyData', JSON.stringify(currencyInfo));
                })
                .catch(error => console.error("Ошибка загрузки курса:", error));
        }
    }, []);

    return (
        <div ref={ref} className="currency-widget">
            {i18n.language === 'ru' ? (
                <>
                    <div className="usd">
                        USD&nbsp;<img src={usa} alt="usd" />&nbsp;=&nbsp;<span>{rates.usd}</span>&nbsp;&#8381;
                    </div>
                    <div className="eur">
                        EUR&nbsp;<img src={europa} alt="eur" />&nbsp;=&nbsp;<span>{rates.eur}</span>&nbsp;&#8381;
                    </div>
                </>
            ) : (
                <>
                    <div className="usd">
                        USD&nbsp;<img src={usa} alt="usd" />&nbsp;=&nbsp;<span>{rates.usdToEur}</span>&nbsp;&euro;
                    </div>
                    <div className="eur">
                        EUR&nbsp;<img src={europa} alt="eur" />&nbsp;=&nbsp;<span>{rates.eurToUsd}</span>&nbsp;&#36;
                    </div>
                </>
            )}
        </div>
    );
});

CurrencyWidget.displayName = 'CurrencyWidget';

export default CurrencyWidget;

