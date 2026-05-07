const ANTALYA_BOUNDS = {
  low: { latitude: 35.95, longitude: 29.2 },
  high: { latitude: 37.25, longitude: 32.95 },
};

const PLACE_TYPE_MAP = {
  hotel: ["lodging"],
  clinic: ["hospital", "doctor"],
  attraction: ["tourist_attraction"],
};

export async function readJson(req) {
  if (typeof req.body === "string") {
    return req.body ? JSON.parse(req.body) : {};
  }

  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  const chunks = [];

  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

export function sendJson(res, status, payload) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.status(status).json(payload);
}

export function assertPost(req, res) {
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return false;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { error: "method_not_allowed" });
    return false;
  }

  return true;
}

export function getGoogleApiKey() {
  return process.env.GOOGLE_MAPS_API_KEY;
}

export function normalizeLanguage(language) {
  return ["ru", "en", "tr"].includes(language) ? language : "ru";
}

export function getIncludedPrimaryTypes(placeType) {
  return PLACE_TYPE_MAP[placeType] || undefined;
}

export function buildLocationRestriction() {
  return {
    rectangle: ANTALYA_BOUNDS,
  };
}

export async function googleFetch(url, options = {}) {
  const apiKey = getGoogleApiKey();

  if (!apiKey) {
    const error = new Error("GOOGLE_MAPS_API_KEY is not configured");
    error.status = 503;
    error.code = "missing_google_maps_api_key";
    throw error;
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const error = new Error(payload.error?.message || "Google Maps request failed");
    error.status = response.status;
    error.code = payload.error?.status || "google_maps_error";
    error.payload = payload;
    throw error;
  }

  return payload;
}

export function handleApiError(res, error) {
  sendJson(res, error.status || 500, {
    error: error.code || "server_error",
    message: error.message || "Unexpected server error",
  });
}
