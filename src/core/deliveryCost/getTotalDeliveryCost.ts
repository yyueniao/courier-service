import { Package } from "../../models.js";
import { getRawDeliveryCost } from "./getRawDeliveryCost.js";
import { getDiscountAmount } from "./getDiscountAmount.js";

export const getTotalDeliveryCost = (
  baseDeliveryCost: number,
  packageInfo: Package,
): {
  discount: number;
  totalDeliveryCost: number;
} => {
  const deliveryCost = getRawDeliveryCost(baseDeliveryCost, packageInfo);
  const discount = getDiscountAmount(baseDeliveryCost, packageInfo);
  return {
    discount,
    totalDeliveryCost: deliveryCost - discount,
  };
};
