import { getTotalDeliveryCost } from "./core/deliveryCost/getTotalDeliveryCost.js";
import { getDeliveryTrip } from "./core/deliveryTime/getDeliveryTrip.js";
import {
  GetDeliveryCostDto,
  GetDeliveryTimeDto,
  Package,
  VehicleInfo,
} from "./models.js";

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
    vehicleInfo: VehicleInfo;
  }): GetDeliveryTimeDto[] {
    const { baseDeliveryCost, packages, vehicleInfo } = props;
    const trip = getDeliveryTrip(vehicleInfo.maxSpeed, packages);
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
