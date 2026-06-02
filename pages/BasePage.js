import { expect } from '@playwright/test';

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async expectUrl(urlOrRegex) {
    await expect(this.page).toHaveURL(urlOrRegex);
  }

  async expectTitle(text) {
    await expect(this.page).toHaveTitle(text);
  }
}
