import puppeteer from 'puppeteer';
import type {RoyalRaw, Royal} from '../types';

export async function extractStrings(url: string): Promise<Royal['name'][]> {
  const browser = await puppeteer.launch({dumpio: true});
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForSelector('.article-body-content');

  const entries = await page.evaluate(() => {
    const nameElements = [...document.querySelectorAll('.article-body-content .body-h3')]
    const elementAfterList = document.querySelector('.article-body-content .body-h3 ~ .embed-editorial-links')

    if (!nameElements.length || elementAfterList === null) {
      // throw Error('Headlines or last element not found');
      return [];
    }

    const royals = nameElements.flatMap((nameElement, index, collection) => {
      const isLastElement = collection.length - 1 === index

      // const title = nameElement.textContent || '';
      const parentElement = nameElement.parentElement

      if (parentElement === null) {
        return []
      }

      const childElements = [...parentElement.children]

      const start = childElements.findIndex((child) => child === nameElement)
      const end = isLastElement
        ? childElements.findIndex((child) => child === elementAfterList.previousElementSibling)
        : childElements.findIndex((child) => child === collection[index + 1])

      console.log(childElements[start].textContent, start, end)

      const children = childElements.slice(start, end);

      children.forEach((child) => {
        // console.log(child.textContent)
      })

      return children
    })

    const names = nameElements.flatMap(({textContent}) => textContent !== null ? textContent : []);

    return names;
  });

  await browser.close();

  return entries;
}