import * as readline from "node:readline/promises";
import { Package } from "../models.js";
import { askForInput, parsePositiveIntSafely } from "../utils.js";
import services from "../services.js";

export const deliveryTimeController = async (
  rl: readline.Interface,
  baseDeliveryCost: number,
  packages: Package[],
) => {
  const [
    numberOfVehiclesInString,
    maxSpeedInString,
    maxCarriableWeightInString,
  ] = await askForInput(
    rl,
    `Please input vehicle information: (<no_of_vehicles> <max_speed> <max_carriable_weight>)\n`,
    3,
  );

  const numberOfVehicles = parsePositiveIntSafely(
    numberOfVehiclesInString,
    "number of parcels",
  );
  const maxSpeed = parsePositiveIntSafely(
    maxSpeedInString,
    "number of parcels",
  );
  const maxCarriableWeight = parsePositiveIntSafely(
    maxCarriableWeightInString,
    "number of parcels",
  );

  rl.close();

  console.log("\n--- Delivery Time ---");
  const deliveryTimeDtos = services.getDeliveryTime({
    baseDeliveryCost,
    packages,
    vehicleInfo: { numberOfVehicles, maxSpeed, maxCarriableWeight },
  });
  deliveryTimeDtos.forEach((deliveryTimeDto) => {
    console.log(
      `${deliveryTimeDto.id} ${deliveryTimeDto.discount} ${deliveryTimeDto.totalDeliveryCost} ${deliveryTimeDto.time}`,
    );
  });
};
