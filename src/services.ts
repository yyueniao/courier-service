import { getDeliveryCost } from "./deliveryCost.js";
import { GetDeliveryCostDto, Package } from "./models.js";

export default {
  getDeliveryCost: (
    baseDeliveryCost: number,
    packageInfo: Package,
  ): GetDeliveryCostDto => {
    return {
      id: packageInfo.id,
      discount: 0,
      totalDeliveryCost: getDeliveryCost(baseDeliveryCost, packageInfo),
    };
  },
};
