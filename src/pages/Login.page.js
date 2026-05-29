const { BasePage } = require('./Base.page');

export class LoginPage extends BasePage {
    userNameSelector = '#user-name';

    passwordSelector = '#password';

    loginButtonSelector = '#login-button';

    get userName() { return this.page.locator(this.userNameSelector); }

    get password() { return this.page.locator(this.passwordSelector); }

    get loginBtn() { return this.page.locator(this.loginButtonSelector); }

    async performLogin(userName, password) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.loginBtn.click();
    }
}
