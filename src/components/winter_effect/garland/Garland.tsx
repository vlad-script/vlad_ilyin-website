import { memo, useState, useEffect, FC } from 'react';
import './Garland.css';

interface BulbPosition {
    left: string;
    top: string;
}

const Garland: FC = () => {
    const [bulbCount, setBulbCount] = useState<number | null>(null);

    useEffect(() => {
        const updateBulbCount = (): void => {
            const width = window.innerWidth;
            if (width <= 399) {
                setBulbCount(7);
            } else if (width <= 959) {
                setBulbCount(12);
            } else {
                setBulbCount(17);
            }
        };

        updateBulbCount();
        window.addEventListener('resize', updateBulbCount);
        return () => window.removeEventListener('resize', updateBulbCount);
    }, []);

    // Функция для расчета Y позиции лампочки на изогнутой линии
    const getBulbPosition = (index: number, total: number): BulbPosition => {
        const x = index / (total - 1); // 0 to 1
        // Параболическая кривая для создания полукруглого изгиба основной веревки
        // От 0px по краям до 8px в центре - создает полукруглую форму
        const mainCurve = 0 * Math.sin(x * Math.PI);
        // Позиция на основной веревке (начинается от верха)
        const bulbTop = mainCurve;
        return {
            left: `${x * 100}%`,
            top: `${bulbTop}px`
        };
    };

    if (bulbCount === null) {
        return null;
    }

    return (
        <div className="garland-container">
            <div className="garland-line"></div>
            <div className="garland-bulbs">
                {Array.from({ length: bulbCount }).map((_, index) => {
                    const position = getBulbPosition(index, bulbCount);
                    const isFirst = index === 0;
                    const isLast = index === bulbCount - 1;
                    const className = `garland-bulb${isFirst ? ' garland-bulb-first' : ''}${isLast ? ' garland-bulb-last' : ''}`;
                    
                    return (
                        <div 
                            key={index} 
                            className={className}
                            style={{
                                left: isFirst ? '0px' : isLast ? 'auto' : position.left,
                                right: isLast ? '0px' : undefined,
                                top: position.top,
                                animationDelay: `${index * 0.1}s`
                            }}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};

export default memo(Garland);



