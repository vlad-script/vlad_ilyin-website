import { useState, useRef, useEffect, FC } from 'react';
import './ThemeButton.css';

type Theme = 'dark' | 'light';

interface ThemeButtonProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

interface TooltipState {
    visible: boolean;
    text: string;
    position: {
        top: string;
        left: string;
    };
}

export default function ThemeButton({ theme, setTheme }: ThemeButtonProps): JSX.Element {
    const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, text: '', position: { top: '0', left: '-99px' } });
    const checkboxRef = useRef<HTMLInputElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();
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

        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);

        setTooltip((prev) => ({
            ...prev,
            text: theme === "dark" ? 'Light' : 'Dark'
        }));

        localStorage.setItem('websiteTheme', newTheme);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>): void => {
        const buttonRect = e.currentTarget.getBoundingClientRect();
        setTooltip({
            visible: true,
            text: theme === "dark" ? 'Dark' : 'Light',
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

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.checked = theme === 'dark' ? false : true;
        }
    });

    return (
        <div className={`ThemeButton ${theme === 'light' ? 'light-theme' : ''}`} onClick={handleClick}
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <label className="switch">
                <input ref={checkboxRef} type="checkbox" />
                <span className="slider"></span>
            </label>
            <div className={`ThemeButton-tooltip ${tooltip.visible ? 'visible' : ''}`} style={
                {
                    top: tooltip.position.top,
                    left: tooltip.position.left
                }}>
                {tooltip.text}
            </div>
        </div>
    );
}



