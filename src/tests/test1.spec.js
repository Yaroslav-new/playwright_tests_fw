// @ts-check
const { expect } = require('@playwright/test');
const { test } = require('../fixture');

test.describe('Test1: Perform login', () => {
    test('Perform login', async ({ loginPage, inventoryPage }) => {
        await loginPage.navigate();
        await loginPage.performLogin(process.env.USERNAME, process.env.PASSWORD);

        await expect(inventoryPage.headerTitle).toBeVisible();
        expect(await inventoryPage.inventoryItems.count()).toBeGreaterThanOrEqual(1);
    });
});
