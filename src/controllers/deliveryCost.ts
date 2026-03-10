import { stdin, stdout } from "node:process";
import * as readline from "node:readline/promises";

export const deliveryCostController = async (
  numberOfParcelsInString: string,
) => {
  const numberOfParcels = parseInt(numberOfParcelsInString, 10);

  if (isNaN(numberOfParcels) || numberOfParcels <= 0) {
    console.error("Error: Please provide a valid number of packages.");
    process.exit(1);
  }

  const rl = readline.createInterface({ input: stdin, output: stdout });
  const packages: string[] = [];

  console.log(`--- Starting Input for ${numberOfParcels} Packages ---`);

  for (let i = 1; i <= numberOfParcels; i++) {
    const answer = await rl.question(`Please input Package ${i}:\n`);
    packages.push(answer.trim());
  }

  rl.close();

  console.log("\n--- All Data Collected ---");
  console.log(packages);
};
