import { offers } from "../data.js";
import { Package } from "../models.js";

export const getDeliveryCost = (
  baseDeliveryCost: number,
  packageInfo: Package,
): number => {
  const { weight, distance } = packageInfo;
  return baseDeliveryCost + weight * 10 + distance * 5;
};

export const getOfferPercentage = (packageInfo: Package): number => {
  const offer = offers.find((o) => o.id === packageInfo.offerCode);

  if (!offer) {
    return 0;
  }

  const isWeightValid =
    packageInfo.weight >= offer.minWeight &&
    packageInfo.weight <= offer.maxWeight;

  const isDistanceValid =
    packageInfo.distance >= offer.minDistance &&
    packageInfo.distance <= offer.maxDistance;

  if (isWeightValid && isDistanceValid) {
    return offer.percentage;
  }

  return 0;
};
