import { defineConfig } from 'vite';
import type { UserConfig } from 'vite';
import type { InlineConfig } from 'vitest';

import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

type ViteConfig = UserConfig & { test: InlineConfig };
const config: ViteConfig = {
  base: '/MarkUp',
  plugins: [react(), svgr()],
  server: {
    port: 8080,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
  },
};

// https://vitejs.dev/config/
export default defineConfig(config);
