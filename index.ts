import puppeteer from 'puppeteer';
import dotenv from 'dotenv'
dotenv.config()

const url = <string>process.env.URL
console.log(url)

async function getNames() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForSelector('.body-h3');

  const names = await page.evaluate(() => {
    const nameElements = [...document.querySelectorAll('.body-h3')]

    if (!nameElements.length) {
      return []
    }

    const extractedNames = nameElements.map((nameElement) => nameElement.textContent )

    return extractedNames
  });

  console.log(names)

  await browser.close();
}

getNames()
