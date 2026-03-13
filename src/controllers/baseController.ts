import { stdin, stdout } from "node:process";
import * as readline from "node:readline/promises";
import { askForInput, parsePositiveIntSafely } from "../utils.js";
import { Package } from "../models.js";

export const baseController = (
  controller: (
    rl: readline.Interface,
    baseDeliveryCost: number,
    packages: Package[],
  ) => Promise<void>,
) => {
  return async (
    baseDeliveryCostInString: string,
    numberOfParcelsInString: string,
  ) => {
    try {
      const baseDeliveryCost = parsePositiveIntSafely(
        baseDeliveryCostInString,
        "base delivery cost",
      );
      const numberOfParcels = parsePositiveIntSafely(
        numberOfParcelsInString,
        "number of parcels",
      );

      const rl = readline.createInterface({ input: stdin, output: stdout });
      const packages: Package[] = [];

      console.log(`--- Starting Input for ${numberOfParcels} Packages ---`);

      for (let i = 0; i < numberOfParcels; i++) {
        const [id, weight, distance, offerCode] = await askForInput(
          rl,
          `Please input package ${i + 1} Info:\n`,
          4,
        );

        packages.push({
          index: i,
          id,
          weight: parsePositiveIntSafely(weight, "package weight"),
          distance: parsePositiveIntSafely(distance, "delivery distance"),
          offerCode,
        });
      }

      await controller(rl, baseDeliveryCost, packages);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("❌ " + error.message);
      } else {
        console.error("❌ Unknown Error:\n");
        console.log(error);
      }
      process.exit(1);
    }
  };
};
