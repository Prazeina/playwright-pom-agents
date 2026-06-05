import { test, expect } from '../../fixtures/test.js';

test.describe('SauceDemo checkout flow', () => {
  test('logged-in user lands on inventory', async ({ inventoryPage }) => {
    await inventoryPage.expectLoaded();
  });

  test('add a single item updates cart badge', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('add multiple items and verify cart contents', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.openCart();
    await cartPage.expectLoaded();
    await cartPage.expectItemCount(2);

    const names = await cartPage.getItemNames();
    expect(names).toEqual(
      expect.arrayContaining(['Sauce Labs Backpack', 'Sauce Labs Bike Light']),
    );
  });

  test('remove item from cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.removeItem('Sauce Labs Backpack');
    await cartPage.expectItemCount(0);
  });
});

test.describe('JSONPlaceholder API', () => {
  test('GET /posts/1 returns expected post', async ({ apiContext }) => {
    const res = await apiContext.get('/posts/1');
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({ id: 1, userId: 1 });
    expect(body.title).toEqual(expect.any(String));
  });

  test('POST /posts creates a post', async ({ apiContext }) => {
    const res = await apiContext.post('/posts', {
      data: { title: 'hello', body: 'world', userId: 1 },
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body).toMatchObject({ title: 'hello', userId: 1 });
  });
});
