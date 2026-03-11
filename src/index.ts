import { program } from "commander";
import { deliveryCostController } from "./controllers/deliveryCost.js";

program
  .name("courier-service")
  .description(
    "This is a study purpose project. We have two commands: `delivery-cost` and `delivery-time`.",
  )
  .version("1.0.0");

program
  .command("delivery-cost <baseDeliveryCost> <numberOfPackages>")
  .description(
    "Estimate the total delivery cost of each package with an offer code (if applicable).",
  )
  .action(deliveryCostController);

program.parse(process.argv);
