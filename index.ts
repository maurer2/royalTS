import dotenv from "dotenv";

import { extractElements } from "./scripts/extract";

dotenv.config();

const url = <string>process.env.URL;

(async () => {
  const elements = await extractElements(url);

  elements.forEach((element) => {
    console.log(element);
    // console.log(element.elements[0].textContent);
  });
})();
