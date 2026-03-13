import { describe, test, expect } from "vitest";
import { getBestShipment } from "../src/core/deliveryTime/getBestShipment.js";
import services from "../src/services.js";
import { getDeliveryTrip } from "../src/core/deliveryTime/getDeliveryTrip.js";

describe("Delivery Domain Logic", () => {
  describe("getBestShipment (Optimization Logic)", () => {
    test.for([
      {
        maxWeight: 200,
        packages: [
          {
            index: 0,
            id: "PKG1",
            weight: 50,
            distance: 30,
            offerCode: "OFR001",
          },
          {
            index: 1,
            id: "PKG2",
            weight: 75,
            distance: 125,
            offerCode: "OFR008",
          },
          {
            index: 2,
            id: "PKG3",
            weight: 175,
            distance: 100,
            offerCode: "OFR003",
          },
          {
            index: 3,
            id: "PKG4",
            weight: 110,
            distance: 60,
            offerCode: "OFR002",
          },
          { index: 4, id: "PKG5", weight: 155, distance: 95, offerCode: "NA" },
        ],
        expected: {
          packages: [
            {
              index: 1,
              id: "PKG2",
              weight: 75,
              distance: 125,
              offerCode: "OFR008",
            },
            {
              index: 3,
              id: "PKG4",
              weight: 110,
              distance: 60,
              offerCode: "OFR002",
            },
          ],
          totalDistance: 125,
          totalWeight: 185,
        },
      },
      {
        maxWeight: 200,
        packages: [
          {
            index: 0,
            id: "PKG1",
            weight: 50,
            distance: 30,
            offerCode: "OFR001",
          },
          {
            index: 1,
            id: "PKG3",
            weight: 175,
            distance: 100,
            offerCode: "OFR003",
          },
          { index: 2, id: "PKG5", weight: 155, distance: 95, offerCode: "NA" },
        ],
        expected: {
          packages: [
            {
              index: 1,
              id: "PKG3",
              weight: 175,
              distance: 100,
              offerCode: "OFR003",
            },
          ],
          totalDistance: 100,
          totalWeight: 175,
        },
      },
      {
        maxWeight: 200,
        packages: [
          {
            index: 0,
            id: "PKG1",
            weight: 50,
            distance: 30,
            offerCode: "OFR001",
          },
          {
            index: 1,
            id: "PKG3",
            weight: 175,
            distance: 100,
            offerCode: "OFR003",
          },
          { index: 2, id: "PKG5", weight: 150, distance: 95, offerCode: "NA" },
        ],
        expected: {
          packages: [
            {
              index: 0,
              id: "PKG1",
              weight: 50,
              distance: 30,
              offerCode: "OFR001",
            },
            {
              index: 2,
              id: "PKG5",
              weight: 150,
              distance: 95,
              offerCode: "NA",
            },
          ],
          totalDistance: 95,
          totalWeight: 200,
        },
      },
    ])(
      "MaxWeight $maxWeight: Selecting optimal subset from $packages.length packages",
      ({ maxWeight, packages, expected }) => {
        expect(getBestShipment(maxWeight, packages)).toStrictEqual(expected);
      },
    );
  });

  describe("getDeliveryTrip", () => {
    test.for([
      {
        speed: 70,
        packages: [
          {
            index: 0,
            id: "PKG2",
            weight: 75,
            distance: 125,
            offerCode: "OFR008",
          },
          {
            index: 1,
            id: "PKG4",
            weight: 110,
            distance: 60,
            offerCode: "OFR002",
          },
        ],
        currentTime: 0,
        expected: {
          routes: [
            {
              packageInfo: {
                index: 1,
                id: "PKG4",
                weight: 110,
                distance: 60,
                offerCode: "OFR002",
              },
              time: 0.85,
            },
            {
              packageInfo: {
                index: 0,
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
      {
        speed: 70,
        packages: [
          {
            index: 0,
            id: "PKG2",
            weight: 75,
            distance: 125,
            offerCode: "OFR008",
          },
          {
            index: 1,
            id: "PKG4",
            weight: 110,
            distance: 60,
            offerCode: "OFR002",
          },
        ],
        currentTime: 2.22,
        expected: {
          routes: [
            {
              packageInfo: {
                index: 1,
                id: "PKG4",
                weight: 110,
                distance: 60,
                offerCode: "OFR002",
              },
              time: 0.85 + 2.22,
            },
            {
              packageInfo: {
                index: 0,
                id: "PKG2",
                weight: 75,
                distance: 125,
                offerCode: "OFR008",
              },
              time: 1.78 + 2.22,
            },
          ],
          time: 3.56 + 2.22,
        },
      },
    ])(
      "Speed $speed: Trip for $packages.length packages -> Total Time $expected.time",
      ({ speed, packages, currentTime, expected }) => {
        expect(getDeliveryTrip(speed, packages, currentTime)).toStrictEqual(
          expected,
        );
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
          {
            index: 0,
            id: "PKG2",
            weight: 75,
            distance: 125,
            offerCode: "OFR008",
          },
          {
            index: 1,
            id: "PKG4",
            weight: 110,
            distance: 60,
            offerCode: "OFR002",
          },
        ],
        vehicleInfo: {
          numberOfVehicles: 1,
          maxSpeed: 70,
          maxCarriableWeight: 200,
        },
        expected: [
          {
            id: "PKG2",
            time: 1.78,
            discount: 0,
            totalDeliveryCost: 1475,
          },
          {
            id: "PKG4",
            time: 0.85,
            discount: 105,
            totalDeliveryCost: 1395,
          },
        ],
      },
      {
        baseDeliveryCost: 100,
        packages: [
          {
            index: 0,
            id: "PKG1",
            weight: 50,
            distance: 30,
            offerCode: "OFR001",
          },
          {
            index: 1,
            id: "PKG2",
            weight: 75,
            distance: 125,
            offerCode: "OFR008",
          },
          {
            index: 2,
            id: "PKG4",
            weight: 110,
            distance: 60,
            offerCode: "OFR002",
          },
        ],
        vehicleInfo: {
          numberOfVehicles: 1,
          maxSpeed: 70,
          maxCarriableWeight: 200,
        },
        expected: [
          {
            id: "PKG1",
            time: 3.98,
            discount: 0,
            totalDeliveryCost: 750,
          },
          {
            id: "PKG2",
            time: 1.78,
            discount: 0,
            totalDeliveryCost: 1475,
          },
          {
            id: "PKG4",
            time: 0.85,
            discount: 105,
            totalDeliveryCost: 1395,
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
