import { test, expect } from '../fixtures/pageFixtures';
import validData from '../test-data/validData.json';

test('User can send a message via contact form successfully', async ({
    homePage,
    page
}) => {
    await homePage.openContact();
    await homePage.sendContactMessage(validData.contactInfo);

    page.on('dialog', async dialog => {
        expect(dialog.message()).toBe('Thanks for the message!!');
        await dialog.accept();
    });
});

/*
test('Submit Contact form with invalid or incomplete data', async ({
    homePage,
}) => {
    await homePage.openContact();

    // Left contact form fields empty

    await expect(homePage.sendMessageButton).toBeDisabled();
});
*/