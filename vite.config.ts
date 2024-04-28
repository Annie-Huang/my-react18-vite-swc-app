import {defineConfig, type PluginOption} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {visualizer} from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
// https://www.npmjs.com/package/vite-bundle-visualizer
// https://stackoverflow.com/questions/75746767/is-there-any-bundle-analyzer-for-vite
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      template: 'treemap', // or sunburst
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'analyse.html', // will be saved in project's root
    }) as PluginOption],
})
