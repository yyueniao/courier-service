export interface Package {
  index: number;
  id: string;
  weight: number;
  distance: number;
  offerCode: string;
}

export interface Offer {
  id: string;
  minDistance: number | null;
  maxDistance: number | null;
  minWeight: number | null;
  maxWeight: number | null;
  value: number;
  type: "percentage" | "amount";
}

export interface Route {
  packageInfo: Package;
  time: number;
}

export interface Trip {
  routes: Route[];
  time: number;
}

export interface Shipment {
  packages: Package[];
  totalWeight: number;
  totalDistance: number;
}

export interface VehicleInfo {
  numberOfVehicles: number;
  maxSpeed: number;
  maxCarriableWeight: number;
}

export interface GetDeliveryCostDto {
  id: string;
  discount: number;
  totalDeliveryCost: number;
}

export interface GetDeliveryTimeDto {
  id: string;
  discount: number;
  totalDeliveryCost: number;
  time: number;
}
