import dotenv from "dotenv";
import path from "path";

import { getElements } from "./scripts/extract";
import { exportJSON } from "./scripts/export";

dotenv.config();

const url = process.env.URL as string;
const filepath = path.join(__dirname, "dist", "royals.json");

(async () => {
  try {
    const elements = await getElements(url);

    elements.forEach((element) => {
      console.log(element);
      // console.log(element.elements[0].textContent);
    });

    const elementsStringified = JSON.stringify(elements, null, 4);

    exportJSON(filepath, elementsStringified);
  } catch (error) {
    console.log(error);
  }
})();
