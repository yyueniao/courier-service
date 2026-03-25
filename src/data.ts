import { Offer } from "./models.js";

export const offers: Offer[] = [
  {
    id: "OFR001",
    minDistance: 0,
    maxDistance: 199,
    minWeight: 70,
    maxWeight: 200,
    value: 10,
    type: "percentage",
  },
  {
    id: "OFR002",
    minDistance: 50,
    maxDistance: 150,
    minWeight: 100,
    maxWeight: 250,
    value: 7,
    type: "percentage",
  },
  {
    id: "OFR003",
    minDistance: 50,
    maxDistance: 250,
    minWeight: 10,
    maxWeight: 150,
    value: 5,
    type: "percentage",
  },
  {
    id: "FLAT100",
    minDistance: null,
    maxDistance: null,
    minWeight: null,
    maxWeight: null,
    value: 100,
    type: "amount",
  },
];
