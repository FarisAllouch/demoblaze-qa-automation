import { test, expect } from '../fixtures/pageFixtures';
import { TestDataHelper } from '../helpers/TestDataHelper';
import { testUser } from '../test-data/users';

test('User can sign up, log in and log out successfully', async ({
    homePage,
    page
 }) => {

    const user = TestDataHelper.generateUser();

    page.on('dialog', async dialog => {
        expect(dialog.message()).toBe('Sign up successful.');
        await dialog.accept();
    });

    await homePage.signUp(
        user.username,
        user.password
    );

    await homePage.login(
        user.username,
        user.password
    );

    await expect(
        page.getByText(`Welcome ${user.username}`)
    )
    .toBeVisible();

    await homePage.logout();

    await expect(homePage.loginLink).toBeVisible();

});

test('User can close Sign up modal', async ({ homePage }) => {

    await homePage.openSignUp();

    await homePage.closeSignUpX();

    await expect(homePage.signUpModal).not.toBeVisible();

    await homePage.openSignUp();

    await homePage.closeSignUpButton();

    await expect(homePage.signUpModal).not.toBeVisible();

});

test('User can close Login modal', async ({ homePage }) => {

    await homePage.openLogin();

    await homePage.closeLoginX();

    await expect(homePage.loginModal).not.toBeVisible();

    await homePage.openLogin();

    await homePage.closeLoginButton();

    await expect(homePage.loginModal).not.toBeVisible();

});

test('Login with non-registered user', async ({
    homePage,
    page
 }) => {

    page.on('dialog', async dialog => {
        expect(dialog.message()).toBe('User does not exist.');
    });

    const user = TestDataHelper.generateUser();

    await homePage.login(
        user.username,
        'neregistrovaniuser123'
    );

    await expect(homePage.loginLink).toBeVisible();
});

test('Sign up with registered user', async ({
    homePage,
    page
 }) => {

    page.on('dialog', async dialog => {
        expect(dialog.message()).toBe('This user already exist.');
        await dialog.accept();
    });

    await homePage.signUp(
        testUser.username,
        testUser.password
    );

    await expect(homePage.signUpLink).toBeVisible();

});

/*
test('User cannot register with invalid username and too short password', async ({
    homePage,
 }) => {

    await homePage.signUp(
        'test je ovo',
        '123'
    );

    await expect(homePage.signUpLink).toBeDisabled();

});

test('User cannot register with password containing only spaces', async ({
    homePage,
 }) => {

    const user = TestDataHelper.generateUser();

    await homePage.signUp(
        user.username,
        '  '
    );

    await expect(homePage.signUpLink).toBeDisabled();

});

*/