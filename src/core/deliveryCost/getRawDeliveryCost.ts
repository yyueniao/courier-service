import { Package } from "../../models.js";

export const getRawDeliveryCost = (
  baseDeliveryCost: number,
  packageInfo: Package,
): number => {
  const { weight, distance } = packageInfo;
  return baseDeliveryCost + weight * 10 + distance * 5;
};
