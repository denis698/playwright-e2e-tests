// @ts-check
const { test, expect } = require('@playwright/test');

const url = process.env.BASE_URL;
const userName = process.env.USER_NAME;
const password = process.env.PASSWORD;

// Selectors for Login Page
const emailTextField = 'input[name="Email"]';
const passwordTextField = 'input[name="Password"]';
const loginButton = 'text=Sign in';

//Selectors for Dashboard
const header = '._headerLocationMenu-module__currentLocation';
const pageSection = '.euiPage';
const loginStatus = '[aria-label="John Doe"]';
const graph = '.recharts-surface';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForURL( url + '/login?continue_to=%2F' );
  await expect(page).toHaveTitle(/Sign in to Nexudus Platform/);

  await page.waitForSelector(emailTextField, {state:'visible'});
  await page.waitForSelector(passwordTextField, {state:'visible'});
  await page.waitForSelector(loginButton, {state:'visible'});
});

test.describe('Login Feature', () => {
  test('#001 - should be able to login - @smoke', async ({ page }) => {
    console.log('\ntest - web: should be able to login');

    await page.locator(emailTextField).type(String(userName));
    await page.locator(passwordTextField).type(String(password));
    await page.locator('button', { hasText: 'Sign in' }).click();

    await page.waitForLoadState('networkidle');
    await page.waitForURL(process.env.BASE_URL + '/dashboards/now');
    await expect(page).toHaveTitle(/Kalkio Space - East Side/);

    await page.waitForSelector(header, {state:'visible'});
    await expect(await page.locator(header)).toContainText('Kalkio Space - East Side');
    
    await page.waitForSelector(pageSection, {state:'visible'});
    await page.waitForSelector(loginStatus, {state:'visible'});
    await page.waitForSelector(graph, {state:'visible'});
  });

});
