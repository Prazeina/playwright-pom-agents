import { test, expect } from '../../../fixtures/test.js';
import loginData from '../../../test-data/loginData.json';
import { InventoryPage } from '../../../pages/InventoryPage.js';

test.describe('Authentication and Session', () => {
  test('Login with valid credentials lands on inventory', async ({ page, loginPage }) => {
    // 1. Open the SauceDemo login page in a fresh session.
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();

    // 2. Enter a valid username and password, then submit the form.
    await loginPage.login(
      loginData.valid_user.username,
      loginData.valid_user.password,
    );

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectLoaded();
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });
});
