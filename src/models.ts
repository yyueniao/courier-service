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
