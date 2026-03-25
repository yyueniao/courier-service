import { offers } from "../../data.js";
import { Package } from "../../models.js";
import { getRawDeliveryCost } from "./getRawDeliveryCost.js";

export const getDiscountAmount = (
  baseDeliveryCost: number,
  packageInfo: Package,
): number => {
  const offer = offers.find((o) => o.id === packageInfo.offerCode);

  if (!offer) {
    return 0;
  }

  const isReachMinWeight =
    offer.minWeight === null ? true : packageInfo.weight >= offer.minWeight;
  const isReachMaxWeight =
    offer.maxWeight === null ? true : packageInfo.weight <= offer.maxWeight;
  const isReachMaxDistance =
    offer.maxDistance === null
      ? true
      : packageInfo.distance <= offer.maxDistance;
  const isReachMinDistance =
    offer.minDistance === null
      ? true
      : packageInfo.distance >= offer.minDistance;

  if (
    !(
      isReachMinWeight &&
      isReachMaxWeight &&
      isReachMinDistance &&
      isReachMaxDistance
    )
  ) {
    return 0;
  }

  if (offer.type === "amount") {
    return offer.value;
  }

  const rawCost = getRawDeliveryCost(baseDeliveryCost, packageInfo);
  const discount = (rawCost * offer.value) / 100;
  return discount;
};
