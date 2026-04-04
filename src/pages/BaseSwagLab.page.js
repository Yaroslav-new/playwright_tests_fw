const { BasePage } = require('./Base.page');

export class BaseSwagLabPage extends BasePage {
    mainMenuButtonSelector = '.bm-icon';

    shoppingCartSelector = '.shopping_cart_link';

    shoppingCartBadgeSelector = '.shopping_cart_badge';

    get mainMenuBtn() { return this.page.locator(this.mainMenuButtonSelector); }

    get shopingCart() { return this.page.locator(this.shoppingCartSelector); }

    get shopingCartBadge() { return this.page.locator(this.shoppingCartBadgeSelector); }

    async getNumberOfItemsInCart() {
        return this.shopingCartBadge.textContent();
    }
}
