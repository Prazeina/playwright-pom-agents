import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async getItemNames() {
    return this.itemNames.allTextContents();
  }

  async removeItem(itemName) {
    const slug = itemName.toLowerCase().replace(/\s+/g, '-');
    await this.page.locator(`[data-test="remove-${slug}"]`).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async expectLoaded() {
    await this.expectUrl(/.*\/cart\.html/);
  }

  async expectItemCount(n) {
    await expect(this.cartItems).toHaveCount(n);
  }
}
