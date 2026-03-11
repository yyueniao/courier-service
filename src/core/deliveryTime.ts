import { Package, Trip } from "../models.js";

export const getDeliveryTrip = (speed: number, packages: Package[]): Trip => {
  const sortedPackages = packages.sort(
    (package1, package2) => package1.distance - package2.distance,
  );

  return {
    routes: sortedPackages.map(({ id, distance }) => ({
      packageId: id,
      time: Math.floor((distance / speed) * 100) / 100,
    })),
    time:
      (2 *
        Math.floor(
          (sortedPackages[sortedPackages.length - 1].distance / speed) * 100,
        )) /
      100,
  };
};
