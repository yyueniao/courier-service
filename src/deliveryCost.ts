import { Package } from "./models.js";

export const getDeliveryCost = (
  baseDeliveryCost: number,
  packageInfo: Package,
): number => {
  const { weight, distance } = packageInfo;
  return baseDeliveryCost + weight * 10 + distance * 5;
};

export const getOfferDiscount = (packageInfo: Package): number => {
  console.log(packageInfo);
  return 0;
};
