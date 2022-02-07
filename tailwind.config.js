module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}', './node_modules/tw-elements/dist/js/**/*.js'],
  plugins: [
    require('tw-elements/dist/plugin'),
  ]
};
