import puppeteer, { Browser, Page } from "puppeteer";
import type { RawElement } from "../types";

async function getPage(url: string, browser: Browser): Promise<Page> {
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });
  await page.goto(url);
  await page.waitForSelector(".article-body-content");

  return page;
}

async function getEntries(page: Page): Promise<RawElement[]> {
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

    const entriesGrouped = nameElements.flatMap((nameElement, index) => {
      const isLastIteration = index === nameElements.length - 1;
      const nextElement = isLastIteration ? lastElementInList : nameElements[index + 1];

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
          const isNotEmpty = child.textContent?.length !== 0;

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

  return entries;
}

export async function getElements(url: string): Promise<RawElement[]> {
  let browser;
  try {
    browser = await puppeteer.launch({ dumpio: true });

    let page;
    try {
      page = await getPage(url, browser);
    } catch (error) {
      throw new Error(error as string);
    }

    let entries;
    try {
      entries = await getEntries(page);
    } catch (error) {
      throw new Error(error as string);
    }

    await browser.close();

    return entries;
  } catch (error) {
    throw new Error(error as string);
  }
}
