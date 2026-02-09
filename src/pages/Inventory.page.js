const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return this.page.locator('.title'); } //

    get inventoryItems() { return this.page.locator('.inventory_item'); }

    get addItemToCartBtns() { return this.page.locator('[id^="add-to-cart"]'); }

    async addItemToCartById(id) {
        await this.addItemToCartBtns.nth(id).click();
    }

    async addRandomItems(count) {
        let added = 0;

        for (let i = 0; i < count; i += 1) {
            // Only buttons with id starting "add-to-cart" are for items not yet in cart.
            const buttons = this.addItemToCartBtns;
            const total = await buttons.count();
            if (total === 0) break;

            // Select a random available item and add it.
            const index = Math.floor(Math.random() * total);
            await buttons.nth(index).click();
            added += 1;
        }

        // Return how many items were added.
        return added;
    }
}
