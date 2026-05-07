import {
  assertPost,
  buildLocationRestriction,
  getIncludedPrimaryTypes,
  googleFetch,
  handleApiError,
  normalizeLanguage,
  readJson,
  sendJson,
} from "./_google.js";

export default async function handler(req, res) {
  if (!assertPost(req, res)) {
    return;
  }

  try {
    const { input, language, placeType } = await readJson(req);
    const trimmedInput = String(input || "").trim();

    if (trimmedInput.length < 2) {
      sendJson(res, 200, { suggestions: [] });
      return;
    }

    const body = {
      input: trimmedInput,
      languageCode: normalizeLanguage(language),
      includedRegionCodes: ["tr"],
      locationRestriction: buildLocationRestriction(),
    };

    const includedPrimaryTypes = getIncludedPrimaryTypes(placeType);

    if (includedPrimaryTypes) {
      body.includedPrimaryTypes = includedPrimaryTypes;
    }

    const payload = await googleFetch("https://places.googleapis.com/v1/places:autocomplete", {
      method: "POST",
      headers: {
        "X-Goog-FieldMask":
          "suggestions.placePrediction.placeId,suggestions.placePrediction.text,suggestions.placePrediction.structuredFormat,suggestions.placePrediction.types",
      },
      body: JSON.stringify(body),
    });

    const suggestions = (payload.suggestions || [])
      .map((suggestion) => suggestion.placePrediction)
      .filter(Boolean)
      .map((prediction) => ({
        placeId: prediction.placeId,
        text: prediction.text?.text || "",
        mainText: prediction.structuredFormat?.mainText?.text || prediction.text?.text || "",
        secondaryText: prediction.structuredFormat?.secondaryText?.text || "",
        types: prediction.types || [],
      }));

    sendJson(res, 200, { suggestions });
  } catch (error) {
    handleApiError(res, error);
  }
}
