import dotenv from "dotenv";
import path from "path";

import { getElements } from "./scripts/extract";
import { exportJSON } from "./scripts/export";
// import { mapEntries } from "./scripts/map";

dotenv.config();

const url: string | undefined = process.env.URL;
const filepath: string = path.join(__dirname, "dist", "royals_unparsed.json");

const patchNotes: Record<string, string> = {
  "His Royal Highness the Prince of Wales": "His Royal Highness King Charles III",
};

(async () => {
  try {
    if (!url) {
      throw new Error(".env file missing");
    }

    const elements = await getElements(url);
    const elementsStringified = JSON.stringify(elements, null, 4);
    // mapEntries();

    // patch
    const elementsStringifiedPatched: string = Object.entries(patchNotes)
      .map(([key, value]) => elementsStringified.replaceAll(key, value))
      .join("");

    exportJSON(filepath, elementsStringifiedPatched);
  } catch (error) {
    console.log(error);
  }
})();
