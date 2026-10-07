/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /*
          "Forest" family: off-white paper, deep green, one gold accent.
          Contrast: forest-800 on paper 10.1:1, ink-muted on paper 5.4:1,
          gold-700 on paper 5.2:1. gold-500 is decorative / large-type only.
        */
        paper: '#FCFDFB',
        mist: '#F1F5F1',
        ink: {
          DEFAULT: '#13221B',
          soft: '#3D4C45',
          muted: '#5E6B65',
        },
        forest: {
          950: '#0D271E',
          900: '#12352A',
          800: '#1B4A39',
          700: '#256049',
          500: '#5D8C74',
          300: '#A8C4B3',
          200: '#CADCD0',
          100: '#DDE8E1',
        },
        gold: {
          700: '#87672F',
          500: '#C4A15C',
          300: '#E2CB95',
          100: '#F3EAD3',
        },
        line: '#DDE5DF',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        shell: '1400px',
      },
      /* Shape lock: controls 12px, surfaces (cards, images, panels) 20px. */
      borderRadius: {
        control: '12px',
        surface: '20px',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
