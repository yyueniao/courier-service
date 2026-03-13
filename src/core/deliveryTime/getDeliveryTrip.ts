import { Package, Trip } from "../../models.js";
import { floor } from "../../utils.js";

export const getDeliveryTrip = (
  speed: number,
  packages: Package[],
  currentTime: number,
): Trip => {
  const sortedPackages = packages.sort(
    (package1, package2) => package1.distance - package2.distance,
  );

  return {
    routes: sortedPackages.map((packageInfo) => ({
      packageInfo,
      time: floor(packageInfo.distance / speed + currentTime, 2),
    })),
    time:
      2 * floor(sortedPackages[sortedPackages.length - 1].distance / speed, 2) +
      currentTime,
  };
};
