const { test } = require('@playwright/test');
const { expect } = require('@playwright/test');


test.only('UI Basic Test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const username = page.locator('#username');
    const password = page.locator('[type="password"]');
    const signIn = page.locator('#signInBtn');



    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());

    await username.type('rahulshetty');
    await password.type('Learning@830$3mK2');
    await signIn.click();
    console.log(await page.locator('[style*= "block"]').textContent());
    await expect(page.locator('[style*= "block"]')).toContainText('Incorrect');

    await username.fill('');
    await username.fill('rahulshettyacademy');
    await signIn.click();
    console.log(await page.locator('.card-body a').first().textContent());
    console.log(await page.locator('.card-body a').last().textContent());

    // await page.locator('.card-body a').waitforloadstate('networkidle');
    await page.locator('.card-body a').waitFor();
    const alltitles = await page.locator('.card-body a').allTextContents;
    console.log(alltitles);

});

test('UI Basic Test 2', async ({ page }) => {
    await page.goto('https://google.com/');
    await expect(page).toHaveTitle("Google");


});

test.only('UI Basic Test 3', async ({ page }) => {

    const username = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const documentlink = page.locator('[href*="documents-request"]');
    const dropdown = page.locator('select.form-control');
    const radiobuttons = page.locator('.radiotextsty');
    const terms = page.locator('#terms');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());

    //Click radio button and select option from dropdown and verify using assertion
    await dropdown.selectOption('consult');
    await radiobuttons.last().click();
    await page.locator('#okayBtn').click();
    await expect(radiobuttons.last()).toBeChecked();

    await terms.click();
    await expect(terms).toBeChecked();
    await terms.uncheck();
    await expect(terms).not.toBeChecked();
    expect(await terms.isChecked()).toBeFalsy();

    await expect(documentlink).toHaveAttribute('class', 'blinkingText');

    // Handle child window
    const [newPage] = await Promise.all([
        page.waitForEvent('page'),
        documentlink.click()
    ]);
    await newPage.waitForLoadState();
    console.log(await newPage.locator('.red').textContent());
    const text = await newPage.locator('.red').textContent();
    const arraytext = text.split('@');
    const domain = arraytext[1].split(' ')[0];
    console.log(domain);
    await page.username.fill(domain);
    await page.pause();
    console.log(await page.username.textContent());


});

test('Client App Login', async ({ page }) => {

    const username = page.locator('#username');
    const password = page.locator('[type="password"]');
    const signIn = page.locator('#signInBtn');



    await page.goto('https://rahulshettyacademy.com/client/');
    console.log(await page.title());

    await username.type('rahulshetty');
    await password.type('Learning@830$3mK2');
    await signIn.click();
});

test('Playwright Special Locators', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    console.log(await page.title());
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel('Employed').check();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByPlaceholder('password').fill('abc@1234');
    await page.getByRole('button', { name: 'Submit' }).click();

    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();

    await page.getByRole('link', { name: 'shop' }).click();
    await page.locator('app-card').filter({ hasText: 'Blackberry' }).locator('text= Add').click();
});

test('Playwright Timeouts', async ({ page }) => {
    // test level timeout
    test.setTimeout(30000);

    // expect assertion test level timeout
    const texpect = expect.configure({ timeout: 5000 });
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    console.log(await page.title());
    await page.getByLabel("Check me out if you Love IceCreams!").click({ timeout: 5000 }); // step level timeout
    await page.getByLabel('Employed').check();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByPlaceholder('password').fill('abc@1234');
    await page.getByRole('button', { name: 'Submit' }).click();

    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();


    await texpect(page.getByText('Success! The Form has been submitted successfully!.').toBeVisible({ timeout: 5000 }));
    await page.getByRole('link', { name: 'shop' }).click();
    await page.locator('app-card').filter({ hasText: 'Blackberry' }).locator('text= Add').click();
});