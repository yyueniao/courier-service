import { Package, Shipment } from "../../models.js";
import { packagesToShipment } from "../../utils.js";

const getPossibleShipments = (
  maxCarriableWeight: number,
  maxCarribleNumber: number,
  sortedPackages: Package[],
): Shipment[] => {
  const possibleShipment: Shipment[] = [];

  const backtrack = (start: number, shipment: Shipment): void => {
    if (shipment.packages.length === maxCarribleNumber) {
      possibleShipment.push({
        packages: [...shipment.packages],
        totalWeight: shipment.totalWeight,
        totalDistance: shipment.totalDistance,
      });
    }

    for (let i = start; i < sortedPackages.length; i++) {
      const newWeight = shipment.totalWeight + sortedPackages[i].weight;
      const currentDistance = shipment.totalDistance;

      if (newWeight > maxCarriableWeight) {
        break;
      }

      shipment.packages.push(sortedPackages[i]);
      shipment.totalWeight += sortedPackages[i].weight;
      shipment.totalDistance = Math.max(
        currentDistance,
        sortedPackages[i].distance,
      );

      backtrack(i + 1, shipment);

      shipment.packages.pop();
      shipment.totalWeight -= sortedPackages[i].weight;
      shipment.totalDistance = currentDistance;
    }
  };

  backtrack(0, { packages: [], totalWeight: 0, totalDistance: 0 });
  return possibleShipment;
};

export const getBestShipment = (
  maxCarriableWeight: number,
  packages: Package[],
): Shipment => {
  const sortedPackages = packages.sort(
    (package1, package2) => package1.weight - package2.weight,
  );
  let sum = 0;
  let maxCarribleNumber: number = 0;

  for (let i = 0; i < sortedPackages.length; i++) {
    sum += sortedPackages[i].weight;
    if (sum > maxCarriableWeight) {
      maxCarribleNumber = i;
      break;
    }
  }

  if (!maxCarribleNumber) {
    return packagesToShipment(packages);
  }

  const possibleShipments = getPossibleShipments(
    maxCarriableWeight,
    maxCarribleNumber,
    sortedPackages,
  );

  const maxWeight = possibleShipments.reduce(
    (previousMaxWeight, currentShipment) => {
      return Math.max(previousMaxWeight, currentShipment.totalWeight);
    },
    0,
  );

  const possibleShipmentsWithMaxWeight = possibleShipments.filter(
    (shipment) => shipment.totalWeight === maxWeight,
  );

  let minDistance = Infinity;
  let minDistanceIndex = -1;
  for (let i = 0; i < possibleShipmentsWithMaxWeight.length; i++) {
    const shipmentDistance = possibleShipmentsWithMaxWeight[i].totalDistance;
    if (shipmentDistance < minDistance) {
      minDistance = shipmentDistance;
      minDistanceIndex = i;
    }
  }

  return possibleShipmentsWithMaxWeight[minDistanceIndex];
};
