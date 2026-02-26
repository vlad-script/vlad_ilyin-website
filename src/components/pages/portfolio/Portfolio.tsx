import { useState, useRef, FC, MouseEvent, AnimationEvent } from 'react';
import './Portfolio.css';
import { useTranslation } from 'react-i18next';
import react from './assets/react.svg';
import { useNavigate } from 'react-router-dom';
import heart from '../../copyright/assets/heart.png';
import circletime from './assets/circletime.png';
import labyrinth from './assets/labyrinth.png';
import mysite from './assets/mysite.png';
import sidebar from './assets/sidebar.png';
import ts from '../tools/assets/slider/typescript.svg';
import reactBlue from '../tools/assets/slider/react.svg';
import webpack from '../tools/assets/slider/webpack.svg';
import sass from '../tools/assets/slider/sass.svg';
import js from '../tools/assets/slider/javascript.svg';
import vite from '../tools/assets/slider/vite.svg';
import html from '../tools/assets/slider/html.svg';
import css from '../tools/assets/slider/css.svg';
import styled from './assets/styled.png';
import redux from '../tools/assets/slider/redux.svg';

interface ProjectProps {
    img: string;
    arrayTec: readonly string[];
    animTimer: number;
}

interface TiltState {
    x: number;
    y: number;
    scale: number;
}

export default function Portfolio(): JSX.Element {
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();

    const word = i18n.language === 'ru' ? 'Портфолио' : 'Portfolio';

    return (
        <div className='portfolio'>
            <div className='myportfolio' style={{marginRight: `${i18n.language === 'en' ? 'min(10px)' : undefined}`}}>
                {word.split('').map((letter, index) => (
                    <div key={index} style={{
                            animation: 'symbolExpShowUp 0.5s ease forwards',
                            animationDelay: `${0.3 + index * 0.1}s`,
                            transform: 'translateX(100%)',
                            opacity: '0'
                        }}
                    >
                        {letter}
                    </div>
                ))}
            </div>
            <div className='projects-board'>
                <Project img={circletime} arrayTec={[ts, reactBlue, webpack, sass]} animTimer={0} />
                <Project img={mysite} arrayTec={[ts, reactBlue, vite]} animTimer={2} />
                <Project img={labyrinth} arrayTec={[js, html, css]} animTimer={1} />
                <Project img={sidebar} arrayTec={[js, redux, reactBlue, styled, vite, sass]} animTimer={3} />
            </div>
            <div className='copyright'>
                &copy; 2026, {t('portfolioComponent.copyright-1')} <u onClick={() => {navigate('/contacts')}}>{t('portfolioComponent.copyright-2')}</u> {t('portfolioComponent.copyright-3')} <img src={heart} className='heart' alt="heart" /> {t('portfolioComponent.copyright-4')} <img src={react} draggable='false' alt="react" />
            </div>
        </div>
    );
}


function Project({ img, arrayTec, animTimer }: ProjectProps): JSX.Element {
    const [tilt, setTilt] = useState<TiltState>({ x: 0, y: 0, scale: 1 });
    const [animationEnd, setAnimationEnd] = useState<boolean>(false);
    const curtainRef = useRef<HTMLDivElement>(null);
    const [curtainTrue, setCurtainTrue] = useState<boolean>(false);

    const handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>): void => {
        e.currentTarget.style.transform = 'translate(0)';
        e.currentTarget.style.opacity = '1';

        setAnimationEnd(true);
    };
    
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
        if ('ontouchstart' in window) {
            return;
        } else {
            const { clientX, clientY } = e;
            const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
            const x = (clientX - left - width / 2) / width * -10;
            const y = (clientY - top - height / 2) / height * 20;

            setTilt({ x, y, scale: 1.05 });
        }
    };

    const handleMouseLeave = (): void => {
        if ('ontouchstart' in window) {
            return;
        } else {
            setTilt({ x: 0, y: 0, scale: 1 });
        }
    };

    const handleClick = (): void => {
        if ('ontouchstart' in window) {
            if (!curtainTrue) {
                if (curtainRef.current) {
                    curtainRef.current.style.transform = 'translateY(0)';
                    curtainRef.current.style.opacity = '1';
                }
                setCurtainTrue(true);
            } else {
                if (curtainRef.current) {
                    curtainRef.current.style.transform = 'translateY(-100%)';
                    curtainRef.current.style.opacity = '0';
                }
                setCurtainTrue(false);
            }
        }
    };

    const getIconWidth = (icon: string): string => {
        switch (icon) {
            case js:
            case html:
            case css:
                return '12%';
            case styled:
                return '20%';
            default:
                return '10%';
        }
    };

    const handleClickUrl = (): void => {
        switch (img) {
            case circletime:
                window.open('https://historicaldates-vladilyin.netlify.app/', '_blank');
                break;
            case labyrinth:
                window.open('https://labyrinth-vladilyin.netlify.app/', '_blank');
                break;
            case mysite:
                window.open('https://vladilyin.netlify.app/', '_blank');
                break;
            case sidebar: 
                window.open('https://sidebar-vladilyin.netlify.app/', '_blank');
                break;
        }
    };

    const handleClickGithub = (): void => {
        switch(img) {
            case circletime:
                open('https://github.com/vlad-script/historical_dates.git', '_blank');
            case labyrinth:
                open('https://github.com/vlad-script/labyrinth.git', '_blank');
            case mysite:
                open('https://github.com/vlad-script/vlad_ilyin-website.git', '_blank');
            case sidebar: 
                open('https://github.com/vlad-script/Sidebar.git', '_blank'); 
        }
    };

    return (
        <div className='project' onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onAnimationEnd={handleAnimationEnd} onClick={handleClick}
            style={animationEnd ? {
                transition: 'transform .3s ease-out',
                transform: `perspective(500px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${tilt.scale})`
            } : {
                animation: 'projectShowUp 1s ease',
                animationDelay: `${1 + animTimer * .1}s`,
                opacity: '0',
                transform: `translateX(30%)`
            }
            }
        >
            <div className='project-img'>
                <img draggable='false' src={img} alt='circletime' style={{width: '100%', borderRadius: '12px'}} />
            </div>
            <div className='technology-stack'>
                {arrayTec.map((el, index) => (
                    <img key={index} draggable='false' src={el} alt={`tech ${index}`} style={{width: getIconWidth(el), margin: '2%', objectFit: 'contain'}} />
                ))}
            </div>
            <div ref={curtainRef} className='curtain'>
                <div onClick={handleClickUrl}>URL</div>
                <div onClick={handleClickGithub}>GitHub</div>
            </div>
        </div>
    );
}

