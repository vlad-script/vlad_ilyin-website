import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Copyright.css';
import ReactLogo from './assets/ReactLogo';
import heart from './assets/heart.png';

interface CopyrightProps {
    disableClick?: boolean;
}

export default function Copyright({ disableClick = false }: CopyrightProps): JSX.Element {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className='copyright'>
            &copy; 2026, {t("devBy")}&nbsp;<u onClick={disableClick ? undefined : () => {navigate('/contacts')}} style={disableClick ? {cursor: 'default', pointerEvents: 'none', textDecoration: 'none', fontSize: '100%'} : undefined}>{t("me")}</u>&nbsp;{t("with")}&ensp;<img src={heart} className='heart' alt="heart" />&ensp;{t("on")}&ensp;
            <ReactLogo />
        </div>
    );
}