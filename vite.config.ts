import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://pub-61e2e3369f11464a926864d5e1139b2c.r2.dev/cf-direct-upload-test',
  plugins: [react()],
})
