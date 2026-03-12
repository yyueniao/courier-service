import { getTotalDeliveryCost } from "./core/deliveryCost.js";
import { getDeliveryTrip } from "./core/deliveryTime.js";
import { GetDeliveryCostDto, GetDeliveryTimeDto, Package } from "./models.js";

export default {
  getDeliveryCost(
    baseDeliveryCost: number,
    packageInfo: Package,
  ): GetDeliveryCostDto {
    const { discount, totalDeliveryCost } = getTotalDeliveryCost(
      baseDeliveryCost,
      packageInfo,
    );

    return {
      id: packageInfo.id,
      discount,
      totalDeliveryCost,
    };
  },
  getDeliveryTime(props: {
    baseDeliveryCost: number;
    packages: Package[];
  }): GetDeliveryTimeDto[] {
    const { baseDeliveryCost, packages } = props;
    const trip = getDeliveryTrip(70, packages);
    return trip.routes.map((route) => {
      const { discount, totalDeliveryCost } = getTotalDeliveryCost(
        baseDeliveryCost,
        route.packageInfo,
      );

      return {
        id: route.packageInfo.id,
        discount,
        totalDeliveryCost,
        time: route.time,
      };
    });
  },
};
