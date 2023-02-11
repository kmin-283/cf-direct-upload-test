import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://fd4f62db329f7b545ffca53ea9d9b98f.r2.cloudflarestorage.com/cf-direct-upload-test',
  plugins: [react()],
})
