const {test, expect} = require('@playwright/test');

test('Screenshot Validations', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://google.com');
    // await page.goBack();
    // await page.goForward();
    // await page.goBack();
    // await page.reload();

    expect(await page.locator(".displayed-class").isVisible()).toBe(true);
    //To capture screenshot of specific element
    await page.locator("#hide-textbox").screenshot({ path: 'hide-textbox.png' });
    await page.locator("#hide-textbox").click();
    //To capture screenshot page level
    await page.screenshot({ path: 'screenshot.png' });
})


test.only('Visual testing Validations', async ({ page }) => {

    await page.goto('https://google.com');
    
    expect(await page.screenshot()).toMatchSnapshot('landingpage.png');

})