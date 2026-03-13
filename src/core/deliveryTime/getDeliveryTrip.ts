import { Package, Trip } from "../../models.js";
import { floor, round } from "../../utils.js";

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
      time: round(floor(packageInfo.distance / speed, 2) + currentTime, 2),
    })),
    time: round(
      2 * floor(sortedPackages[sortedPackages.length - 1].distance / speed, 2) +
        currentTime,
      2,
    ),
  };
};
