import { pipe } from "fp-ts/function";
import * as O from "fp-ts/lib/Option";

import type { RawElement } from "../types";

import royalsJSON from "../dist/royals.json";

const royals: RawElement[] = royalsJSON;

const values = (element: RawElement) => {
  return element.values;
};

const fullName = (valuesParam: RawElement["values"]) => {
  return valuesParam[0];
};

export async function mapEntries(): Promise<void> {
  const [firstEntry] = royals;

  // const [firstEntryTest] = royals[555];

  // const names = pipe(royals, Array.map(square));

  const name = pipe(
    O.fromNullable(firstEntry),
    O.map(values),
    O.map(fullName),
    // O.chain(values),
    // O.chain(fullName),
    O.getOrElse(() => "")
  );

  // const name = pipe(
  //   firstEntry,
  //   (entry) => entry.values,
  //   (values) => values[0],
  //   (value) => value.match(/: (.*)/),
  //   (results) => (results === null ? "" : results[1])
  // );

  console.log(name);
}
