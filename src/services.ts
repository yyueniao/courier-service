import { getTotalDeliveryCost } from "./core/deliveryCost/getTotalDeliveryCost.js";
import { getBestShipment } from "./core/deliveryTime/getBestShipment.js";
import { getDeliveryTrip } from "./core/deliveryTime/getDeliveryTrip.js";
import {
  GetDeliveryCostDto,
  GetDeliveryTimeDto,
  Package,
  Route,
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
    let packagesRemaining = packages;
    const routes: Route[] = [];
    let vehiclesAvailableTime: number[] = Array(
      vehicleInfo.numberOfVehicles,
    ).fill(0);
    while (packagesRemaining.length > 0) {
      const shipment = getBestShipment(
        vehicleInfo.maxCarriableWeight,
        packagesRemaining,
      );
      const trip = getDeliveryTrip(
        vehicleInfo.maxSpeed,
        shipment.packages,
        vehiclesAvailableTime[0],
      );
      const packageIds = shipment.packages.map((packageInfo) => packageInfo.id);
      packagesRemaining = packagesRemaining.filter(
        (packageInfo) => !packageIds.includes(packageInfo.id),
      );
      routes.push(...trip.routes);
      vehiclesAvailableTime = [
        vehiclesAvailableTime[0] + trip.time,
        ...vehiclesAvailableTime.slice(1),
      ].sort();
    }
    return routes
      .sort(
        (route1, route2) => route1.packageInfo.index - route2.packageInfo.index,
      )
      .map((route) => {
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
