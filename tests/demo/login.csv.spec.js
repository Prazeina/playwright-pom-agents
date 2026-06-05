import { test, expect } from '../../fixtures/test.js';
import { readCSV } from '../../utils/csvReaders.js';

const loginData = readCSV('test-data/LoginData.csv');

test.describe('Demo login (CSV data-driven)', () => {
  loginData.forEach((data) => {
    if (data.run !== 'true') return;

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
