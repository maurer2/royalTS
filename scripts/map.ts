import { pipe } from "fp-ts/function";
import type { RawElement } from "../types";

import royalsJSON from "../dist/royals.json";

const royals: RawElement[] = royalsJSON;

// function mapName(name: string): string {
//   return name.trim();
// }

export async function mapEntries(): Promise<void> {
  const [firstEntry] = royals;

  const name = pipe(
    firstEntry,
    (entry) => entry.values,
    (values) => values[0],
    (value) => value.match(/: (.*)/),
    (results) => (results === null ? "" : results[1])
  );

  console.log(name);
}
