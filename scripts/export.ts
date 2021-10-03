import { promises as fs } from "fs";

export async function exportJSON(filepath: string, payload: unknown): Promise<void> {
  try {
    if (typeof payload !== "string") {
      throw new Error("Payload type is not string");
    }

    // const jsonStringified = JSON.stringify(payload);

    await fs.writeFile(filepath, payload, "utf8");
  } catch (error) {
    console.log(error);

    throw new Error(error as string);
  }
}
