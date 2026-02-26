// Предзагрузка шрифтов и изображений

// Список всех шрифтов для предзагрузки
const fontFiles: readonly string[] = [
    './fonts/actay regular/Actay-Regular.woff2',
    './fonts/actay regular/Actay-Regular.woff',
    './fonts/actay regular/Actay-RegularItalic.woff2',
    './fonts/actay regular/Actay-RegularItalic.woff',
    './fonts/caveat/Caveat-Regular.woff2',
    './fonts/caveat/Caveat-Regular.woff',
    './fonts/caveat/Caveat-Medium.woff2',
    './fonts/caveat/Caveat-Medium.woff',
    './fonts/caveat/Caveat-SemiBold.woff2',
    './fonts/caveat/Caveat-SemiBold.woff',
    './fonts/caveat/Caveat-Bold.woff2',
    './fonts/caveat/Caveat-Bold.woff'
] as const;

// Список критических изображений для предзагрузки (Home страница)
// Пути будут обработаны через import.meta.url динамически
const criticalImagePaths: readonly string[] = [
    '/myLogo.svg',
    './components/pages/home/assets/myPhoto.png',
    './components/pages/home/assets/hello.png',
    './components/pages/home/assets/frontend.svg',
    './components/pages/home/assets/computer.png',
    './components/pages/home/assets/www.png',
    './components/pages/home/assets/user.png',
    './components/pages/home/assets/palette.png',
    './components/pages/home/assets/weather/cloud.png',
    './components/pages/home/assets/currency/usa.png',
    './components/pages/home/assets/currency/europa.png',
    './components/copyright/assets/heart.png',
    './components/menu/mobile_menu/assets/back.png',
    './components/menu/mobile_menu/assets/back-light.png',
    './components/language_button/assets/usa.svg',
    './components/language_button/assets/russia.svg'
] as const;

// Предзагрузка шрифта
function preloadFont(url: string): Promise<void> {
    return new Promise((resolve) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = url.endsWith('.woff2') ? 'font/woff2' : 'font/woff';
        link.crossOrigin = 'anonymous';
        
        // Преобразуем относительный путь в абсолютный через import.meta.url
        let fontUrl = url;
        if (!url.startsWith('/') && !url.startsWith('http')) {
            try {
                fontUrl = new URL(url, import.meta.url).href;
            } catch {
                // Fallback если не удалось создать URL
                fontUrl = url;
            }
        }
        
        link.href = fontUrl;
        link.onload = () => resolve();
        link.onerror = () => resolve(); // Продолжаем даже если шрифт не загрузился
        document.head.appendChild(link);
    });
}

// Предзагрузка изображения
function preloadImage(url: string): Promise<void> {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Продолжаем даже если изображение не загрузилось
        img.src = url;
    });
}

// Проверка загрузки шрифтов через FontFace API
function checkFontsLoaded(): Promise<void> {
    return new Promise((resolve) => {
        if (!document.fonts) {
            // Fallback если FontFace API не поддерживается
            setTimeout(resolve, 1000);
            return;
        }

        // Используем document.fonts.ready для более надежной проверки
        if (document.fonts.ready) {
            document.fonts.ready.then(() => {
                // Дополнительная проверка через check
                const fontFamilies = ['Actay', 'Caveat'] as const;
                const fontWeights = [400, 500, 600, 700] as const;
                let allLoaded = true;
                
                fontFamilies.forEach(family => {
                    fontWeights.forEach(weight => {
                        if (!document.fonts.check(`12px ${family}`, `${weight}`)) {
                            allLoaded = false;
                        }
                    });
                });

                if (allLoaded) {
                    resolve();
                } else {
                    // Если не все загружены, ждем еще немного
                    setTimeout(resolve, 300);
                }
            }).catch(() => {
                // В случае ошибки продолжаем через 1 секунду
                setTimeout(resolve, 1000);
            });
        } else {
            // Fallback для старых браузеров
            setTimeout(resolve, 1500);
        }
    });
}

// Основная функция предзагрузки
export async function preloadAllResources(): Promise<boolean> {
    try {
        // Предзагрузка шрифтов
        const fontPromises = fontFiles.map(url => preloadFont(url));
        await Promise.all(fontPromises);

        // Генерируем пути для изображений
        const criticalImages = criticalImagePaths.map(path => {
            if (path.startsWith('/')) {
                // Абсолютный путь (например, /myLogo.svg)
                return path;
            }
            // Относительный путь - конвертируем через import.meta.url
            try {
                return new URL(path, import.meta.url).href;
            } catch {
                // Fallback если не удалось создать URL
                return path;
            }
        });

        // Предзагрузка изображений
        const imagePromises = criticalImages.map(url => preloadImage(url));
        await Promise.all(imagePromises);

        // Ждем загрузки шрифтов через FontFace API
        await checkFontsLoaded();

        // Дополнительная небольшая задержка для стабилизации
        await new Promise(resolve => setTimeout(resolve, 200));

        return true;
    } catch (error) {
        console.warn('Ошибка при предзагрузке ресурсов:', error);
        // Продолжаем работу даже при ошибках
        return true;
    }
}

