import { useState, useRef, FC, MouseEvent, AnimationEvent } from 'react';
import './Portfolio.css';
import { useTranslation } from 'react-i18next';
import react from './assets/react.svg';
import { useNavigate } from 'react-router-dom';
import heart from '../../copyright/assets/heart.png';
import circletime from './assets/circletime.png';
import labyrinth from './assets/labyrinth.png';
import mysite from './assets/mysite.png';
import blog from './assets/blog.png';
import ts from '../Tools/assets/slider/typescript.svg';
import reactBlue from '../Tools/assets/slider/react.svg';
import webpack from '../Tools/assets/slider/webpack.svg';
import sass from '../Tools/assets/slider/sass.svg';
import js from '../Tools/assets/slider/javascript.svg';
import vite from '../Tools/assets/slider/vite.svg';
import html from '../Tools/assets/slider/html.svg';
import css from '../Tools/assets/slider/css.svg';
import redux from '../Tools/assets/slider/redux.svg';
import nodejs from '../Tools/assets/slider/node-js.png';
import mongodb from '../Tools/assets/slider/mongodb.svg';
import express from '../Tools/assets/slider/express.svg';
import aibot from './assets/aibot.png';
import { TiltState } from '../../../types';


interface ProjectProps {
    img: string;
    arrayTec: readonly string[];
    animTimer: number;
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
                <Project img={blog} arrayTec={[js, reactBlue, redux, nodejs, express, mongodb, sass]} animTimer={0} />
                <Project img={mysite} arrayTec={[ts, reactBlue, vite, nodejs, express]} animTimer={1} />
                <Project img={aibot} arrayTec={[ts, nodejs]} animTimer={2} />
                <Project img={circletime} arrayTec={[ts, reactBlue, webpack, sass]} animTimer={3} />
                <Project img={labyrinth} arrayTec={[js, html, css]} animTimer={4} />
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
            default:
                return '10%';
        }
    };

    const handleClickUrl = (): void => {
        switch (img) {
            case blog:
                open('https://thecreatebook.netlify.app/', '_blank');
            case mysite:
                open('https://vladilyin.netlify.app/', '_blank');
            
            case circletime: 
                open('https://historicaldates-vladilyin.netlify.app/', '_blank');
            case labyrinth: 
                open('https://labyrinth-vladilyin.netlify.app/', '_blank');
        }
    };

    const handleClickGithub = (): void => {
        switch(img) {
            case blog:
                open('https://github.com/vladyue/BLOG', '_blank');
            case mysite:
                open('https://github.com/vladyue/vlad_ilyin-website', '_blank');
            case aibot:
                open('https://github.com/vladyue/vlad_aibot-telegram_bot', '_blank');
            case circletime: 
                open('https://github.com/vladyue/historical_dates', '_blank'); 
            case labyrinth: 
                open('https://github.com/vladyue/labyrinth-game', '_blank');
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

