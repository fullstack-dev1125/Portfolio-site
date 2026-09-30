import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { identityHtml } from './identity-html.ts';

export default defineConfig({
  plugins: [react(), tailwindcss(), identityHtml()],
});
