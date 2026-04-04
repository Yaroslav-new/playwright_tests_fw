const { BaseSwagLabPage } = require('./BaseSwagLab.page');

export class ShopingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    headerTitleSelector = '.title';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    checkoutButtonSelector = '#checkout';

    firstNameInputSelector = '#first-name';

    lastNameInputSelector = '#last-name';

    postalCodeInputSelector = '#postal-code';

    continueButtonSelector = '#continue';

    itemTotalLabelSelector = '.summary_subtotal_label';

    taxLabelSelector = '.summary_tax_label';

    totalLabelSelector = '.summary_total_label';

    cartItemNameSelector = '.inventory_item_name';

    cartItemDescriptionSelector = '.inventory_item_desc';

    cartItemPriceSelector = '.inventory_item_price';

    get headerTitle() { return this.page.locator(this.headerTitleSelector); }

    get cartItems() { return this.page.locator(this.cartItemSelector); }

    get checkoutBtn() { return this.page.locator(this.checkoutButtonSelector); }

    get firstNameInput() { return this.page.locator(this.firstNameInputSelector); }

    get lastNameInput() { return this.page.locator(this.lastNameInputSelector); }

    get postalCodeInput() { return this.page.locator(this.postalCodeInputSelector); }

    get continueBtn() { return this.page.locator(this.continueButtonSelector); }

    get itemTotalLabel() { return this.page.locator(this.itemTotalLabelSelector); }

    get taxLabel() { return this.page.locator(this.taxLabelSelector); }

    get totalLabel() { return this.page.locator(this.totalLabelSelector); }

    // async below added to show the function returns a promise
    async getCartItemByName(name) { return this.page.locator(this.cartItemSelector, { hasText: name }); }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.locator(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems.nth(id).locator(this.removeItemSelector).click();
    }

    async clickCheckout() {
        await this.checkoutBtn.click();
    }

    async fillCheckoutInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueCheckout() {
        await this.continueBtn.click();
    }

    async getCartItemDataByName(name) {
        const item = await this.getCartItemByName(name);

        return {
            name: await item.locator(this.cartItemNameSelector).textContent(),
            description: await item.locator(this.cartItemDescriptionSelector).textContent(),
            price: await item.locator(this.cartItemPriceSelector).textContent(),
        };
    }

    async getItemTotalValue() {
        const itemTotalText = await this.itemTotalLabel.textContent();
        return Number(itemTotalText.replace('Item total: $', ''));
    }

    async getTaxValue() {
        const taxText = await this.taxLabel.textContent();
        return Number(taxText.replace('Tax: $', ''));
    }

    async getTotalValue() {
        const totalText = await this.totalLabel.textContent();
        return Number(totalText.replace('Total: $', ''));
    }
}
