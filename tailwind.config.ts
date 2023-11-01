import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        manrope: ['Manrope'],
        trebuchetMs: ['Trebuchet MS'],
      },
      colors: {
        traeWhiteBlue: "#e1f1fd",
        traeLiteBlue: "#c1d8f0",
        traeBgBlue: "#426df0",
        traeFifaBlue: "#1077C3",
        traeSoccerBlue: "#0070df",
        traeCoolGreen: "#488691",
        traeCoolOrange: "#f7931e",
        traeCoolRed: "#9c0606"
      },
    },
    screens: {
      'sm': '500px',
      'md': '600px',
      'lg': '700px',
      'xl': '800px',
      '2xl': '1000px',
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
