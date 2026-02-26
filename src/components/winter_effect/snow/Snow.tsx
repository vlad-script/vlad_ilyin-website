import { useEffect, useRef } from 'react';
import './Snow.css';

export default function Snow(): JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Количество снежинок
        const snowflakeCount = 100;
        const snowflakes: HTMLDivElement[] = [];

        // Создаем снежинки
        for (let i = 0; i < snowflakeCount; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            
            // Случайный размер (от 2px до 6px)
            const size = Math.random() * 4 + 2;
            snowflake.style.width = `${size}px`;
            snowflake.style.height = `${size}px`;
            
            // Случайная начальная позиция
            snowflake.style.left = `${Math.random() * 100}%`;
            
            // Случайная скорость падения (от 2s до 8s)
            const fallDuration = Math.random() * 6 + 2;
            snowflake.style.animationDuration = `${fallDuration}s`;
            
            // Случайная задержка начала анимации
            snowflake.style.animationDelay = `${Math.random() * 2}s`;
            
            // Случайное горизонтальное смещение
            const driftAmount = Math.random() * 50 - 25; // от -25px до 25px
            snowflake.style.setProperty('--drift', `${driftAmount}px`);
            
            container.appendChild(snowflake);
            snowflakes.push(snowflake);
        }

        // Очистка при размонтировании
        return () => {
            snowflakes.forEach(snowflake => {
                if (snowflake.parentNode) {
                    snowflake.parentNode.removeChild(snowflake);
                }
            });
        };
    }, []);

    return <div ref={containerRef} className="snow-container"></div>;
}



