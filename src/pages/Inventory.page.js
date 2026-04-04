const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitleSelector = '.title';

    inventoryItemsSelector = '.inventory_item';

    addToCartButtonSelector = '[id^="add-to-cart"]';

    itemNameSelector = '.inventory_item_name';

    itemDescriptionSelector = '.inventory_item_desc';

    itemPriceSelector = '.inventory_item_price';

    get headerTitle() { return this.page.locator(this.headerTitleSelector); }

    get inventoryItems() { return this.page.locator(this.inventoryItemsSelector); }

    get addItemToCartBtns() { return this.page.locator(this.addToCartButtonSelector); }

    async addItemToCartById(id) {
        await this.inventoryItems.nth(id).locator(this.addToCartButtonSelector).click();
    }

    async getInventoryItemDataById(id) {
        const item = this.inventoryItems.nth(id);

        return {
            name: await item.locator(this.itemNameSelector).textContent(),
            description: await item.locator(this.itemDescriptionSelector).textContent(),
            price: await item.locator(this.itemPriceSelector).textContent(),
        };
    }

    async addRandomItems(count) {
        const addNextRandomItem = async (remaining, added) => {
            if (remaining === 0) {
                return added;
            }

            const buttons = this.addItemToCartBtns;
            const total = await buttons.count();
            if (total === 0) {
                return added;
            }

            const index = Math.floor(Math.random() * total);
            await buttons.nth(index).click();

            return addNextRandomItem(remaining - 1, added + 1);
        };

        return addNextRandomItem(count, 0);
    }
}
