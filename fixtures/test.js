import { test as base, request } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import loginData from '../test-data/loginData.json';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await use(loginPage);
  },

  loggedInPage: async ({ page, loginPage }, use) => {
    await loginPage.login(
      loginData.valid_user.username,
      loginData.valid_user.password,
    );
    await use(page);
  },

  inventoryPage: async ({ loggedInPage }, use) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    await inventoryPage.expectLoaded();
    await use(inventoryPage);
  },

  cartPage: async ({ loggedInPage }, use) => {
    const cartPage = new CartPage(loggedInPage);
    await use(cartPage);
  },

  apiContext: [async ({}, use) => {
    const ctx = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com',
      extraHTTPHeaders: { 'Content-Type': 'application/json' },
    });
    await use(ctx);
    await ctx.dispose();
  }, { scope: 'worker' }],
});

export const expect = test.expect;
