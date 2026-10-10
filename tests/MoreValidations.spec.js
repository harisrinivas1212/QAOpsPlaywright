const {test, expect} = require('@playwright/test');

test('Popup Validations', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://google.com');
    // await page.goBack();
    // await page.goForward();
    // await page.goBack();
    // await page.reload();

    expect(await page.locator(".displayed-class").isVisible()).toBe(true);
    await page.locator("#hide-textbox").click();
    expect(await page.locator(".displayed-class").isHidden()).toBe(true);
    
    //below line will accept the dialog box whenever it appears
    page.on('dialog', dialog => dialog.accept());

    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();

    // frame concept 
    const frame = page.frameLocator("#courses-iframe");
    await frame.locator("li a[href*='lifetime-access']:visible").click();
    const textContent = await frame.locator(".text h2").textContent();
    console.log(textContent.split(" ")[1]);

})

