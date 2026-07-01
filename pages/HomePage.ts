import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { FormHelper } from '../helpers/FormHelper';

export class HomePage extends BasePage {
    readonly page: Page;

    readonly productStore: Locator;
    readonly home: Locator;
    readonly cart: Locator;

    readonly nextButton: Locator;
    readonly previousButton: Locator;

    readonly closeSignUpx: Locator;
    readonly closeSignUpbutton:Locator;
    readonly signUpLink: Locator;
    readonly signUpModal: Locator;
    readonly signUpUsername: Locator;
    readonly signUpPassword: Locator;
    readonly signUpButton: Locator;

    readonly closeLoginx: Locator;
    readonly closeLoginbutton:Locator;
    readonly loginLink: Locator;
    readonly loginModal: Locator;
    readonly loginUsername: Locator;
    readonly loginPassword: Locator;
    readonly loginButton: Locator;
    readonly logoutLink: Locator;

    readonly contact: Locator;
    readonly contactEmail: Locator;
    readonly contactName: Locator;
    readonly contactMessage: Locator;
    readonly sendMessageButton: Locator;

    readonly aboutUs: Locator;
    readonly aboutUsModal: Locator;
    readonly playVideo: Locator;
    readonly closeAboutUsx: Locator;
    readonly closeAboutUsButton: Locator;

    constructor(page: Page) {
        super(page);

        this.page = page;

        this.productStore = page.getByRole('link', { name: 'PRODUCT STORE' });
        this.home = page.getByRole('link', { name: 'Home' });
        this.cart = page.locator('#cartur');

        this.nextButton = page.locator('#next2');
        this.previousButton = page.locator('#prev2');

        this.closeSignUpx = page.locator('#signInModal .modal-header button');
        this.closeSignUpbutton = page.locator('#signInModal .modal-footer button').first();
        this.signUpLink = page.getByRole('link', { name: 'Sign up' });
        this.signUpModal = page.locator('#signInModal .modal-content');
        this.signUpUsername = page.getByLabel('Username:');
        this.signUpPassword = page.getByLabel('Password:');
        this.signUpButton = page.getByRole('button', { name: 'Sign up' });

        this.closeLoginx = page.locator('#logInModal .modal-header button');
        this.closeLoginbutton = page.locator('#logInModal .modal-footer button').first();
        this.loginLink = page.getByRole('link', { name: 'Log in' });
        this.loginModal = page.locator('#logInModal .modal-content');
        this.loginUsername = page.locator('#loginusername');
        this.loginPassword = page.locator('#loginpassword');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.logoutLink = page.getByRole('link', { name: 'Log out' });
        
        this.contact = page.getByRole('link', { name: 'Contact' });
        this.contactEmail = page.locator('#recipient-email');
        this.contactName = page.locator('#recipient-name');
        this.contactMessage = page.locator('#message-text');
        this.sendMessageButton = page.getByRole('button', { name: 'Send message' });

        this.aboutUs = page.getByRole('link', { name: 'About us' });
        this.playVideo = page.getByRole('button', { name: 'Play Video' });
        this.aboutUsModal = page.locator('#videoModal .modal-content');
        this.closeAboutUsx = page.getByRole('button', { name: 'Close' }).nth(1);
        this.closeAboutUsButton = page.getByRole('button', { name: 'Close' }).last();
    }

    async openProductStore() {
        await this.clickElement(this.productStore);
    }

    async openHome() {
        await this.clickElement(this.home);
    }

    async openCart() {
        await this.clickElement(this.cart);
    }

    async openSignUp() {
        this.clickElement(this.signUpLink);
    }

    async closeSignUpX() {
        await this.clickElement(this.closeSignUpx);
    }

    async closeSignUpButton() {
        await this.clickElement(this.closeSignUpbutton);
    }

    async signUp(username: string, password: string) {

        await this.openSignUp();

        await FormHelper.fillFields([
            {
                locator: this.signUpUsername,
                value: username
            },
            {
                locator: this.signUpPassword,
                value: password
            }
        ]);

        await this.clickElement(this.signUpButton);
    }

    async openLogin() {
        await this.clickElement(this.loginLink);
    }

    async closeLoginX() {
        await this.clickElement(this.closeLoginx);
    }

    async closeLoginButton() {
        await this.clickElement(this.closeLoginbutton);
    }

    async login(username: string, password: string) {

        await this.openLogin();

        await FormHelper.fillFields([
            {
                locator: this.loginUsername,
                value: username
            },
            {
                locator: this.loginPassword,
                value: password
            }
        ]);

        await this.clickElement(this.loginButton);

    }

    async logout() {
        await this.clickElement(this.logoutLink);
    }

    async openProduct(productName: string) {
        await this.page
            .getByRole('link', { name: productName })
            .click();
    }

    async openContact() {
        await this.clickElement(this.contact);
    }

    async sendContactMessage(data: {email: string, name: string, message: string}) {

        await FormHelper.fillFields([
            {
                locator: this.contactEmail,
                value: data.email
            },
            {
                locator: this.contactName,
                value: data.name
            },
            {
                locator: this.contactMessage,
                value: data.message
            },
        ]);

        await this.clickElement(this.sendMessageButton);

    }

    async openAboutUs() {
        await this.clickElement(this.aboutUs);
    }

    async playAboutUsVideo() {
        await this.clickElement(this.playVideo);
    }

    async closeAboutUsX() {
        await this.clickElement(this.closeAboutUsx);
    }

    async closeAboutUsbutton() {
        await this.clickElement(this.closeAboutUsButton);
    }

} 