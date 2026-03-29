// @ts-check
// const { expect } = require('@playwright/test');
// const { test } = require('../fixture');

// test.describe('Test case suite from the final task', () => {
//     test('Test1: Perform login', async ({ loginPage, inventoryPage }) => {
//         await loginPage.navigate();
//         await loginPage.performLogin(process.env.USERNAME, process.env.PASSWORD);

//         await expect(inventoryPage.headerTitle).toBeVisible();

//         expect(await inventoryPage.inventoryItems.count()).toBeGreaterThanOrEqual(1);
//     });

//     test('Test2: Add and remove product from the cart', async ({ loginPage, inventoryPage, shopingCartPage }) => {
//         await loginPage.navigate();
//         await loginPage.performLogin(process.env.USERNAME, process.env.PASSWORD);
//         await inventoryPage.addItemToCartById(0);
//         expect(await inventoryPage.getNumberOfItemsInCart()).toBe('1');

//         await inventoryPage.shopingCart.click();
//         expect(await shopingCartPage.cartItems.count()).toBeGreaterThanOrEqual(1);

//         await shopingCartPage.removeCartItemById(0);
//         await expect(shopingCartPage.cartItems).not.toBeAttached();
//     });

//     test('Test3: Add random product to the cart', async ({loginPage, inventoryPage}) => {

//     })
// });
