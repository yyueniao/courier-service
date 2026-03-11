import { expect, test } from "vitest";
import { getDeliveryCost, getOfferPercentage } from "../src/deliveryCost.js";

test.for([
  {
    baseDeliveryCost: 100,
    packageInfo: { id: "PKG1", weight: 5, distance: 5, offerCode: "OFR001" },
    expected: 175,
  },
  {
    baseDeliveryCost: 100,
    packageInfo: { id: "PKG2", weight: 15, distance: 5, offerCode: "OFR002" },
    expected: 275,
  },
  {
    baseDeliveryCost: 100,
    packageInfo: { id: "PKG3", weight: 10, distance: 100, offerCode: "OFR003" },
    expected: 700,
  },
])(
  "Case $packageInfo.id: Base $baseDeliveryCost, Weight $packageInfo.weight kg, Dist $packageInfo.distance km -> Cost $expected",
  ({ baseDeliveryCost, packageInfo, expected }) => {
    expect(getDeliveryCost(baseDeliveryCost, packageInfo)).toBe(expected);
  },
);

test.for([
  {
    packageInfo: { id: "PKG1", weight: 5, distance: 5, offerCode: "OFR001" },
    expected: 0,
  },
  {
    packageInfo: { id: "PKG2", weight: 15, distance: 5, offerCode: "OFR002" },
    expected: 0,
  },
  {
    packageInfo: { id: "PKG3", weight: 10, distance: 100, offerCode: "OFR003" },
    expected: 5,
  },
])(
  "Case $packageInfo.id: Should discount $expected for $packageInfo.offerCode (Weight: $packageInfo.weight, Dist: $packageInfo.distance)",
  ({ packageInfo, expected }) => {
    expect(getOfferPercentage(packageInfo)).toBe(expected);
  },
);
