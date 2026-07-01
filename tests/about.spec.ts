import { test, expect } from '../fixtures/pageFixtures';

test('User can open About us, play video and close modal', async ({ homePage }) => {

    await homePage.openAboutUs();

    await homePage.playAboutUsVideo();

    await homePage.closeAboutUsX();

    await homePage.openAboutUs();

    await homePage.closeAboutUsbutton();

    await expect(homePage.aboutUsModal).not.toBeVisible();
    
});