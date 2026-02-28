import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './fonts/caveat/stylesheet.css';
import './index.css';
import App from './components/App.tsx';
import i18nInitPromise from './translations/i18n.ts';
import { preloadAllResources } from './preloadResources.ts';
import Snow from './components/winter_effect/snow/Snow.tsx';
import Garland from './components/winter_effect/garland/Garland.tsx';

const preloader = document.getElementById('preloader');
const effectsContainer = document.createElement('div');
effectsContainer.id = 'effects-container';
document.body.appendChild(effectsContainer);

// Функция инициализации приложения
async function initializeApp(): Promise<void> {
    try {
        // Сразу рендерим снег и гирлянду, чтобы они были видны на preloader
        createRoot(effectsContainer).render(
            <StrictMode>
                <Snow />
                <Garland />
            </StrictMode>
        );

        // Ждем загрузки i18n
        await i18nInitPromise;
        
        // Предзагружаем все ресурсы (шрифты и изображения)
        await preloadAllResources();

        // Скрываем preloader с анимацией
        if (preloader) {
            preloader.classList.add('preloader');
        }
        
        // Рендерим приложение
        const rootElement = document.getElementById('root');
        if (rootElement) {
            createRoot(rootElement).render(
                <StrictMode>
                    <App />
                </StrictMode>
            );
        }
        
        // Помечаем body как загруженный, чтобы показать контент
        //document.body.classList.add('loaded');
        
    } catch (error) {
        console.error('Ошибка при инициализации:', error);
        // Все равно показываем приложение даже при ошибках
        const rootElement = document.getElementById('root');
        if (rootElement) {
            createRoot(rootElement).render(
                <StrictMode>
                    <App />
                </StrictMode>
            );
        }
        document.body.classList.add('loaded');
        if (preloader) {
            preloader.classList.add('preloader');
        }
    }
}

// Начинаем инициализацию после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM уже загружен
    initializeApp();
}



