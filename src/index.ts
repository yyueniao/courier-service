import { program } from "commander";

program
  .name("courier-service")
  .description(
    "This is a study purpose project. We have two commands: `delivery-cost` and `delivery-time`.",
  )
  .version("1.0.0");

program
  .command("delivery-cost")
  .description(
    "Estimate the total delivery cost of each package with an offer code (if applicable).",
  )
  .action(() => {
    console.log(100);
  });

program.parse();
