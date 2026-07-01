import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

type Pages = {
    homePage: HomePage;
    productPage: ProductPage;
    cartPage: CartPage;
};

export const test = base.extend<Pages>({
    homePage: async ({page}, use) => {
        await page.goto('/');
        
        await use(new HomePage(page));
    },

    productPage: async ({page}, use) => {
        await use(new ProductPage(page));
    },

    cartPage: async ({page}, use) => {
        await use(new CartPage(page));
    }
});

export { expect } from '@playwright/test';