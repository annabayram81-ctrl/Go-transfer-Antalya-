import test from "node:test";
import assert from "node:assert/strict";

await import("../pricing.js");

const {
  LONG_DISTANCE_RATE,
  LONG_DISTANCE_THRESHOLD_KM,
  calculateDistanceSubtotal,
  calculateTransferPrice,
} = globalThis.GoTransferPricing;

const standardTier = { min: 1, max: 3, base: 24.13, perKm: 0.49 };

test("uses the existing calculation through 100 km", () => {
  assert.equal(LONG_DISTANCE_THRESHOLD_KM, 100);

  for (const distanceKm of [0, 50, 80, 100]) {
    assert.equal(
      calculateDistanceSubtotal(standardTier, distanceKm),
      standardTier.base + distanceKm * standardTier.perKm,
    );
  }
});

test("charges only kilometres above 100 km at the long-distance rate", () => {
  assert.equal(LONG_DISTANCE_RATE, 1.25);
  assert.equal(calculateDistanceSubtotal(standardTier, 120), 24.13 + 100 * 0.49 + 20 * 1.25);
  assert.equal(calculateDistanceSubtotal(standardTier, 150), 24.13 + 100 * 0.49 + 50 * 1.25);
});

test("keeps the 100 km boundary continuous", () => {
  const atThreshold = calculateDistanceSubtotal(standardTier, 100);
  const oneKmAfter = calculateDistanceSubtotal(standardTier, 101);

  assert.equal(oneKmAfter - atThreshold, LONG_DISTANCE_RATE);
  assert.equal(calculateTransferPrice(standardTier, 100, 2), 70);
  assert.equal(calculateTransferPrice(standardTier, 101, 2), 70);
});

test("prices the live Antalya Airport to Kaş distance near 200 euros", () => {
  assert.equal(calculateTransferPrice(standardTier, 203.5, 2), 200);
});

test("preserves tariff multipliers and large-group passenger coefficients", () => {
  const multipliedTier = { base: 32.57, perKm: 0.515, multiplier: 1.1, extraPassengerRate: 0.2 };
  const subtotal = calculateDistanceSubtotal(multipliedTier, 120);
  const expected = Math.max(0, Math.ceil((subtotal * 1.1 * 1.6) / 5) * 5 - 5);

  assert.equal(calculateTransferPrice(multipliedTier, 120, 12), expected);
});
