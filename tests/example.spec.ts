import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // 1. Open application
  await page.goto('https://www.demoblaze.com/');

  // 2. Verify page loads
  await expect(page).toHaveURL('https://www.demoblaze.com/');
});

test('Web app loads and user can navigate to homepage via navbar logo and Home button', async ({ page }) => {
  // 1. Click navbar logo (should redirect to /index.html)
  await page.getByRole('link', { name: 'PRODUCT STORE' }).click();
  await expect(page).toHaveURL('https://www.demoblaze.com/index.html');

  // 2. Click Home in navbar (should redirect to /index.html)
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page).toHaveURL('https://www.demoblaze.com/index.html');
});

test('User can sign up, log in and log out successfully', async ({ page }) => {
  const username = `testuser${Date.now()}`;
  const password = 'Test12345!';
  // 1. Click on "Sign up" in navbar
  await page.getByRole('link', { name: 'Sign up' }).click();

  // 2. Enter a valid username in the username field
  await page.getByLabel('Username:').fill(username);

  // 3. Enter a valid password in the password field
  await page.getByLabel('Password:').fill(password);

  // 4. Expect success popup after clicking Sign up
  page.on('dialog', async dialog => {
    expect(dialog.message()).toBe('Sign up successful.');
    await dialog.accept();
  })

  // 5. Click "Sign up" button in modal
  await page.getByRole('button', { name: 'Sign up' }).click();

  // 6. Click on "Log in" in navbar
  await page.getByRole('link', { name: 'Log in' }).click();

  // 7. Enter a valid registered username in the username input field
  await page.getByLabel('Username:').fill(username);

  // 8. Enter a valid registered password in the password input field
  await page.getByLabel('Password:').fill(password);

  // 9. Click "Log in" in modal
  await page.getByRole('button', { name: 'Log in' }).click();

  // 10. Verify login
  await expect(page.getByText(`Welcome ${username}`)).toBeVisible();

  // 11. Click "Log out" in navbar
  await page.getByRole('link', { name: 'Log out' }).click();

  // 12.Expect successfully logging out
  await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
});

test('User can complete purchase flow with cart item removal', async ({ page }) => {
  // 1. Click on a product from the homepage (Samsung galaxy S6)
  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();

  // 2. Expect to have in URL "/prod.h  tml/"
  expect(page.url()).toContain('/prod.html');

  // 3. first add 
  page.once('dialog', async dialog => {
    await dialog.accept();
  });

  // 4. Click "Add to cart" first time
  await page.getByRole('link', { name: 'Add to cart' }).click();

  // 5. Wait a bit for cart update
  await page.waitForTimeout(1000);

  // 6. Second add
  page.once('dialog', async dialog => {
    await dialog.accept();
  });

  // 7. Click "Add to cart" second time
  await page.getByRole('link', { name: 'Add to cart' }).click();

  // 8. Wait a bit for cart update
  await page.waitForTimeout(1000);

  // 9. Click "Cart" from navbar
  await page.locator('#cartur').click();

  // 10. Expect to have in URL "cart.html"
  expect(page.url()).toContain('/cart.html');

  // 11. Check cart items
  await expect(page.locator('tbody tr')).toHaveCount(2);

  // 12. Check total
  await expect(page.locator('#totalp')).toHaveText('720');

  // 13. Delete one item
  await page.getByText('Delete').first().click();

  // 14. Check total again 
  await expect(page.locator('#totalp')).toHaveText('360');

  // 15. Click "Place Order" button
  await page.getByRole('button', { name: 'Place Order' }).click();

  // 16. Fill out form
  await page.locator('#name').fill('Faris');
  await page.locator('#country').fill('Bosnia');
  await page.locator('#city').fill('Sarajevo');
  await page.locator('#card').fill('1234 1234 1234 1234');
  await page.locator('#month').fill('6');
  await page.locator('#year').fill('2026');

  // 17. Click "Purchase" button
  await page.getByRole('button', { name: 'Purchase' }).click();

  // 18. Expect pop up message with order information
  page.on('dialog', async dialog => {
    expect(dialog.message()).toBe('Thank you for your purchase.');
    await dialog.accept();
  });
});

test('User can send a message via contact form successfully', async ({page}) => {
  // 1. Click on "Contact" in navbar
  await page.getByRole('link', { name: 'Contact' }).click();

  // 2. Fill out form
  await page.locator('#recipient-email').fill('test@gmail.com');
  await page.locator('#recipient-name').fill('Faris');
  await page.locator('#message-text').fill('Test message');

  // 3. Click "Send message" button
  await page.getByRole('button', { name: 'Send message' }).click();

  // 4. Expect thanks confirmation on pop-up
  page.on('dialog', async dialog => {
    expect(dialog.message()).toBe('Thanks for the message!!');
    await dialog.accept();
  });
});

test('User can open About us modal successfully', async ({page}) => {
  // 1. Click on "About us" in navbar 
  await page.getByRole('link', { name: 'About us' }).click();

  // 2. Click play button on video
  await page.getByRole('button', { name: 'Play Video' }).click();

  // 3. Click "Close" button on modal
  await page.getByRole('button', { name: 'Close' }).nth(1).click();
});

test('User can navigate through homepage slider images successfully', async ({page}) => {
  // 1. Slider is visible
  await expect(page.locator('.carousel-inner')).toBeVisible();

  // 2. Click "Next" button on slider
  await page.locator('.carousel-control-next').click();

  // 3. Wait a bit
  await page.waitForTimeout(1000);

  // 4. Click "Previous" button on slider
  await page.locator('.carousel-control-prev').click();

  // 5. Check auto-slide
  const firstSlide = await page.locator('.carousel-item.active img').getAttribute('src');
  await page.waitForTimeout(6000);
  const secondSlide = await page.locator('.carousel-item.active img').getAttribute('src');
  expect(secondSlide).not.toBe(firstSlide);
});

test('User can navigate through products using Next and Previous buttons in home page', async ({page}) => {
  await page.waitForSelector('.card-title a');
  
  const firstPageProducts = await page.locator('.card-title a').allTextContents();

  // 1. Click "Next" button for pagination
  await page.locator('#next2').click();

  await page.waitForTimeout(1000);

  // 2. Products are not same like in first page products
  const secondPageProducts = await page.locator('.card-title a').allTextContents();
  expect(secondPageProducts).not.toEqual(firstPageProducts);

  // 3. Click "Previous" button for pagination
  await page.locator('#prev2').click();
  await page.waitForTimeout(1000);
  const returnedProducts = await page.locator('.card-title a').allTextContents();

  // 4. Returning back to first page
  expect(returnedProducts).toEqual(firstPageProducts);
});

test('User can close modals (Login, Sign up, About us, Place Order)', async ({page}) => {
  // 1. Click on "Log in" in navbar
  await page.locator('#login2').click();
  
  // 2. Click "X" icon on the top-right corner of the modal
  await page.locator('#logInModal .modal-header button').click();

  await expect(page.locator('#logInModal .modal-content')).not.toBeVisible();

  // 3. Click on "Log in" in navbar
  await page.locator('#login2').click();

  // 4. Click "Close" button in login modal
  await page.locator('#logInModal .modal-footer button').first().click();

  await expect(page.locator('#logInModal .modal-content')).not.toBeVisible();

  // 5. Click on "Sign up" in navbar
  await page.locator('#signin2').click();

  // 6. Click "X" icon on the top-right corner of the modal
  await page.locator('#signInModal .modal-header button').click();

  await expect(page.locator('#signInModal .modal-content')).not.toBeVisible();

  // 5. Click on "Sign up" in navbar
  await page.locator('#signin2').click();

  // 7. Click "Close" button in sign in modal
  await page.locator('#signInModal .modal-footer button').first().click();

  await expect(page.locator('#signInModal .modal-content')).not.toBeVisible();

  // 8. Click on "About us" in navbar
  await page.getByRole('link', { name: 'About us' }).click();

  // 9. Click "X" icon on the top-right corner of the modal
  await page.locator('#videoModal .modal-header button').click();

  await expect(page.locator('#videoModal .modal-content')).not.toBeVisible();

  // 10. Click on "Cart" in navbar
  await page.getByRole('link', { name: 'Cart' }).click();

  // 11. Click on "Place Order" in navbar
  await page.getByRole('button', { name: 'Place Order' }).click();

  // 12. Click "X" icon on the top-right corner of the modal
  await page.locator('#orderModal .modal-header button').click();

  await expect(page.locator('#orderModal .modal-content')).not.toBeVisible();

  // 13. Click on "Place Order" in navbar
  await page.getByRole('button', { name: 'Place Order' }).click();

  // 14. Click "Close" button in order modal
  await page.locator('#orderModal .modal-footer button').first().click();

  await expect(page.locator('#orderModal .modal-content')).not.toBeVisible();
});