import imac from './assets/slider/imac.svg';
import './Slider.css';
import { useEffect, useState, useRef, FC } from 'react';
import css from './assets/slider/css.svg';
import html from './assets/slider/html.svg';
import javascript from './assets/slider/javascript.svg';
import nodejs from './assets/slider/node-js.png';
import react from './assets/slider/react.svg';
import vite from './assets/slider/vite.svg';
import git from './assets/slider/git.svg';
import typescript from './assets/slider/typescript.svg';
import webpack from './assets/slider/webpack.svg';
import sass from './assets/slider/sass.svg';
import redux from './assets/slider/redux.svg';
import postgresql from './assets/slider/postgresql.svg';
import express from './assets/slider/express.svg';

const images: readonly string[] = [
    javascript,////////  0
    typescript,
    html,////////  2
    css,////////  3
    react,
    redux,
    nodejs,
    express,
    postgresql,
    git,
    vite,
    webpack,
    sass
] as const;

interface TiltState {
    x: number;
    y: number;
    scale: number;
}

export default function Slider(): JSX.Element {
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
    const [tilt, setTilt] = useState<TiltState>({ x: 0, y: 0, scale: 1 });
    const [animEnd, setAnimEnd] = useState<boolean>(false);

    const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>): void => {
        e.currentTarget.style.transform = 'translateX(0)';
        e.currentTarget.style.opacity = '1';

        setAnimEnd(true);
    };

    const handleMouseMove = (el: React.MouseEvent<HTMLDivElement>): void => {
        const { clientX, clientY } = el;
        const { left, top, width, height } = el.currentTarget.getBoundingClientRect();
        const x = (clientX - left - width / 2) / width * -12;
        const y = (clientY - top - height / 2) / height * 12;

        setTilt({ x, y, scale: 1.05 });
    };

    const handleMouseLeave = (): void => {
        setTilt({ x: 0, y: 0, scale: 1 });
    };
  
    useEffect(() => {
      const interval = setInterval(() => {
        imagesRef.current.forEach((img, index) => {
          if (!img) return;
          img.style.opacity = index === currentIndex ? '1' : '0';
        });
  
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000);
  
      return () => clearInterval(interval);
    }, [currentIndex]);
  
    return (
        <div className='slider-container' onAnimationEnd={handleAnimationEnd}>
            <div className='slider'
                style={animEnd ? 
                    {
                      transform: `perspective(500px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${tilt.scale})`,
                      transition: 'transform .3s ease-out'
                    } : undefined} 
                onMouseMove={handleMouseMove} 
                onMouseLeave={handleMouseLeave}
            >
                <img className='slider-monitor' src={imac} alt="monitor" />
                {images.map((src, index) => (
                  <img
                    className='slider-img'
                    key={index}
                    ref={(el) => (imagesRef.current[index] = el)}
                    src={src}
                    alt={`tech ${index}`}
                    style={{
                      width: [0, 2, 3].includes(index) ? '50%' : '40%',
                      top: [0, 2, 3].includes(index) ? '8%' : '13%',
                      opacity: index === 0 ? '1' : '0'
                    }}
                  />
                ))}
            </div>
        </div>
    );
}

