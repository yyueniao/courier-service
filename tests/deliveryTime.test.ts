import { describe, test, expect } from "vitest";
import { getDeliveryTrip } from "../src/core/deliveryTime.js";

describe("Delivery Time Domain Logic", () => {
  describe("Get Delivery Trip", () => {
    test.for([
      {
        speed: 70,
        packages: [
          {
            id: "PKG2",
            weight: 75,
            distance: 125,
            offerCode: "OFR008",
          },
          {
            id: "PKG4",
            weight: 110,
            distance: 60,
            offerCode: "OFR002",
          },
        ],
        expected: {
          routes: [
            { packageId: "PKG4", time: 0.85 },
            { packageId: "PKG2", time: 1.78 },
          ],
          time: 3.56,
        },
      },
    ])(
      "Case $packageInfo.id: Base $baseDeliveryCost, W $packageInfo.weight, D $packageInfo.distance -> Raw Cost: $expected",
      ({ speed, packages, expected }) => {
        expect(getDeliveryTrip(speed, packages)).toStrictEqual(expected);
      },
    );
  });
});
