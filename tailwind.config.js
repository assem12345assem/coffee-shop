/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        LightTaupe: '#B77E66',
        Temptress: '#471E22',
        bg: 'rgba(34, 27, 24, 0.60)',
        CitrineBrown: '#903711',
        Coconut: '#9E5A3D',
        CoffeeCardBg: 'rgba(115, 74, 57, 0.88)',
        Cornsilk: '#FFFADA',
        ReviewCardBg: 'rgba(88, 49, 21, 0.57)',
        revieWCardDesc: '#D3CECE',
        semiGreen: '#54DD8B',
        WhiteCoffee: '#E3D9D5',
        Mud: '#795341',
        cream: '#e6d7c2',
        brown: '#6f4e37',
        brownTransparent: 'rgba(88, 49, 21, 0.57)',
        americanSilver: '#D3CECE',
        semiGreen: '#44E183',
        coffeeBrown: 'rgba(115, 74, 57, 0.88)',
        rustBrown: '#A0583C',
        creamLight: '#FFFADA',
        whiteCoffee: '#E3D9D5',
      },
      fontFamily: {
        secondary: ['Inter', 'sans-serif'],
        third: ['Irish Grover', 'system-ui'],
      },
      dropShadow: {
        ReviewCardShadow: '0px 10px 20px rgba(0, 0, 0, 0.25)',
        locationSectionShadow: '20px 20px 10px 0px rgba(62, 47, 25, 0.20)',
      },
    },
  },
  plugins: [],
};
