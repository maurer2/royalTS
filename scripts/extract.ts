import puppeteer from 'puppeteer';
import type {RoyalRaw} from '../types';

export async function extractStrings(url: string): Promise<string[]> {
  const browser = await puppeteer.launch({dumpio: true});
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForSelector('.article-body-content');

  const entries = await page.evaluate(() => {
    const nameElements = [...document.querySelectorAll('.article-body-content .body-h3')]

    if (!nameElements.length) {
      return [];
    }

    const royals = nameElements.map((nameElement) => {
      // const title = nameElement.textContent || '';
      const parentElement = nameElement.parentElement

      if (parentElement === null) {
        return
      }

      const childElements = [...parentElement.children]
      const startIndex = childElements.findIndex((child) => child === nameElement)
      const endIndex = startIndex + 1 // temp

      const children = childElements.slice(startIndex, endIndex);

      console.log(startIndex, endIndex)
      children.forEach((child) => {
        console.log(child.textContent)
      })
    })

    const names = nameElements.flatMap(({textContent}) => textContent !== null ? [textContent] : []);

    return names;
  });

  await browser.close();

  return entries;
}