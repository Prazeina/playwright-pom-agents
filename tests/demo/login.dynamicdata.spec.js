import { test, expect } from '../../fixtures/test.js';
import loginData from '../../test-data/loginDataNew.json';

test.describe('Demo login (JSON array data-driven)', () => {
  loginData.forEach((data) => {
    if (!data.run) return;

    test(`Login Test ${data.username}`, async ({ page, loginPage }) => {
      await loginPage.login(data.username, data.password);

      if (data.expected === 'success') {
        await expect(page).toHaveURL(/.*\/inventory\.html/);
      } else {
        await expect(loginPage.errorMessage).toBeVisible();
      }
    });
  });
});
