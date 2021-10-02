import dotenv from "dotenv";

import { extractElements } from "./scripts/extract";

dotenv.config();

const url = <string>process.env.URL;

(async () => {
  const names = await extractElements(url);

  console.log(names);
})();
