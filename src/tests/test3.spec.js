// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../fixture');
const { checkoutUser } = require('../test-data/checkoutUser.data');

test.describe('Test3: Add random product to the cart', () => {
    test('Add random product to the cart', async ({ loginPage, inventoryPage, shopingCartPage }) => {
        // Log in with valid user credentials.
        await loginPage.navigate();
        await loginPage.performLogin(process.env.USERNAME, process.env.PASSWORD);

        // Pick up to three unique random products from the inventory.
        const totalInventoryItems = await inventoryPage.inventoryItems.count();
        const randomItemIds = new Set();
        const productsToAddCount = Math.min(3, totalInventoryItems);

        while (randomItemIds.size < productsToAddCount) {
            randomItemIds.add(Math.floor(Math.random() * totalInventoryItems));
        }

        const selectedItemIds = Array.from(randomItemIds);
        const selectedProducts = await Promise.all(
            selectedItemIds.map((itemId) => inventoryPage.getInventoryItemDataById(itemId)),
        );

        // Add the selected products to the cart one by one.
        await selectedItemIds.reduce(
            async (previousAction, itemId) => {
                await previousAction;
                await inventoryPage.addItemToCartById(itemId);
            },
            Promise.resolve(),
        );

        // Verify the cart badge matches the number of added products.
        expect(await inventoryPage.getNumberOfItemsInCart()).toBe(String(selectedProducts.length));

        // Complete the checkout information step.
        await inventoryPage.shopingCart.click();
        await shopingCartPage.clickCheckout();
        await shopingCartPage.fillCheckoutInformation(
            checkoutUser.firstName,
            checkoutUser.lastName,
            checkoutUser.postalCode,
        );
        await shopingCartPage.continueCheckout();

        // Verify that checkout overview contains the same products and details.
        const actualProducts = await Promise.all(
            selectedProducts.map((expectedProduct) => shopingCartPage.getCartItemDataByName(expectedProduct.name)),
        );
        actualProducts.forEach((actualProduct, index) => {
            expect(actualProduct).toEqual(selectedProducts[index]);
        });

        // Verify the item total, tax, and final total values.
        const expectedItemTotal = selectedProducts
            .reduce((sum, product) => sum + Number(product.price.replace('$', '')), 0);
        const actualItemTotal = await shopingCartPage.getItemTotalValue();
        const actualTax = await shopingCartPage.getTaxValue();
        const actualTotal = await shopingCartPage.getTotalValue();

        expect(actualItemTotal).toBe(expectedItemTotal);
        expect(actualTotal).toBe(Number((actualItemTotal + actualTax).toFixed(2)));
    });
});
