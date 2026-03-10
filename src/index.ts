import { program } from "commander";
import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";

program
  .name("courier-service")
  .description(
    "This is a study purpose project. We have two commands: `delivery-cost` and `delivery-time`.",
  )
  .version("1.0.0");

program
  .command("delivery-cost <numberOfPackages>")
  .description(
    "Estimate the total delivery cost of each package with an offer code (if applicable).",
  )
  .action(async (countStr: string) => {
    const count = parseInt(countStr, 10);

    if (isNaN(count) || count <= 0) {
      console.error("Error: Please provide a valid number of packages.");
      process.exit(1);
    }

    const rl = readline.createInterface({ input, output });
    const packages: string[] = [];

    console.log(`--- Starting Input for ${count} Packages ---`);

    for (let i = 1; i <= count; i++) {
      const answer = await rl.question(`Please input Package ${i}:\n`);
      packages.push(answer.trim());
    }

    rl.close();

    console.log("\n--- All Data Collected ---");
    console.log(packages);
  });

program.parse(process.argv);
