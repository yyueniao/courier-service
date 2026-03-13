import { Package, Shipment } from "./models.js";

export const parsePositiveIntSafely = (str: string, name: string): number => {
  const num = parseInt(str, 10);

  if (isNaN(num) || num <= 0) {
    console.error(`Error: Please provide a valid ${name}.`);
    process.exit(1);
  }

  return num;
};

export const floor = (num: number, precision: number): number => {
  return Number(Math.floor(Number(num + "e" + precision)) + "e-" + precision);
};

export const round = (num: number, precision: number): number => {
  return Number(Math.round(Number(num + "e" + precision)) + "e-" + precision);
};

export const packagesToShipment = (packages: Package[]): Shipment => {
  const [totalDistance, totalWeight] = packages.reduce(
    (prevState, currentPackage) =>
      [
        Math.max(prevState[0], currentPackage.distance),
        prevState[1] + currentPackage.weight,
      ] as const,
    [0, 0],
  );

  return { packages, totalDistance, totalWeight };
};
