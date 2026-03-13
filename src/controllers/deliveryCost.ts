import { stdin, stdout } from "node:process";
import * as readline from "node:readline/promises";
import { Package } from "../models.js";
import { askForInput, parsePositiveIntSafely } from "../utils.js";
import services from "../services.js";

export const deliveryCostController = async (
  baseDeliveryCostInString: string,
  numberOfParcelsInString: string,
) => {
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

  rl.close();

  console.log("\n--- Delivery Cost ---");
  packages.forEach((packageInfo) => {
    const deliveryCostdto = services.getDeliveryCost(
      baseDeliveryCost,
      packageInfo,
    );
    console.log(
      `${deliveryCostdto.id} ${deliveryCostdto.discount} ${deliveryCostdto.totalDeliveryCost}`,
    );
  });
};
