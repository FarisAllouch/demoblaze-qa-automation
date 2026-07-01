import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        super(page);

        this.addToCartButton = page.getByRole('link', { name:'Add to cart' });
    }

    async addToCart(times: number = 1) {
        for (let i = 0; i < times; i++) {
                this.page.once('dialog', async dialog => {
                    await dialog.accept();
            });

            await this.clickElement(this.addToCartButton);

            if (i < times - 1) {
                await this.page.waitForTimeout(1000);   
            }
        }
    }
}