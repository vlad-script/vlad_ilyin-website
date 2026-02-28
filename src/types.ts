export type ScreenSize = 'mobile' | 'desktop';

// Тема приложения - используется почти везде: App.tsx, Home.tsx, About.tsx, Tools.tsx,
// Navigation.tsx, DesktopMenu.tsx, MobileMenu.tsx, LanguageButton.tsx, ThemeButton.tsx
// Хранится в localStorage и применяется ко всему интерфейсу
export type Theme = 'dark' | 'light';

// Состояние для 3D эффекта наклона - используется в About.tsx, Portfolio.tsx, Slider.tsx
// Для Weather.tsx сделал расширенную версию TiltStateExtended с дополнительным scaleText
export interface TiltState {
    x: number;
    y: number;
    scale: number;
}

// Расширенная версия TiltState для виджета погоды (Weather.tsx)
// Добавил scaleText, чтобы отдельно масштабировать текст при наведении
export interface TiltStateExtended extends TiltState {
    scaleText: number;
}

// Пропсы для ячеек с фактами - используется в About.tsx и Tools.tsx
// Одинаковая структура для карточек с технологиями и навыками, поэтому вынес в общие типы
export interface CellProps {
    img: string;
    label: string;
    description: string;
    showDescriptions: boolean;
    pos: 'l' | 'r';
}

// Состояние тултипа - используется в Navigation.tsx, LanguageButton.tsx, ThemeButton.tsx
// Общая структура для всех подсказок при наведении
export interface TooltipState {
    visible: boolean;
    text: string;
    position: {
        top: string;
        left: string;
    };
}

// Базовые пропсы для страничных компонентов - используется в Home.tsx, About.tsx, Tools.tsx
// Все страницы получают media и theme, так что решил сделать общий интерфейс
export interface PageProps {
    media: ScreenSize;
    theme: Theme;
}

