export const getDeliveryCost = (
  baseDeliveryCost: number,
  weight: number,
  distance: number,
): number => {
  return baseDeliveryCost + weight + distance;
};
