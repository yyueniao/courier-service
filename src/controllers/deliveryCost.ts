import readline from "node:readline/promises";
import { Package } from "../models.js";
import services from "../services.js";

export const deliveryCostController = async (
  rl: readline.Interface,
  baseDeliveryCost: number,
  packages: Package[],
) => {
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
