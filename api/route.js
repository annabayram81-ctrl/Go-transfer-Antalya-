import { assertPost, googleFetch, handleApiError, normalizeLanguage, readJson, sendJson } from "./_google.js";

function toWaypoint(place) {
  const latitude = Number(place?.location?.latitude);
  const longitude = Number(place?.location?.longitude);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  return {
    location: {
      latLng: {
        latitude,
        longitude,
      },
    },
  };
}

function getCoordinates(place) {
  const latitude = Number(place?.location?.latitude);
  const longitude = Number(place?.location?.longitude);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  return { latitude, longitude };
}

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function estimateRoadDistanceKm(origin, destination) {
  const earthRadiusKm = 6371;
  const latitudeDelta = toRadians(destination.latitude - origin.latitude);
  const longitudeDelta = toRadians(destination.longitude - origin.longitude);
  const originLatitude = toRadians(origin.latitude);
  const destinationLatitude = toRadians(destination.latitude);
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(originLatitude) * Math.cos(destinationLatitude) * Math.sin(longitudeDelta / 2) ** 2;
  const straightLineKm = 2 * earthRadiusKm * Math.asin(Math.sqrt(haversine));

  return Math.round(straightLineKm * 1.25 * 10) / 10;
}

export default async function handler(req, res) {
  if (!assertPost(req, res)) {
    return;
  }

  const requestBody = await readJson(req);
  const { origin, destination, language } = requestBody;

  try {
    const originWaypoint = toWaypoint(origin);
    const destinationWaypoint = toWaypoint(destination);

    if (!originWaypoint || !destinationWaypoint) {
      sendJson(res, 400, { error: "missing_route_points" });
      return;
    }

    const payload = await googleFetch("https://routes.googleapis.com/directions/v2:computeRoutes", {
      method: "POST",
      headers: {
        "X-Goog-FieldMask": "routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline",
      },
      body: JSON.stringify({
        origin: originWaypoint,
        destination: destinationWaypoint,
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_UNAWARE",
        languageCode: normalizeLanguage(language),
        units: "METRIC",
      }),
    });

    const route = payload.routes?.[0];

    if (!route?.distanceMeters) {
      sendJson(res, 404, { error: "route_not_found" });
      return;
    }

    sendJson(res, 200, {
      distanceKm: Math.round((route.distanceMeters / 1000) * 10) / 10,
      duration: route.duration || null,
      polyline: route.polyline?.encodedPolyline || null,
    });
  } catch (error) {
    const originCoordinates = getCoordinates(origin);
    const destinationCoordinates = getCoordinates(destination);

    if (originCoordinates && destinationCoordinates && error.code === "PERMISSION_DENIED") {
      sendJson(res, 200, {
        distanceKm: estimateRoadDistanceKm(originCoordinates, destinationCoordinates),
        duration: null,
        polyline: null,
        estimated: true,
      });
      return;
    }

    handleApiError(res, error);
  }
}
