import './Tools.css';
import { useEffect, useRef, useState, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import html from './assets/html.png';
import css from './assets/css.png';
import javascript from './assets/javascript.png';
import react_logo from './assets/react-logo.svg';
import reactRouter from './assets/router.svg';
import i18next from './assets/language.png';
import postgresql from './assets/postgresql.svg';
import Slider from './Slider';
import { useNavigate } from 'react-router-dom';
import typescript from './assets/typescript.png';
import sass from './assets/sass.png';
import redux from './assets/redux.svg';
import solid from './assets/solid.png';
import nodejs from './assets/nodejs.png';
import Copyright from '../../copyright/Copyright';

type ScreenSize = 'mobile' | 'desktop';
type Theme = 'dark' | 'light';

interface ToolsProps {
    media: ScreenSize;
    theme: Theme;
}

interface CellProps {
    img: string;
    label: string;
    description: string;
    showDescriptions: boolean;
    pos: 'l' | 'r';
}

export default function Tools({ media, theme }: ToolsProps): JSX.Element {
    const { t, i18n } = useTranslation();
    const brieflyRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [showDescriptions, setShowDescriptions] = useState<boolean>(false);
    const butRef = useRef<HTMLButtonElement>(null);
    const [butIsVisible, setButIsVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    function handleClickForDescription(): void {
        setShowDescriptions(!showDescriptions);
    }

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target === brieflyRef.current) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                    if (entry.target === butRef.current) {
                        setButIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, { threshold: 0.3 });

        if (brieflyRef.current) {
            observer.observe(brieflyRef.current);
        }
        if (butRef.current) {
            observer.observe(butRef.current);
        }

        return () => {
            if (brieflyRef.current) {
                observer.unobserve(brieflyRef.current);
            }
            if (butRef.current) {
                observer.unobserve(butRef.current);
            }
        };
    }, []);

    return (
        <div className={`tools ${theme === 'light' ? 'light-theme' : ''}`}>
            <div className='tools-left'>
                <div className='myTools'>
                    {t('skills')}
                </div>
                <div ref={brieflyRef} className={`myTools-briefly ${isVisible ? 'visible' : ''}`}>
                    {t('toolsComponent.brieflyCodingOnJs')}&nbsp;<img src={javascript} className='img-js' alt="js" /> {i18n.language === 'ru' ? "и" : "and"}&nbsp;TypeScript&nbsp;<img src={typescript} className='img-js' alt="ts" /><br />
                    {t('toolsComponent.brieflyDevOnReact')}<span style={{whiteSpace: 'nowrap'}}>React&nbsp;<img src={react_logo} className='img-react' alt="react" /> {i18n.language === 'ru' ? 'и' : 'and'} Node.js <img src={nodejs} className='img-react' alt="node" /></span>
                </div>
                <div className='tools-facts'>
                    <div className='line'>
                        <Cell img={javascript} label={t('toolsComponent.facts.cell-3lb')} description={t('toolsComponent.facts.cell-3dc')} showDescriptions={showDescriptions} pos='l' />
                        <Cell img={react_logo} label={t('toolsComponent.facts.cell-4lb')} description={t('toolsComponent.facts.cell-4dc')} showDescriptions={showDescriptions} pos='r' />
                    </div>
                    <div className='line'>
                        <Cell img={typescript} label={t('toolsComponent.facts.cell-9lb')} description={t('toolsComponent.facts.cell-9dc')} showDescriptions={showDescriptions} pos='l' />
                        <Cell img={redux} label={t('toolsComponent.facts.cell-12lb')} description={t('toolsComponent.facts.cell-12dc')} showDescriptions={showDescriptions} pos='r' />
                    </div>
                    <div className='line'>
                        <Cell img={postgresql} label={t('toolsComponent.facts.cell-7lb')} description={t('toolsComponent.facts.cell-7dc')} showDescriptions={showDescriptions} pos='l' />
                        <Cell img={nodejs} label={t('toolsComponent.facts.cell-8lb')} description={t('toolsComponent.facts.cell-8dc')} showDescriptions={showDescriptions} pos='r' />
                    </div>
                    <div className='line'>
                        <Cell img={html} label={t('toolsComponent.facts.cell-1lb')} description={t('toolsComponent.facts.cell-1dc')} showDescriptions={showDescriptions} pos='l' />
                        <Cell img={css} label={t('toolsComponent.facts.cell-2lb')} description={t('toolsComponent.facts.cell-2dc')} showDescriptions={showDescriptions} pos='r' />
                    </div>
                    <div className='line'>
                        <Cell img={sass} label={t('toolsComponent.facts.cell-10lb')} description={t('toolsComponent.facts.cell-10dc')} showDescriptions={showDescriptions} pos='l' />
                        <Cell img={solid} label={t('toolsComponent.facts.cell-11lb')} description={t('toolsComponent.facts.cell-11dc')} showDescriptions={showDescriptions} pos='r' />
                    </div>
                    <div className='line'>
                        <Cell img={reactRouter} label={t('toolsComponent.facts.cell-5lb')} description={t('toolsComponent.facts.cell-5dc')} showDescriptions={showDescriptions} pos='l' />
                        <Cell img={i18next} label={t('toolsComponent.facts.cell-6lb')} description={t('toolsComponent.facts.cell-6dc')} showDescriptions={showDescriptions} pos='r' />
                    </div>
                </div>
                <button ref={butRef} className={`${butIsVisible ? 'visible' : ''}`} onClick={handleClickForDescription}>{showDescriptions ? t('aboutComponent.buttonHideFacts') : t('aboutComponent.buttonMoreFacts')}</button>
            </div>
            <div className='tools-right' style={{transform: `${media === 'desktop' ? 'translateX(10%)' : 'translateX(0)'}`}}>
                <Slider />
                <Copyright />
            </div>
        </div>
    );
}

function Cell({ img, label, description, showDescriptions, pos }: CellProps): JSX.Element {
    const cellRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: .3 });

        if (cellRef.current) {
            observer.observe(cellRef.current);
        }

        return () => {
            if (cellRef.current) {
                observer.unobserve(cellRef.current);
            }
        };
    }, []);

    return (
        <div ref={cellRef} className={`cell ${pos === 'l' ? 'left' : 'right'} ${isVisible ? 'visible' : ''}`}>
            <img src={img} alt={label} />
            <p className='cell-label'>
                {label}
            </p>
            <AnimatePresence initial={false}>
                {showDescriptions && (
                    <motion.p
                        className='cell-description'
                        initial={{ height: 0}}
                        animate={{ height: 'auto'}}
                        exit={{ height: 0}}
                        transition={{ duration: .4 }}
                    >
                        {description}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

