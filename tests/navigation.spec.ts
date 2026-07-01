import { test, expect } from '../fixtures/pageFixtures';

test('User can open About us modal successfully', async ({
    homePage,
    page
}) => {
    await homePage.openProductStore();
    await expect(page).toHaveURL('/index.html');

    await homePage.openHome();
    await expect(page).toHaveURL('/index.html');
});