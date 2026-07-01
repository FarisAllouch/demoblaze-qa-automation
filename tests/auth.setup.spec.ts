import { test } from '../fixtures/pageFixtures';
import { testUser } from '../test-data/users';

test('authenticate', async ({
    homePage, 
    page 
}) => {

    await homePage.login(
        testUser.username,
        testUser.password
    );
    
    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    });
});