import { useState, useEffect, FC } from 'react';
import './Weather.css';
import cloud from './assets/weather/cloud.png';
import { useTranslation } from 'react-i18next';

interface WeatherWidgetProps {
    widgetHover: (hover: boolean) => void;
}

interface WeatherInfo {
    temperature: number;
    description: string;
    icon: string;
    city: string;
    descriptionRU: string;
    cityRU: string;
}

interface TiltState {
    x: number;
    y: number;
    scale: number;
    scaleText: number;
}

const WeatherWidget: FC<WeatherWidgetProps> = ({ widgetHover }) => {
    const [temperature, setTemperature] = useState<number | null>(null);
    const [description, setDescription] = useState<string>("");
    const [iconWeather, setIconWeather] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [city, setCity] = useState<string | null>(null);
    const [tilt, setTilt] = useState<TiltState>({ x: 0, y: 0, scale: 1, scaleText: 1 });
    const [animEnd, setAnimEnd] = useState<boolean>(false);
    const { i18n } = useTranslation();

    const fetchWeather = async (lat: number, lon: number): Promise<void> => {
        try {

            const urlServerW = import.meta.env.VITE_URL_SERVER_W;

            const response = await fetch(`${urlServerW}?lat=${lat}&lon=${lon}`);

            if (!response.ok) {
                throw new Error(i18n.language === 'ru' ? 'Ошибка сервера' : 'Server error');
            }

            const responseData = await response.json() as WeatherInfo;

            const weatherInfo: WeatherInfo = {
                temperature: responseData.temperature,
                description: responseData.description,
                icon: responseData.icon,
                city: responseData.city,
                descriptionRU: responseData.descriptionRU,
                cityRU: responseData.cityRU
            };

            setTemperature(weatherInfo.temperature);
            setDescription(i18n.language === 'en' ? weatherInfo.description : weatherInfo.descriptionRU);
            setIconWeather(weatherInfo.icon);
            setCity(i18n.language === 'en' ? weatherInfo.city : weatherInfo.cityRU);

            sessionStorage.setItem('weatherData', JSON.stringify(weatherInfo));
        } catch (err) {
            setError(i18n.language === 'ru' ? "Ошибка загрузки данных." : "Data loading error.");
        }
    };

    function getLocation(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeather(latitude, longitude);
                },
                () => {
                    setError(i18n.language === 'ru' ? 'Не удалось определить местоположение.' : "Couldn't determine the location.");
                }
            );
        } else {
            setError(i18n.language === 'ru' ? "Ваш браузер не поддерживает геолокацию." : "Your browser does not support geolocation.");
        }
    }

    useEffect(() => {
        const savedWeatherData = sessionStorage.getItem('weatherData');
        if (savedWeatherData) {
            const parsedData = JSON.parse(savedWeatherData) as WeatherInfo;
            setTemperature(parsedData.temperature);
            setDescription(i18n.language === 'en' ? parsedData.description : parsedData.descriptionRU);
            setIconWeather(parsedData.icon);
            setCity(i18n.language === 'en' ? parsedData.city : parsedData.cityRU);
        } else {
            getLocation();
        }
    }, [i18n.language]);

    function handleAnimationEnd(e: React.AnimationEvent<HTMLDivElement>): void {
        e.currentTarget.style.transform = 'scale(1)';

        setAnimEnd(true);
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (clientX - left - width / 2) / width * -20;
        const y = (clientY - top - height / 2) / height * 20;

        setTilt({ x, y, scale: 1.05, scaleText: 1.16 });

        widgetHover(true);
    };

    const handleMouseLeave = (): void => {
        setTilt({ x: 0, y: 0, scale: 1, scaleText: 1 });

        widgetHover(false);
    };

    return (
        <div className='weather-widget-container' onAnimationEnd={handleAnimationEnd}>
            <div 
                className='weather-widget'
                onMouseMove={handleMouseMove} 
                onMouseLeave={handleMouseLeave}
                style={animEnd ?
                    {
                        transform: `perspective(500px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${tilt.scale})`,
                        transition: 'transform 0.3s ease-out'
                    } : undefined}
            >
                <img src={cloud} className='cloud' draggable='false' alt='cloud' />
                {error ? <div className='error'>{error}</div> : 
                <>
                    <div className='temperature'
                        style={animEnd ? {transition: "all 0.6s ease-out", transform: `scale(${tilt.scaleText})`} : undefined}
                    >
                        {temperature}&deg;
                    </div>
                    <div className='description'>
                        {description}<img src={iconWeather} alt="weather" />
                    </div>
                    <div className='city'>
                        <span>
                            {city}
                        </span>
                    </div>
                </>}
            </div>
        </div>
    );
};

export default WeatherWidget;

