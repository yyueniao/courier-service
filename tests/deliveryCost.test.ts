import { describe, expect, test } from "vitest";
import {
  getDeliveryCost,
  getOfferPercentage,
} from "../src/core/deliveryCost.js";
import services from "../src/services.js";

describe("Delivery Cost Domain Logic", () => {
  describe("getDeliveryCost (Raw Calculation)", () => {
    test.for([
      {
        baseDeliveryCost: 100,
        packageInfo: {
          id: "PKG1",
          weight: 5,
          distance: 5,
          offerCode: "OFR001",
        },
        expected: 175,
      },
      {
        baseDeliveryCost: 100,
        packageInfo: {
          id: "PKG2",
          weight: 15,
          distance: 5,
          offerCode: "OFR002",
        },
        expected: 275,
      },
      {
        baseDeliveryCost: 100,
        packageInfo: {
          id: "PKG3",
          weight: 10,
          distance: 100,
          offerCode: "OFR003",
        },
        expected: 700,
      },
      {
        baseDeliveryCost: 100,
        packageInfo: {
          id: "PKG4",
          weight: 110,
          distance: 60,
          offerCode: "NA",
        },
        expected: 1500,
      },
    ])(
      "Case $packageInfo.id: Base $baseDeliveryCost, W $packageInfo.weight, D $packageInfo.distance -> Raw Cost: $expected",
      ({ baseDeliveryCost, packageInfo, expected }) => {
        expect(getDeliveryCost(baseDeliveryCost, packageInfo)).toBe(expected);
      },
    );
  });

  describe("getOfferPercentage (Discount Qualification)", () => {
    test.for([
      {
        packageInfo: {
          id: "PKG1",
          weight: 5,
          distance: 5,
          offerCode: "OFR001",
        },
        expected: 0,
      },
      {
        packageInfo: {
          id: "PKG2",
          weight: 15,
          distance: 5,
          offerCode: "OFR002",
        },
        expected: 0,
      },
      {
        packageInfo: {
          id: "PKG3",
          weight: 10,
          distance: 100,
          offerCode: "OFR003",
        },
        expected: 5,
      },
      {
        baseDeliveryCost: 100,
        packageInfo: {
          id: "PKG4",
          weight: 110,
          distance: 60,
          offerCode: "OFR002",
        },
        expected: 7,
      },
    ])(
      "Case $packageInfo.id: Offer $packageInfo.offerCode -> Discount: $expected%",
      ({ packageInfo, expected }) => {
        expect(getOfferPercentage(packageInfo)).toBe(expected);
      },
    );
  });
});

describe("Delivery Application Service", () => {
  describe("getDeliveryCost", () => {
    test.for([
      {
        name: "No Discount: Criteria not met",
        baseDeliveryCost: 100,
        packageInfo: {
          id: "PKG1",
          weight: 5,
          distance: 5,
          offerCode: "OFR001",
        },
        expected: { id: "PKG1", discount: 0, totalDeliveryCost: 175 },
      },
      {
        name: "Valid Discount: Criteria met",
        baseDeliveryCost: 100,
        packageInfo: {
          id: "PKG3",
          weight: 10,
          distance: 100,
          offerCode: "OFR003",
        },
        expected: { id: "PKG3", discount: 35, totalDeliveryCost: 665 },
      },
      {
        name: "Edge Case: Invalid Offer Code",
        baseDeliveryCost: 100,
        packageInfo: {
          id: "PKG4",
          weight: 10,
          distance: 10,
          offerCode: "INVALID",
        },
        expected: { id: "PKG4", discount: 0, totalDeliveryCost: 250 },
      },
      {
        name: "Math Check: Floating point precision",
        baseDeliveryCost: 1,
        packageInfo: {
          id: "PKG5",
          weight: 10,
          distance: 100,
          offerCode: "OFR003",
        },
        expected: { id: "PKG5", discount: 30.05, totalDeliveryCost: 570.95 },
      },
      {
        baseDeliveryCost: 100,
        packageInfo: {
          id: "PKG6",
          weight: 110,
          distance: 60,
          offerCode: "OFR002",
        },
        expected: {
          discount: 105,
          id: "PKG6",
          totalDeliveryCost: 1395,
        },
      },
    ])(
      "$name ($packageInfo.id)",
      ({ baseDeliveryCost, packageInfo, expected }) => {
        const result = services.getDeliveryCost(baseDeliveryCost, packageInfo);
        expect(result).toEqual(expected);
      },
    );
  });
});
