import { Locator, Page } from '@playwright/test';

export class BasePage {
    constructor(protected page: Page) {}

    async navigateTo(url: string) {
        await this.page.goto(url, {
            waitUntil: 'domcontentloaded'
        });
    }

    async clickElement(locator: Locator) {
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }
}