import { test, expect } from '../../fixtures/test.js';
import loginData from '../../test-data/loginData.json';

test.describe('Demo login (JSON object data)', () => {
  test('valid login lands on inventory', async ({ page, loginPage }) => {
    await loginPage.login(
      loginData.valid_user.username,
      loginData.valid_user.password,
    );

    await expect(page).toHaveURL(/.*\/inventory\.html/);
  });

  test('invalid login shows locked-out error', async ({ loginPage }) => {
    await loginPage.login(
      loginData.invalid_user.username,
      loginData.invalid_user.password,
    );

    await expect(loginPage.errorMessage).toContainText(
      'Epic sadface: Sorry, this user has been locked out.',
    );
  });
});
