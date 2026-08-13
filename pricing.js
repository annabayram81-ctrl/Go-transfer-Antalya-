export const LONG_DISTANCE_THRESHOLD_KM = 100;
export const LONG_DISTANCE_RATE = 1.25;
export const STANDARD_TARIFF_TIER = Object.freeze({ label: "1-3 пассажира", min: 1, max: 3, priceIndex: 0, base: 24.13, perKm: 0.49 });

export function roundToFive(value) {
    return Math.ceil(value / 5) * 5;
  }

export function calculateDistanceSubtotal(tariffTier, distanceKm) {
    const regularDistance = Math.min(distanceKm, LONG_DISTANCE_THRESHOLD_KM);
    const extraDistance = Math.max(0, distanceKm - LONG_DISTANCE_THRESHOLD_KM);

    return tariffTier.base + regularDistance * tariffTier.perKm + extraDistance * LONG_DISTANCE_RATE;
  }

export function calculateTransferPrice(tariffTier, distanceKm, passengers) {
    const extraPassengers = Math.max(0, passengers - 9);
    const largeBusMultiplier = tariffTier.extraPassengerRate
      ? 1 + extraPassengers * tariffTier.extraPassengerRate
      : 1;
    const distanceSubtotal = calculateDistanceSubtotal(tariffTier, distanceKm);

    return Math.max(
      0,
      roundToFive(distanceSubtotal * (tariffTier.multiplier || 1) * largeBusMultiplier) - 5,
    );
  }

globalThis.GoTransferPricing = Object.freeze({
    LONG_DISTANCE_THRESHOLD_KM,
    LONG_DISTANCE_RATE,
    calculateDistanceSubtotal,
    calculateTransferPrice,
    roundToFive,
    STANDARD_TARIFF_TIER,
  });
