import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const geistSans = GeistSans;
export const geistMono = GeistMono;

// Add CSS variables for font families
export const fontVariables = `
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');

  :root {
    --font-geist-sans: ${GeistSans.style.fontFamily};
    --font-geist-mono: ${GeistMono.style.fontFamily};
    --font-calligraphy: 'Dancing Script', cursive;
  }

  * {
    font-family: var(--font-geist-sans);
  }

  code, pre, kbd, samp {
    font-family: var(--font-geist-mono);
  }

  .calligraphy {
    font-family: var(--font-calligraphy);
    animation: write 2s ease-in-out forwards;
    white-space: nowrap;
    overflow: hidden;
    width: 0;
  }

  @keyframes write {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  .calligraphy span {
    display: inline-block;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeIn 0.5s ease-out forwards;
    animation-delay: calc(var(--delay) * 0.1s);
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;