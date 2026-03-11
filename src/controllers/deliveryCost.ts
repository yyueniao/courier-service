import { stdin, stdout } from "node:process";
import * as readline from "node:readline/promises";
import { Package } from "../models.js";
import { parsePositiveIntSafely } from "../utils.js";
import { getDeliveryCost } from "../deliveryCost.js";

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

  for (let i = 1; i <= numberOfParcels; i++) {
    const packageInfo = await rl.question(`Please input package ${i} Info:\n`);
    const [id, weight, distance, offerCode] = packageInfo.split(" ");
    packages.push({
      id,
      weight: parsePositiveIntSafely(weight, "package weight"),
      distance: parsePositiveIntSafely(distance, "delivery distance"),
      offerCode,
    });
  }

  rl.close();

  console.log("\n--- Delivery Cost ---");
  packages.forEach((packageInfo) => {
    const deliveryCost = getDeliveryCost(baseDeliveryCost, packageInfo);
    console.log(`${packageInfo.id} 0 ${deliveryCost}`);
  });
};
