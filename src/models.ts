export interface Package {
  id: string;
  weight: number;
  distance: number;
  offerCode: string;
}

export interface Offer {
  id: string;
  minDistance: number;
  maxDistance: number;
  minWeight: number;
  maxWeight: number;
  percentage: number;
}

export interface Route {
  packageId: string;
  time: number;
}

export interface Trip {
  routes: Route[];
  time: number;
}

export interface GetDeliveryCostDto {
  id: string;
  discount: number;
  totalDeliveryCost: number;
}
