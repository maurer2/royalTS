import puppeteer from "puppeteer";
import type { RawElement } from "../types";

export async function extractElements(url: string): Promise<RawElement[]> {
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

    const entriesGrouped = nameElements.flatMap((nameElement, index, collection) => {
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

      const key = childElements[start].textContent || "";
      const values = childElements
        // extract elements that belong to current person
        .slice(start, end)
        // remove image and empty tags
        .filter((child) => {
          const isTextElement = child.classList.contains("body-text");
          const isNotEmpty = child.textContent !== null && child.textContent.length !== 0;

          return [isTextElement, isNotEmpty].every((check) => Boolean(check));
        })
        // extract inner text
        .map((child) => child.textContent || "");

      const rawElement: RawElement = {
        key,
        values,
      };

      return [rawElement];
    });

    return entriesGrouped;
  });

  await browser.close();

  return entries;
}
