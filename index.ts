import dotenv from "dotenv";

import { extractStrings } from "./scripts/extract";

dotenv.config();

const url = <string>process.env.URL;

(async () => {
  const names = await extractStrings(url);

  console.log(names);
})();
