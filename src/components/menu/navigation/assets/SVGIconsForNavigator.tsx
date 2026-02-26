import { FC } from 'react';

interface IconProps {
    className?: string;
}

const IconHouse: FC<IconProps> = ({ className }) => (
    <svg width='25' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <path className={`svg ${className === 'activeColor' ? 'house-svg' : ''}`} fill='currentColor' 
    d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 
    16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 
    512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 
    0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 
    .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 
    0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
);

const IconAbout: FC<IconProps> = ({ className }) => (
    <svg className={`svg ${className === 'activeColor' ? 'about-svg' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill='currentColor' 
    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 
    482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2
    304 269.7 304l-91.4 0z"/></svg>
);

const IconTools: FC<IconProps> = ({ className }) => (
    <svg className={`svg ${className === 'activeColor' ? 'tools-svg' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill='currentColor' 
    d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 
    39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 
    256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 
    12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 
    0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 
    0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>
);

const IconPortfolio: FC<IconProps> = ({ className }) => (
    <svg className={`svg ${className === 'activeColor' ? 'portfolio-svg' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill='currentColor'
    d="M184 48l144 0c4.4 0 8 3.6 8 8l0 40L176 96l0-40c0-4.4 3.6-8 8-8zm-56 8l0 40L64 
    96C28.7 96 0 124.7 0 160l0 96 192 0 128 0 192 0 0-96c0-35.3-28.7-64-64-64l-64 
    0 0-40c0-30.9-25.1-56-56-56L184 0c-30.9 0-56 25.1-56 56zM512 288l-192 0 0 32c0 
    17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-32L0 288 0 416c0 35.3 28.7 64 
    64 64l384 0c35.3 0 64-28.7 64-64l0-128z"/></svg>
);

const IconContacts: FC<IconProps> = ({ className }) => (
    <svg className={`svg ${className === 'activeColor' ? 'contacts-svg' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill='currentColor' 
    d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 
    1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 
    1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 
    316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
);

const icons = {
    house: IconHouse,
    about: IconAbout,
    tools: IconTools,
    portfolio: IconPortfolio,
    contacts: IconContacts
} as const;

export default icons;



