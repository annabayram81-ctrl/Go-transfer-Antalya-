import { assertPost, googleFetch, handleApiError, normalizeLanguage, readJson, sendJson } from "./_google.js";

export default async function handler(req, res) {
  if (!assertPost(req, res)) {
    return;
  }

  try {
    const { placeId, language } = await readJson(req);
    const normalizedPlaceId = String(placeId || "").trim();

    if (!normalizedPlaceId) {
      sendJson(res, 400, { error: "missing_place_id" });
      return;
    }

    const url = new URL(`https://places.googleapis.com/v1/places/${encodeURIComponent(normalizedPlaceId)}`);
    url.searchParams.set("languageCode", normalizeLanguage(language));

    const place = await googleFetch(url, {
      method: "GET",
      headers: {
        "X-Goog-FieldMask": "id,displayName,formattedAddress,location,types",
      },
    });

    sendJson(res, 200, {
      place: {
        id: place.id,
        displayName: place.displayName?.text || "",
        formattedAddress: place.formattedAddress || "",
        location: place.location,
        types: place.types || [],
      },
    });
  } catch (error) {
    handleApiError(res, error);
  }
}
