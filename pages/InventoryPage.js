import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.title = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  addToCartButton(itemName) {
    return this.page.getByRole('button', { name: `Add to cart` })
      .and(this.page.locator(`[data-test="add-to-cart-${this.toSlug(itemName)}"]`));
  }

  async addItemToCart(itemName) {
    await this.page.locator(`[data-test="add-to-cart-${this.toSlug(itemName)}"]`).click();
  }

  async getCartCount() {
    if (await this.cartBadge.isVisible()) {
      return parseInt(await this.cartBadge.textContent(), 10);
    }
    return 0;
  }

  async openCart() {
    await this.cartLink.click();
  }

  async sortBy(option) {
    await this.sortDropdown.selectOption(option);
  }

  async expectLoaded() {
    await this.expectUrl(/.*\/inventory\.html/);
    await expect(this.title).toHaveText('Products');
  }

  toSlug(name) {
    return name.toLowerCase().replace(/\s+/g, '-');
  }
}
