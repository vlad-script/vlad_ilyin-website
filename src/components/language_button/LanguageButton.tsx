import { useRef, useState, FC } from 'react';
import usaFlag from './assets/usa.svg';
import rusFlag from './assets/russia.svg';
import './LanguageButton.css';
import { useTranslation } from 'react-i18next';

type Theme = 'dark' | 'light';
type LanguageVersion = 'rus' | 'eng';

interface LanguageButtonProps {
    theme: Theme;
}

interface TooltipState {
    visible: boolean;
    text: string;
    position: {
        top: string;
        left: string;
    };
}

export default function LanguageButton({ theme }: LanguageButtonProps): JSX.Element {
    const { i18n } = useTranslation();
    const languageRef = useRef<{ ru: string; en: string }>({ ru: 'Русский', en: 'English' });
    const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, text: '', position: { top: '0', left: '-99px' } });
    const [languageVersionWebSite, setLanguageVersionWebSite] = useState<LanguageVersion>(i18n.language === 'ru' ? 'rus' : 'eng');

    const changeLanguage = (): void => {
        const newLanguage = i18n.language === 'ru' ? 'en' : 'ru';
        i18n.changeLanguage(newLanguage);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
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

        setTooltip((prev) => ({
            ...prev,
            text: languageVersionWebSite === 'rus' ? languageRef.current.en : languageRef.current.ru
        }));

        setLanguageVersionWebSite(languageVersionWebSite === 'rus' ? 'eng' : 'rus');

        changeLanguage();
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>): void => {
        const buttonRect = e.currentTarget.getBoundingClientRect();
        setTooltip({
            visible: true,
            text: languageVersionWebSite === 'rus' ? languageRef.current.ru : languageRef.current.en,
            position: {
                top: buttonRect.top + 10 + 'px',
                left: buttonRect.right + 17 + 'px'
            }
        });
    };

    const handleMouseLeave = (): void => {
        setTooltip((prev) => ({
            ...prev,
            visible: false
        }));
    };

    return (
        <div className={`language-button ${theme === 'light' ? 'light-theme' : ''}`} onClick={handleClick}
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img src={languageVersionWebSite === 'rus' ? rusFlag : usaFlag} alt="language flag" />
            <div className={`language-button-tooltip ${tooltip.visible ? 'visible' : ''}`} style={
                {
                    top: tooltip.position.top,
                    left: tooltip.position.left
                }}>
                {tooltip.text}
            </div>
        </div>
    );
}



