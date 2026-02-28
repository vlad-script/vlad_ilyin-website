import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DesktopMenu from './menu/desktop_menu/DesktopMenu.tsx';
import MobileMenu from './menu/mobile_menu/MobileMenu.tsx';
import Home from './pages/home/Home.tsx';
import About from './pages/about/About.tsx';
import Contacts from './pages/contacts/Contacts.tsx';
import Portfolio from './pages/portfolio/Portfolio.tsx';
import Tools from './pages/tools/Tools.tsx';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ScreenSize, Theme } from '../types';

const websiteTheme = localStorage.getItem('websiteTheme') as Theme | null;

export default function App(): JSX.Element {
    const [screenSize, setScreenSize] = useState<ScreenSize>(window.innerWidth <= 959 ? 'mobile' : 'desktop');
    const { i18n } = useTranslation();
    const [theme, setTheme] = useState<Theme>(websiteTheme || 'dark');

    useEffect(() => {
        document.body.style.background = theme === 'dark' ? 'rgb(6, 7, 39)' : 'white';
    }, [theme]);

    useEffect(() => {
        document.documentElement.lang = i18n.language === 'ru' ? 'ru-RU' : 'en-US';
    }, [i18n.language]);

    useEffect(() => {
        const handleResize = (): void => {
            setScreenSize(window.innerWidth <= 958 ? 'mobile' : 'desktop');
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Router>
            <ScrollToTop />
            {screenSize === 'desktop' && <DesktopMenu theme={theme} setTheme={setTheme} />}
            {screenSize === 'mobile' && <MobileMenu theme={theme} setTheme={setTheme} />}
            <Routes>
                <Route path='/' element={<Navigate to='/home' replace />} />
                <Route path='/home' element={<Home key={screenSize} media={screenSize} theme={theme} />} />
                <Route path='/about' element={<About media={screenSize} theme={theme} />} />
                <Route path='/contacts' element={<Contacts />} />
                <Route path='/portfolio' element={<Portfolio />} />
                <Route path='/tools' element={<Tools media={screenSize} theme={theme} />} />
                <Route path='*' element={<Navigate to='/home' replace />} />
            </Routes>
        </Router>
    );
}


function ScrollToTop(): null {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}



