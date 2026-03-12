import { Package } from "../../models.js";
import { getDeliveryCost } from "./getDeliveryCost.js";
import { getOfferPercentage } from "./getOfferPercentage.js";

export const getTotalDeliveryCost = (
  baseDeliveryCost: number,
  packageInfo: Package,
): {
  discount: number;
  totalDeliveryCost: number;
} => {
  const deliveryCost = getDeliveryCost(baseDeliveryCost, packageInfo);
  const offerPercentage = getOfferPercentage(packageInfo);
  const discount = (deliveryCost * offerPercentage) / 100;
  return {
    discount,
    totalDeliveryCost: deliveryCost - discount,
  };
};
