import { useState, useEffect, useRef, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import frontend from './assets/frontend.svg';
import myPhoto from './assets/myPhoto.png';
import WeatherWidget from './Weather';
import CurrencyWidget from './Currency';
import hello from './assets/hello.png';
import computer from './assets/computer.png';
import www from './assets/www.png';
import { useTranslation } from 'react-i18next';
import user from './assets/user.png';
import palette from './assets/palette.png';
import userLight from './assets/user-light.png';
import paletteLight from './assets/palette-light.png';
import Copyright from '../../copyright/Copyright';

type ScreenSize = 'mobile' | 'desktop';
type Theme = 'dark' | 'light';

interface HomeProps {
    media: ScreenSize;
    theme: Theme;
}

export default function Home({ media, theme }: HomeProps): JSX.Element {
    const [welcome, setWelcome] = useState<string>("");
    const currencyRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const nowTime = new Date();
        const nowHours = nowTime.getHours();

        if (nowHours >= 6 && nowHours < 12) {
            setWelcome(t('goodMorning'));
        } else if (nowHours >= 12 && nowHours < 18) {
            setWelcome(i18n.language === 'ru' ? 'Добрый день!' : '');
        } else if (nowHours >= 18 && nowHours < 22) {
            setWelcome(t('goodEvening'));
        } else {
            setWelcome(t('goodNight'));
        }
    }, [i18n.language, t]);

    function handleWidgetHover(hover: boolean): void {
        if (!currencyRef.current) return;
        currencyRef.current.style.transition = 'transform 0.7s ease';

        if (hover) {
            currencyRef.current.style.transform = 'translateY(30%)';
        } else {
            currencyRef.current.style.transform = 'translateY(0)';
        }
    }

    return (
        <div className={`home ${theme === 'light' ? 'light-theme' : ''}`}>
            <div className='home-left'>
                <div className='home-left-part1'>
                    <div className='greeting'>{welcome ? welcome : (<>Good <span className='mobile-br'><br /></span>afternoon!</>)}<img src={hello} alt="hello" /></div>
                    <div className='i-am'>{t('iAm')}&ensp;<span>Vlad Ilyin</span>,</div>
                    <div className='frontend'>frontend<img src={computer} alt="computer" /></div>
                    <div className='developer'>{t('developer')}<img src={frontend} style={{cursor: 'pointer'}}
                      onClick={() => {navigate('/tools')}} draggable='false' alt="frontend" /></div>
                </div>
                <div className='home-left-part2'>
                    <div className='left'>
                        <div className='information'>
                            {i18n.language === 'ru' ? 'Веб-хакер' : 'The web hacker'}&#8239;<img src={www} alt="www" />
                            &#8239;{t("bigFanIT")}&#8239;&#128153;
                        </div>
                        <div className='buttons'>
                            <button onClick={() => {navigate('/about')}}>
                                {t('aboutMe')}<img src={theme === 'dark' ? user : userLight} alt="user" />
                            </button>
                            <button onClick={() => {navigate('/tools')}}>
                                {t('skills')}<img src={theme === 'dark' ? palette : paletteLight} alt="palette" />
                            </button>
                        </div>
                    </div>
                    <div className='right'>
                        <img src={myPhoto} draggable='false' onClick={() => {navigate('/contacts')}} alt='myPhoto' />
                    </div>
                </div>
            </div>   
            <div className='home-right' style={{transform: `${media === 'desktop' ? 'translateX(10%)' : 'translateX(0%)'}`}}>
                <WeatherWidget widgetHover={handleWidgetHover} />
                <CurrencyWidget ref={currencyRef} />
                <Copyright />
            </div>
        </div>
    );
}

