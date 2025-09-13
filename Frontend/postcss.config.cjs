// postcss.config.cjs  (use .cjs to force CommonJS when package.json has "type": "module")
module.exports = {
  plugins: {
    // for latest tailwind versions the postcss plugin is in @tailwindcss/postcss
    // if your tailwind works without this, you can replace with 'tailwindcss': {}
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
