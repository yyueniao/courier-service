import { describe, test, expect } from "vitest";
import { getDeliveryTrip, getTotalWeight } from "../src/core/deliveryTime.js";
import services from "../src/services.js";

describe("Delivery Domain Logic", () => {
  describe("getDeliveryTrip", () => {
    test.for([
      {
        speed: 70,
        packages: [
          { id: "PKG2", weight: 75, distance: 125, offerCode: "OFR008" },
          { id: "PKG4", weight: 110, distance: 60, offerCode: "OFR002" },
        ],
        expected: {
          routes: [
            {
              packageInfo: {
                id: "PKG4",
                weight: 110,
                distance: 60,
                offerCode: "OFR002",
              },
              time: 0.85,
            },
            {
              packageInfo: {
                id: "PKG2",
                weight: 75,
                distance: 125,
                offerCode: "OFR008",
              },
              time: 1.78,
            },
          ],
          time: 3.56,
        },
      },
    ])(
      "Speed $speed: Trip for $packages.length packages -> Total Time $expected.time",
      ({ speed, packages, expected }) => {
        expect(getDeliveryTrip(speed, packages)).toStrictEqual(expected);
      },
    );
  });

  describe("getTotalWeight", () => {
    test.for([
      {
        packages: [
          { id: "PKG2", weight: 75, distance: 125, offerCode: "OFR008" },
          { id: "PKG4", weight: 110, distance: 60, offerCode: "OFR002" },
        ],
        expected: 185,
      },
      {
        packages: [
          { id: "PKG2", weight: 30, distance: 125, offerCode: "OFR008" },
          { id: "PKG4", weight: 40, distance: 60, offerCode: "OFR002" },
        ],
        expected: 70,
      },
    ])(
      "Calculating weight for $packages.length packages -> Total: $expected kg",
      ({ packages, expected }) => {
        expect(getTotalWeight(packages)).toBe(expected);
      },
    );
  });
});

describe("Delivery Application Services", () => {
  describe("getDeliveryTime (Cost + Time Orchestration)", () => {
    test.for([
      {
        baseDeliveryCost: 100,
        packages: [
          { id: "PKG2", weight: 75, distance: 125, offerCode: "OFR008" },
          { id: "PKG4", weight: 110, distance: 60, offerCode: "OFR002" },
        ],
        vehicleInfo: {
          numberOfVehicles: 2,
          maxSpeed: 70,
          maxCarriableWeight: 200,
        },
        expected: [
          {
            id: "PKG4",
            time: 0.85,
            discount: 105,
            totalDeliveryCost: 1395,
          },
          {
            id: "PKG2",
            time: 1.78,
            discount: 0,
            totalDeliveryCost: 1475,
          },
        ],
      },
    ])(
      "Service Call: $packages.length packages with $vehicleInfo.numberOfVehicles vehicles -> Check DTO Accuracy",
      ({ baseDeliveryCost, packages, vehicleInfo, expected }) => {
        expect(
          services.getDeliveryTime({
            baseDeliveryCost,
            packages,
            vehicleInfo,
          }),
        ).toStrictEqual(expected);
      },
    );
  });
});
