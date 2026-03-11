import { expect, test } from "vitest";
import { getDeliveryCost, getOfferPercentage } from "../src/deliveryCost.js";
import services from "../src/services.js";

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

test.for([
  {
    name: "Scenario 1: No Discount (OFR001 but weight/dist too low)",
    baseDeliveryCost: 100,
    packageInfo: { id: "PKG1", weight: 5, distance: 5, offerCode: "OFR001" },
    expected: { id: "PKG1", discount: 0, totalDeliveryCost: 175 },
  },
  {
    name: "Scenario 2: Valid Discount (OFR003 meets weight/dist criteria)",
    baseDeliveryCost: 100,
    packageInfo: {
      id: "PKG3",
      weight: 10,
      distance: 100,
      offerCode: "OFR003",
    },
    // Calculation:
    // Raw Cost = 100 + (10*10) + (100*5) = 700
    // OFR003 = 5% of 700 = 35
    // Total = 700 - 35 = 665
    expected: { id: "PKG3", discount: 35, totalDeliveryCost: 665 },
  },
  {
    name: "Scenario 3: Invalid Offer Code",
    baseDeliveryCost: 100,
    packageInfo: {
      id: "PKG4",
      weight: 10,
      distance: 10,
      offerCode: "INVALID",
    },
    // Calculation:
    // Cost = 100 + (10*10) + (10*5) = 250
    expected: { id: "PKG4", discount: 0, totalDeliveryCost: 250 },
  },
  {
    name: "Scenario 4: Valid Discount with float",
    baseDeliveryCost: 1,
    packageInfo: {
      id: "PKG5",
      weight: 10,
      distance: 100,
      offerCode: "OFR003",
    },
    // Calculation:
    // Raw Cost = 1 + (10*10) + (100*5) = 601
    // OFR003 = 5% of 601 = 30.05
    // Total = 601 - 30.05 = 570.95
    expected: { id: "PKG5", discount: 30.05, totalDeliveryCost: 570.95 },
  },
])("$name", ({ baseDeliveryCost, packageInfo, expected }) => {
  const result = services.getDeliveryCost(baseDeliveryCost, packageInfo);

  expect(result).toEqual(expected);
});
