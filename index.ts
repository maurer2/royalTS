import dotenv from "dotenv";

import { getElements } from "./scripts/extract";

dotenv.config();

const url = process.env.URL as string;

(async () => {
  try {
    const elements = await getElements(url);

    elements.forEach((element) => {
      console.log(element);
      // console.log(element.elements[0].textContent);
    });
  } catch (error) {
    console.log(error);
  }
})();
