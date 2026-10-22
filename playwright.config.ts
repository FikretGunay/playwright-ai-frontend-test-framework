import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  reporter: [['list']],
  use: {
    browserName: 'chromium',
    screenshot: 'only-on-failure',
  },
  outputDir: './test-results',
});
