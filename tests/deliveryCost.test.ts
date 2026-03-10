import { expect, test } from "vitest";
import { getDeliveryCost } from "../src/deliveryCost.js";

test.for([[100, 5, 5, 175]])(
  "When base delivery cost is %i, weight is %i kg, distance is %i km, delivery cost will be %i",
  ([baseDeliveryCost, weight, distance, expected]) => {
    expect(getDeliveryCost(baseDeliveryCost, weight, distance)).toBe(expected);
  },
);
