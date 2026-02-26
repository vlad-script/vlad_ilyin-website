import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../navigation/Navigation.tsx';
import './DesktopMenu.css';
import LanguageButton from '../../language_button/LanguageButton.tsx';
const myLogo = '/myLogo.svg';
import ThemeButton from '../../theme_button/ThemeButton.tsx';

type Theme = 'dark' | 'light';

interface DesktopMenuProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export default function DesktopMenu({ theme, setTheme }: DesktopMenuProps): JSX.Element {
    const navigate = useNavigate();

    return (
        <div className='desktop-menu'>
            <div className='myLogo'><img src={myLogo} onClick={() => {navigate('/home')}} alt="logo" /></div>
            <Navigation theme={theme} />
            <div className='D-buttons-theme-lang'>
                <ThemeButton theme={theme} setTheme={setTheme} />
                <LanguageButton theme={theme} />
            </div>
        </div>
    );
}

