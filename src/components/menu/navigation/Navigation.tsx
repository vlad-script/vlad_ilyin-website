import { Link, useLocation } from 'react-router-dom';
import { useState, useRef, useLayoutEffect, FC } from 'react';
import './Navigation.css';
import icons from './assets/SVGIconsForNavigator';
import { useTranslation } from 'react-i18next';
import { Theme, TooltipState } from '../../../types';

interface NavigationProps {
    handleClickCloseButton?: () => void;
    theme: Theme;
}

interface Section {
    id: string;
    icon: FC<{ className?: string }>;
    name: string;
    color?: string;
    path: string;
}

interface IndicatorStyle {
    top: string;
    backgroundColor: string;
    transition?: string;
}

export default function Navigation({ handleClickCloseButton, theme }: NavigationProps): JSX.Element {
    const location = useLocation();
    const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyle>({ top: '5px', backgroundColor: '' });
    const tooltipTimeout = useRef<NodeJS.Timeout | null>(null);
    const buttonsRef = useRef<{ [key: string]: HTMLLinkElement | null }>({});
    const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, text: '', position: { top: '0', left: '0' } });
    const initMountRef = useRef(true);
    const { t } = useTranslation();

    const sections: Section[] = [
        { id: 'home', icon: icons.house, name: (t('home')), path: '/home' },
        { id: 'about', icon: icons.about, name: (t('aboutMe')), color: '#64a6fc', path: '/about' },
        { id: 'tools', icon: icons.tools, name: (t('skills')), color: '#a189f0', path: '/tools' },
        { id: 'portfolio', icon: icons.portfolio, name: (t('portfolio')), color: 'rgb(0, 71, 95)', path: '/portfolio' },
        { id: 'contacts', icon: icons.contacts, name: (t('сontacts')), color: '#0c8e4d', path: '/contacts' }
    ];

    let actSec = '';
    for (let i = 0; i < sections.length; i++) {
        if (location.pathname === sections[i].path) {
            actSec = sections[i].id;
            break;
        }
    }
    const [activeSection, setActiveSection] = useState<string>(actSec);

    const handleMouseEnter = (e: React.MouseEvent<HTMLLinkElement>, name: string): void => {
        const buttonRect = e.currentTarget.getBoundingClientRect();
        if (tooltipTimeout.current) {
            clearTimeout(tooltipTimeout.current);
        }

        tooltipTimeout.current = setTimeout(() => {
            setTooltip({
                visible: true,
                text: name,
                position: { 
                    top: buttonRect.top + buttonRect.height / 3.7 + 'px',
                    left: buttonRect.right + 10 + 'px'
                }
            });
        }, 150);
    };
    
    const handleMouseLeave = (): void => {
        if (tooltipTimeout.current) {
            clearTimeout(tooltipTimeout.current);
        }
        setTooltip((prev) => ({
            ...prev,
            visible: false
        }));
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLLinkElement>): void => {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

        handleClickCloseButton?.();
    };

    useLayoutEffect(() => {
        const activeButton = buttonsRef.current[location.pathname];

        if (activeButton) {
            setActiveSection(activeButton.dataset.id || '');

            const menuPos = activeButton.parentElement?.getBoundingClientRect();
            const buttonPos = activeButton.getBoundingClientRect();

            if (menuPos) {
                const style: IndicatorStyle = {
                    top: `${buttonPos.top - menuPos.top}px`,
                    backgroundColor: activeButton.dataset.color || ''
                };

                if (initMountRef.current) {
                    setIndicatorStyle(() => ({
                        ...style,
                        transition: 'none'
                    }));

                    requestAnimationFrame(() => {
                        initMountRef.current = false;
                    });
                } else {
                    setIndicatorStyle(style);
                }
            }
        }
    }, [location.pathname]);

    return (
        <nav className={`navigation ${theme === 'light' ? 'light-theme' : ''}`}>
            {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                    <Link
                        ref={(el) => (buttonsRef.current[section.path] = el)}
                        data-id={section.id}
                        data-color={section.color}
                        key={section.id}
                        to={section.path}
                        className='nav-button'
                        draggable='false'
                        onClick={handleButtonClick}
                        onMouseEnter={(e) => handleMouseEnter(e, section.name)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <IconComponent className={section.id === activeSection ? 'activeColor' : ''} />
                    </Link>
                );
            })}
            <div className={`indicator ${(activeSection === 'home') ? 'iridescent-indicator' : ''}`} style={indicatorStyle}></div>
            <div className={`tooltip ${(tooltip.visible) ? 'visible' : ''}`}
                style={{
                    top: tooltip.position.top,
                    left: tooltip.position.left
                }}
            >
                {tooltip.text}
            </div>
        </nav>
    );
}

