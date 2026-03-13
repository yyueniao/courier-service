import { stdin, stdout } from "node:process";
import * as readline from "node:readline/promises";
import { Package } from "../models.js";
import { parsePositiveIntSafely } from "../utils.js";
import services from "../services.js";

export const deliveryTimeController = async (
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
    const packageInfo = await rl.question(
      `Please input package ${i + 1} Info:\n`,
    );
    const [id, weight, distance, offerCode] = packageInfo.split(" ");
    packages.push({
      index: i,
      id,
      weight: parsePositiveIntSafely(weight, "package weight"),
      distance: parsePositiveIntSafely(distance, "delivery distance"),
      offerCode,
    });
  }

  const vehicleInfo = await rl.question(
    `Please input vehicle information: (<no_of_vehicles> <max_speed> <max_carriable_weight>)\n`,
  );
  const [
    numberOfVehiclesInString,
    maxSpeedInString,
    maxCarriableWeightInString,
  ] = vehicleInfo.split(" ");
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
