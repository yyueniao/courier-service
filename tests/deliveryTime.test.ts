import { describe, test, expect } from "vitest";
import { getDeliveryTrip } from "../src/core/deliveryTime.js";
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
      "Base $baseDeliveryCost: $packages.length packages -> Returns IDs: $expected.0.id, $expected.1.id",
      ({ baseDeliveryCost, packages, expected }) => {
        expect(
          services.getDeliveryTime({
            baseDeliveryCost,
            packages,
            vehicleInfo: {
              numberOfVehicles: 1,
              maxCarriableWeight: 0,
              maxSpeed: 0,
            },
          }),
        ).toStrictEqual(expected);
      },
    );
  });
});
