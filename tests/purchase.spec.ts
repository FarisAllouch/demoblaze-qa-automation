import { test, expect } from '../fixtures/pageFixtures';
import validData from '../test-data/validData.json';

test('User can complete purchase flow with cart item removal', async ({
    homePage,
    productPage,
    cartPage,
    page
}) => {
    await homePage.openProduct('Samsung galaxy s6');
    expect(page.url()).toContain('/prod.html');

    await productPage.addToCart(2);
    
    await homePage.openCart();
    await expect(page).toHaveURL('/cart.html');

    await expect(cartPage.productList).toHaveCount(2);
    await expect(cartPage.totalProducts).toHaveText('720');

    await cartPage.deleteProduct('Samsung galaxy s6', 0);

    await expect(cartPage.productList).toHaveCount(1);
    await expect(cartPage.totalProducts).toHaveText('360');

    page.on('dialog', async dialog => {
        expect(dialog.message()).toBe('Thank you for your purchase.');
        await dialog.accept();
    });

    await cartPage.placeOrder(validData.validOrder);
});

test('User can close Place order modal', async ({
    homePage,
    cartPage,
    page
}) => {

    await homePage.openCart();
    await expect(page).toHaveURL('/cart.html');

    await cartPage.openOrderModal();

    await cartPage.closeOrderModalX();
    await expect(cartPage.orderModal).not.toBeVisible();

    await cartPage.openOrderModal();

    await cartPage.closeOrderModalButton();
    await expect(cartPage.orderModal).not.toBeVisible();
    
});

/*
test('Place Order button state when cart is empty', async ({
    homePage,
    cartPage,
    page
}) => {
    await homePage.openCart();
    await expect(page).toHaveURL('/cart.html');

    await expect(cartPage.totalProducts).toBeEmpty()

    await expect(cartPage.placeOrderButton).toBeDisabled();
});
*/