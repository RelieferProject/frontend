import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
// import envCompatible from 'vite-plugin-env-compatible';
import macrosPlugin from 'vite-plugin-babel-macros';
import WindiCSS from 'vite-plugin-windicss';
import EnvironmentPlugin from 'vite-plugin-environment';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  // esbuild: {
  //   drop: ['console', 'debugger'],
  // },
  server:{
    port: 3000,
  },
  plugins: [
    react(),
    // envCompatible({
    //   mountedPath: 'import.meta.env',
    // }),
    EnvironmentPlugin([
      'VITE_APP_CHAIN_ID',
      'VITE_APP_CHAIN_ID_HEX',
      'VITE_APP_NODE_1',
      'VITE_APP_NODE_2',
      'VITE_APP_NODE_3',
      'VITE_BASE_URL',
    ]),
    macrosPlugin(),
    WindiCSS(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@configs': path.resolve(__dirname, './src/configs'),
      '@contracts': path.resolve(__dirname, './src/contracts'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@providers': path.resolve(__dirname, './src/providers'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@states': path.resolve(__dirname, './src/states'),
      '@views': path.resolve(__dirname, './src/views'),
      process: 'process/browser',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util',
      web3: 'web3/dist/web3.min.js',
    },
  },
});
