# SauceDemo Test Plan

## Application Overview

Test coverage for https://www.saucedemo.com focusing on authentication, product browsing, cart management, checkout, sidebar actions, and key validation/error states. All scenarios assume a fresh browser session with no prior app state unless the step explicitly starts from a different page.

## Test Scenarios

### 1. Authentication and Session

**Seed:** `tests/seed.spec.js`

#### 1.1. Login with valid credentials lands on inventory

**File:** `tests/saucedemo/auth/login-success.spec.js`

**Steps:**

1. Open the SauceDemo login page in a fresh session.
   - expect: The login form is visible with Username, Password, and Login controls.
2. Enter a valid username and password, then submit the form.
   - expect: The app navigates to the Inventory page.
   - expect: The Products heading is visible.
   - expect: The cart badge is empty or absent before any items are added.

#### 1.2. Login rejects missing credentials

**File:** `tests/saucedemo/auth/login-validation.spec.js`

**Steps:**

1. Open the SauceDemo login page in a fresh session.
   - expect: The login form is visible and no fields are prefilled.
2. Submit the form without entering any credentials.
   - expect: An inline error message is shown.
   - expect: The user remains on the login page.
   - expect: The password field does not reveal any value.
3. Enter only one field at a time and resubmit.
   - expect: The form still blocks login until both required credentials are provided.

#### 1.3. Logout returns to the login page and blocks session carryover

**File:** `tests/saucedemo/auth/logout.spec.js`

**Steps:**

1. Log in successfully and open the side menu.
   - expect: The side menu shows navigation actions including Logout.
2. Choose Logout from the menu.
   - expect: The app returns to the login page.
   - expect: The login form is visible again.
3. Attempt to navigate back to the inventory page using browser history or a direct page refresh.
   - expect: The user is not left in an authenticated inventory session.
   - expect: The app requires login again or redirects to the login screen.

### 2. Inventory and Cart

**Seed:** `tests/seed.spec.js`

#### 2.1. Sort products and add or remove an item

**File:** `tests/saucedemo/inventory/sort-and-cart.spec.js`

**Steps:**

1. Log in successfully and stay on the Inventory page.
   - expect: The product list is visible.
2. Change the sort order using the sort dropdown.
   - expect: The product list reorders according to the selected sort option.
3. Add a product to the cart.
   - expect: The selected item button changes to a remove state.
   - expect: The cart badge increments to 1.
4. Remove the same product from the inventory page.
   - expect: The button returns to Add to cart.
   - expect: The cart badge clears.

#### 2.2. Cart keeps selected items and supports removal

**File:** `tests/saucedemo/cart/cart-management.spec.js`

**Steps:**

1. Log in successfully and add one product to the cart.
   - expect: The cart badge shows 1.
2. Open the cart page.
   - expect: The cart page lists the selected item.
   - expect: The quantity is 1.
   - expect: Checkout and Continue Shopping are available.
3. Remove the item from the cart.
   - expect: The item disappears from the cart list.
   - expect: The cart badge clears.
4. Use Continue Shopping to return to inventory.
   - expect: The app returns to the product list.

### 3. Checkout Flow

**Seed:** `tests/seed.spec.js`

#### 3.1. Checkout form requires all customer fields

**File:** `tests/saucedemo/checkout/checkout-validation.spec.js`

**Steps:**

1. Log in, add one item to the cart, and open Checkout Step One.
   - expect: The Checkout: Your Information form is visible.
2. Submit the form without entering any customer data.
   - expect: The form shows a required-field error message.
   - expect: The user remains on Checkout Step One.
3. Fill only part of the form and resubmit.
   - expect: Checkout remains blocked until First Name, Last Name, and Postal Code are all provided.

#### 3.2. Complete checkout and verify order confirmation

**File:** `tests/saucedemo/checkout/checkout-success.spec.js`

**Steps:**

1. Log in, add one item to the cart, and proceed through Checkout Step One with valid customer details.
   - expect: The app advances to Checkout: Overview.
2. Review the overview totals and finish the purchase.
   - expect: Payment and shipping information are shown.
   - expect: Item total, tax, and total are visible.
   - expect: The app navigates to Checkout: Complete!
3. Verify the success message and return home.
   - expect: The confirmation message thanks the user for the order.
   - expect: The Back Home button is present.
   - expect: The order completion screen is stable and readable.

#### 3.3. Cancel checkout preserves cart state

**File:** `tests/saucedemo/checkout/cancel-checkout.spec.js`

**Steps:**

1. Log in, add one item to the cart, and open Checkout Step One.
   - expect: The checkout form is visible and the cart still indicates 1 item.
2. Cancel the checkout flow from Step One or Step Two.
   - expect: The app returns to the previous shopping area.
   - expect: The selected item remains in the cart unless it was explicitly removed.

### 4. Sidebar and App State

**Seed:** `tests/seed.spec.js`

#### 4.1. Reset app state clears shopping progress

**File:** `tests/saucedemo/sidebar/reset-state.spec.jss`

**Steps:**

1. Log in, add at least one item to the cart, and open the side menu.
   - expect: Reset App State is visible in the menu.
2. Choose Reset App State.
   - expect: The cart badge clears.
   - expect: Previously selected add/remove states are restored to the default inventory state.
   - expect: Any in-progress shopping state is cleared.

#### 4.2. About link opens the Sauce Labs site

**File:** `tests/saucedemo/sidebar/about-link.spec.js`

**Steps:**

1. Log in and open the side menu.
   - expect: The About link is visible.
2. Activate About.
   - expect: The browser navigates to the Sauce Labs website in the same tab or an expected external destination.
   - expect: The action does not break the app session in an unexpected way.
