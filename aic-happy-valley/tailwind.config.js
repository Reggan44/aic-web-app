module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        accent: 'hsl(var(--accent))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        brand: {
          sage: '#A8D5BA',
          cream: '#FAF9F6',
          beige: '#E8D8C3',
          darkGrey: '#374151',
          skyBlue: '#BFD7ED',
          mutedGold: '#E6C79C',
        }
      },
    },
  },
  plugins: [],
}
