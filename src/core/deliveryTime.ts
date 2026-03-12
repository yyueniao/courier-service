import { Package, Trip } from "../models.js";
import { roundDownToTwoDigits } from "../utils.js";

export const getDeliveryTrip = (speed: number, packages: Package[]): Trip => {
  const sortedPackages = packages.sort(
    (package1, package2) => package1.distance - package2.distance,
  );

  return {
    routes: sortedPackages.map((packageInfo) => ({
      packageInfo,
      time: roundDownToTwoDigits(packageInfo.distance / speed),
    })),
    time:
      2 *
      roundDownToTwoDigits(
        sortedPackages[sortedPackages.length - 1].distance / speed,
      ),
  };
};

export const getTotalWeight = (packages: Package[]): number => {
  let sum = 0;
  packages.forEach((packageInfo) => {
    sum += packageInfo.weight;
  });
  return sum;
};
