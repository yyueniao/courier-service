import { Offer } from "./models.js";

export const offers: Offer[] = [
  {
    id: "OFR001",
    minDistance: 0,
    maxDistance: 199,
    minWeight: 70,
    maxWeight: 200,
    percentage: 10,
  },
  {
    id: "OFR002",
    minDistance: 50,
    maxDistance: 150,
    minWeight: 100,
    maxWeight: 250,
    percentage: 7,
  },
  {
    id: "OFR003",
    minDistance: 50,
    maxDistance: 250,
    minWeight: 10,
    maxWeight: 150,
    percentage: 5,
  },
  {
    id: "FLAT100",
    minDistance: null,
    maxDistance: null,
    minWeight: null,
    maxWeight: null,
    percentage: 50,
  },
];
