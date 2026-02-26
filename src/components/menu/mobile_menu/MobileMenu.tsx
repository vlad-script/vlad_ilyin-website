import { useState, useEffect, useRef, FC } from "react";
import { useLocation } from 'react-router-dom';
import './MobileMenu.css';
import backPng from './assets/back.png';
import backLightPng from './assets/back-light.png';
import Navigation from "../navigation/Navigation.tsx";
import LanguageButton from "../../language_button/LanguageButton.tsx";
const myLogo = '/myLogo.svg';
import { useNavigate } from "react-router-dom";
import ThemeButton from "../../theme_button/ThemeButton.tsx";

type Theme = 'dark' | 'light';
type ActiveSection = 'home' | string;

interface MobileMenuProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

interface OpenedMenuProps {
    handleClickCloseBlur: (e: React.MouseEvent<HTMLDivElement>) => void;
    handleClickCloseButton: () => void;
    blurRef: React.RefObject<HTMLDivElement>;
    menuRef: React.RefObject<HTMLDivElement>;
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export default function MobileMenu({ theme, setTheme }: MobileMenuProps): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const topMenuRef = useRef<HTMLDivElement>(null);
    const lastScrollY = useRef<number>(window.scrollY);
    const isThrottled = useRef<boolean>(false);
    const location = useLocation();
    const [colorMobileMenu, setColorMobileMenu] = useState<string>('');
    const menuRef = useRef<HTMLDivElement>(null);
    const blurRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    function handleClickOpen(): void {
        const blur = blurRef.current;
        const menu = menuRef.current;
        if (!blur || !menu) return;

        blur.style.visibility = 'visible';
        blur.style.opacity = '1';
        
        menu.style.transform = 'translateX(0)';

        setIsOpen(!isOpen);
    }

    function handleClickCloseBlur(e: React.MouseEvent<HTMLDivElement>): void {
        if (e.target === e.currentTarget) {
            const blur = blurRef.current;
            const menu = menuRef.current;
            if (!blur || !menu) return;

            blur.style.opacity = '0';
        
            menu.style.transform = 'translateX(-100%)';

            setIsOpen(!isOpen);

            setTimeout(() => {
                blur.style.visibility = 'hidden';
            }, 200);
        }
    }

    function handleClickCloseButton(): void {
        const blur = blurRef.current;
        const menu = menuRef.current;
        if (!blur || !menu) return;

        blur.style.opacity = '0';
    
        menu.style.transform = 'translateX(-100%)';

        setIsOpen(!isOpen);

        setTimeout(() => {
            blur.style.visibility = 'hidden';
        }, 300);
    }

    useEffect(() => {
        const handleScroll = (): void => {
            if (lastScrollY.current < 100) {
                lastScrollY.current = window.scrollY;
                return;
            }
            if (isThrottled.current) return;

            isThrottled.current = true;
            setTimeout(() => {
                if (topMenuRef.current) {
                    if (window.scrollY > lastScrollY.current) {
                        topMenuRef.current.style.transform = 'translateY(-100%)';
                    } else {
                        topMenuRef.current.style.transform = 'translateY(0)';
                    }
                }
                lastScrollY.current = window.scrollY;
                isThrottled.current = false;
            }, 100);
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return () => { document.body.classList.remove('no-scroll'); };
    }, [isOpen]);

    const mobMenuColor: Record<string, string> = {'/home': '', '/about': '#64a6fc', '/tools': '#a189f0', '/portfolio': 'white', '/contacts': 'white'};

    useEffect(() => {
        setColorMobileMenu(mobMenuColor[location.pathname] || '');
    }, [location.pathname]); 

    return (
        <>
            <div ref={topMenuRef} className={`mobile-menu ${colorMobileMenu ? '' : 'hom'}`} style={{transition: 'transform .3s ease-in-out', borderBottomColor: colorMobileMenu}}>
                <div className='burger-button' onClick={handleClickOpen}>
                    <svg className={`burger-icon ${colorMobileMenu ? '' : 'hom'}`} style={{color: colorMobileMenu}} width="800px" height="800px" viewBox="0 0 24 24" fill='currentColor' xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_429_11066)">
                            <path d="M3 6.00092H21M3 12.0009H21M3 18.0009H21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_429_11066">
                                <rect width="24" height="24" fill="white" transform="translate(0 0.000915527)"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <div className="myLogo"><img src={myLogo} onClick={() => {navigate('/home')}} alt="logo" /></div>
            </div>
            <OpenedMenu handleClickCloseBlur={handleClickCloseBlur} handleClickCloseButton={handleClickCloseButton} blurRef={blurRef} menuRef={menuRef} theme={theme} setTheme={setTheme} />
        </>
    );
}

function OpenedMenu({ handleClickCloseBlur, handleClickCloseButton, blurRef, menuRef, theme, setTheme }: OpenedMenuProps): JSX.Element {
    const [activeSection, setActiveSection] = useState<ActiveSection>('home');
    const location = useLocation();

    const blurColor: Record<string, string> = {'/about': '#64a6fc42', '/tools': '#a189f03f', '/portfolio': '#2fd0c844', '/contacts': '#6ed48647'};
    const activeButton: Record<string, ActiveSection> = {'/home': 'home'};

    useEffect(() => {
        setActiveSection(activeButton[location.pathname] || '');
    }, [location.pathname]);

    return (
        <div ref={blurRef} className={`opened ${activeSection === 'home' ? 'home' : ''}`} style={{background: blurColor[location.pathname]}} onClick={handleClickCloseBlur}>
            <div ref={menuRef} className="opened-menu">
                <div style={{overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div className="button-back" onClick={handleClickCloseButton}>
                            <img src={theme === 'dark' ? backPng : backLightPng} alt="back" />
                        </div>
                        <Navigation handleClickCloseButton={handleClickCloseButton} theme={theme} />
                    </div>
                    <div className='M-buttons-theme-lang'>
                        <ThemeButton theme={theme} setTheme={setTheme} />
                        <LanguageButton theme={theme} />
                    </div>
                </div>
            </div>
        </div>
    );
}

