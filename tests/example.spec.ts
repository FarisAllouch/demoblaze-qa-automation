import { test, expect } from '@playwright/test';

//UI TESTS
/*
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
*/