import puppeteer from 'puppeteer';

export async function extractStrings(url: string): Promise<string[]> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForSelector('.body-h3');

  const namesList = await page.evaluate(() => {
    const nameElements = [...document.querySelectorAll('.body-h3')]

    if (!nameElements.length) {
      return [];
    }

    const names = nameElements.flatMap(({textContent}) => textContent !== null ? [textContent] : []);

    return names;
  });

  await browser.close();

  return namesList;
}