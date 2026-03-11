import { getDeliveryCost, getOfferPercentage } from "./deliveryCost.js";
import { GetDeliveryCostDto, Package } from "./models.js";

export default {
  getDeliveryCost: (
    baseDeliveryCost: number,
    packageInfo: Package,
  ): GetDeliveryCostDto => {
    const deliveryCost = getDeliveryCost(baseDeliveryCost, packageInfo);
    const offerPercentage = getOfferPercentage(packageInfo);
    const discount = (deliveryCost * offerPercentage) / 100;
    return {
      id: packageInfo.id,
      discount: discount,
      totalDeliveryCost: deliveryCost - discount,
    };
  },
};
