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
        /* Anchored on the teal in the Soochuh mark (#008080) + warm neutrals */
        ink: {
          DEFAULT: '#14211F',
          soft: '#3D4A48',
          muted: '#6E7B78',
        },
        teal: {
          950: '#08201F',
          900: '#0B3A38',
          700: '#0F5C5A',
          600: '#137270',
          500: '#008080',
          300: '#7FB8B4',
          200: '#B7D6D2',
          100: '#DCEBE8',
          50:  '#EFF6F4',
        },
        clay: {
          DEFAULT: '#B9805F',
          light:   '#D6A98C',
          soft:    '#EBD8C9',
        },
        bone: {
          DEFAULT: '#FBF8F4',
          deep:    '#F3ECE4',
          line:    '#E7DED3',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Jost', 'Helvetica Neue', 'Arial', 'sans-serif'],
        body: ['Jost', 'Helvetica Neue', 'Arial', 'sans-serif'],
        heading: ['Fraunces', 'Georgia', 'serif'],
      },
      letterSpacing: {
        eyebrow: '0.22em',
      },
      maxWidth: {
        shell: '1240px',
        prose: '68ch',
      },
      borderRadius: {
        arch: '999px 999px 8px 8px',
        lozenge: '999px',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        rise:   { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fade:   { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        marquee:{ '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        rise: 'rise 0.9s cubic-bezier(0.22,1,0.36,1) forwards',
        fade: 'fade 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
};
