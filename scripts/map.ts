import { pipe } from "fp-ts/function";
import type { RawElement } from "../types";

function mapName(name: string): string {
  return name.trim();
}

export async function mapEntries(elements: RawElement[]): Promise<void> {
  const [firstEntry] = elements;

  const name = pipe(
    firstEntry,
    (entry) => entry.values,
    (values) => values[0],
    (value) => value.match(/: (.*)/),
    (results) => (results === null ? "" : results[1])
  );

  console.log(name);
}
