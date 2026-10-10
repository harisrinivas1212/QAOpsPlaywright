
const { test,expect } = require('@playwright/test');


async function loginHelper(page) {
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByPlaceholder('you@email.com').fill('srihariharan@gmail.com');
   await page.locator('#password').fill('Hari@1234');
  await page.locator('#login-btn').click();
 await expect(page.getByRole('link', { name: 'Browse Events'}).nth(0)).toBeVisible();
}

function futureDateValue() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString().slice(0, 16);
}
test.only('AdddEvent', async ({ page }) => {
 await loginHelper(page);
   // await page.locator("text= Admin").click();
  await page.locator('a[href="/admin/events"]').nth(0).click();
     const eventName =`Test Event ${Date.now()}`;
   await page.locator("#event-title-input").fill(eventName);
  await page.locator(" #admin-event-form textarea").fill("Event Description");
   await page.locator("#category").selectOption("Conference");
  await page.getByLabel("City").fill("Amman");
   await page.getByLabel("Venue").fill("Event Venue ");
    await page.getByLabel('Event Date & Time').fill(futureDateValue());
   await page.getByLabel('Price ($)').fill("100");
   await page.getByLabel("Total Seats").fill("50");
   await page.locator('#add-event-btn').click();
   await expect(page.getByText(" Event created!")).toBeVisible();
   await page.locator("a[href='/events']").nth(0).click();
   const eventCards=page.locator("[data-testid='event-card']");
   await expect(eventCards.nth(0)).toBeVisible();
      await expect (eventCards.filter({hasText:eventName})).toBeVisible({timeout:5000});
      const seatsBeforeBooking=Number((await eventCards.filter({hasText:eventName}).getByText("seats available").textContent()).trim().split(" ")[0]);
      await eventCards.filter({hasText:eventName}).locator('#book-now-btn').click();
      await expect (page.locator("#ticket-count")).toHaveText("1");
      await page.getByLabel("Full Name").fill(" Full Name");
      await page.locator("#customer-email").fill(" Email@email.com");
      await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 43210");
      await page.locator(".confirm-booking-btn").click();
      await expect(page.locator(".booking-ref").first().toBeVisible);
      const bookingRef=(await page.locator(".booking-ref").first().textContent()).trim();
      await page.getByRole("button",{name:"View My Bookings"}).click();
      await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/bookings');
      const bookingCards=page.locator("[data-testid='booking-card']");
      await expect (bookingCards.first()).toBeVisible();
      await expect(bookingCards.filter({hasText:bookingRef})).toBeVisible();
      await expect(bookingCards.filter({hasText:bookingRef})).toContainText(eventName);
      await page.locator("a[href='/events']").nth(0).click();
      await expect(eventCards.nth(0)).toBeVisible();
      await expect (eventCards.filter({hasText:eventName})).toBeVisible({timeout:5000});
      const seatsAfterBooking=Number((await eventCards.filter({hasText:eventName}).getByText("seats available").textContent()).trim().split(" ")[0]);
      await expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
   })