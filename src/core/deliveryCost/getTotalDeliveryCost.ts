import { Package } from "../../models.js";
import { getRawDeliveryCost } from "./getRawDeliveryCost.js";
import { getOfferPercentage } from "./getOfferPercentage.js";

export const getTotalDeliveryCost = (
  baseDeliveryCost: number,
  packageInfo: Package,
): {
  discount: number;
  totalDeliveryCost: number;
} => {
  const deliveryCost = getRawDeliveryCost(baseDeliveryCost, packageInfo);
  const offerPercentage = getOfferPercentage(packageInfo);
  const discount = (deliveryCost * offerPercentage) / 100;
  return {
    discount,
    totalDeliveryCost: deliveryCost - discount,
  };
};
