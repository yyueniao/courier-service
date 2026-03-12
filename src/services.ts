import { getDeliveryCost, getOfferPercentage } from "./core/deliveryCost.js";
import { getDeliveryTrip } from "./core/deliveryTime.js";
import { GetDeliveryCostDto, GetDeliveryTimeDto, Package } from "./models.js";

export default {
  getDeliveryCost(
    baseDeliveryCost: number,
    packageInfo: Package,
  ): GetDeliveryCostDto {
    const deliveryCost = getDeliveryCost(baseDeliveryCost, packageInfo);
    const offerPercentage = getOfferPercentage(packageInfo);
    const discount = (deliveryCost * offerPercentage) / 100;
    return {
      id: packageInfo.id,
      discount: discount,
      totalDeliveryCost: deliveryCost - discount,
    };
  },
  getDeliveryTime(
    baseDeliveryCost: number,
    packages: Package[],
  ): GetDeliveryTimeDto[] {
    const trip = getDeliveryTrip(70, packages);
    return trip.routes.map((route) => {
      const deliveryCost = getDeliveryCost(baseDeliveryCost, route.packageInfo);
      const offerPercentage = getOfferPercentage(route.packageInfo);
      const discount = (deliveryCost * offerPercentage) / 100;
      return {
        id: route.packageInfo.id,
        discount: discount,
        totalDeliveryCost: deliveryCost - discount,
        time: route.time,
      };
    });
  },
};
