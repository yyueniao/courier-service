import { program } from "commander";
import { deliveryCostController } from "./controllers/deliveryCost.js";
import { deliveryTimeController } from "./controllers/deliveryTime.js";

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

program
  .command("delivery-time <baseDeliveryCost> <numberOfPackages>")
  .description(
    "calculate the estimated delivery time for every package by maximizing no. of packages in every shipment.",
  )
  .action(deliveryTimeController);

program.parse(process.argv);
