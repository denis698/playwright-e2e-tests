// @ts-check
const { devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
 const configDotenv = require('dotenv').config();


/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  //testMatch: ["login.spec.js"],
  grep: [new RegExp("@smoke"), new RegExp("@reg")],
  //grepInvert: [new RegExp("@smoke"), new RegExp("@invoice")],
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 60 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10000
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  //reporter: [ ['html', { open: 'never' }] ],
  reporter: [["dot"], ["json", { outputFile: "test-result.json" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 5000,

    //storageState: 'playwright-storageState.json',

    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,

  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'chromium',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //   },
    // },
    
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    {
      name: 'Google Chrome',
      use: {
        channel: 'chrome',
        ignoreHTTPSErrors: true,
        headless: false,
        viewport: null,
        launchOptions: {
          args: ["--start-maximized"],
        },
        screenshot: 'on',
        contextOptions: {
          recordVideo: {
            dir: 'test-results/videos/',
          },
        },
        video: 'on-first-retry',
        trace: 'retain-on-failure',
        
      },
     },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',

};

module.exports = config;
