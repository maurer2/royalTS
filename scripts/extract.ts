import puppeteer from "puppeteer";
import type { RoyalRaw, Royal } from "../types";

export async function extractElements(url: string): Promise<Royal["name"][]> {
  const browser = await puppeteer.launch({ dumpio: true });
  const page = await browser.newPage();

  await page.goto(url);
  await page.waitForSelector(".article-body-content");

  const entries = await page.evaluate(() => {
    // start of each person block
    const nameElements = [...document.querySelectorAll(".article-body-content .body-h3")];
    const elementAfterList = document.querySelector(
      ".article-body-content .body-h3 ~ .embed-editorial-links"
    );

    if (!nameElements.length || elementAfterList === null) {
      // throw Error('Headlines or last element not found');
      return [];
    }

    const lastElementInList = elementAfterList.previousElementSibling;

    if (lastElementInList === null) {
      return [];
    }

    const numberOfPeople = nameElements.length;

    const entriesGroupedByPerson = nameElements.flatMap((nameElement, index, collection) => {
      const isLastIteration = index === numberOfPeople - 1;
      const nextElement = isLastIteration ? lastElementInList : collection[index + 1];

      const { parentElement } = nameElement;

      // https://stackoverflow.com/questions/65050515/in-which-cases-will-element-parentelement-or-element-parentnode-be-null-in-a-htm
      if (parentElement === null) {
        return [];
      }

      const childElements = [...parentElement.children];

      const start = childElements.findIndex((child) => child === nameElement);
      const end = childElements.findIndex((child) => child === nextElement);

      if (start === -1 || end === -1) {
        return [];
      }

      console.log(childElements[start].textContent, start, end);

      const children = childElements.slice(start, end);

      // children.forEach((child) => {
      // console.log(child.textContent)
      // });

      return children;
    });

    const names = nameElements.flatMap(({ textContent }) =>
      textContent !== null ? textContent : []
    );

    return names;
  });

  await browser.close();

  return entries;
}
