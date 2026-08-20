const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const manifest = {
  id: "community.wwe.fr",
  version: "1.0.0",
  name: "WWE France",
  description: "Addon WWE français pour Stremio",
  logo: "https://www.stremio.com/website/stremio-logo-small.png",
  resources: ["stream"],
  types: ["series"],
  catalogs: []
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async ({ type, id }) => {

  console.log("==============================");
  console.log("WWE REQUEST");
  console.log("Type :", type);
  console.log("ID   :", id);

  if (type !== "series") {
    console.log("Type non supporté");
    return { streams: [] };
  }

  const parts = id.split(":");

  if (parts.length < 3) {
    console.log("ID WWE inattendu :", id);
    return { streams: [] };
  }

  const episode = parts.pop();
  const season = parts.pop();
  const seriesId = parts.join(":");

  console.log("Série   :", seriesId);
  console.log("Saison  :", season);
  console.log("Épisode :", episode);

  const torrentioUrl = process.env.URL_TORRENTIO;

  if (!torrentioUrl) {
    console.log("ERREUR : URL_TORRENTIO absente");
    return { streams: [] };
  }

  const streamUrl =
    torrentioUrl.replace(
      "/manifest.json",
      `/stream/series/${seriesId}:${season}:${episode}.json`
    );

  console.log("Appel Torrentio...");

  try {
    const response = await fetch(streamUrl);

    console.log("Torrentio HTTP :", response.status);

    if (!response.ok) {
      console.log("Erreur Torrentio :", response.status);
      return { streams: [] };
    }

    const data = await response.json();

    const streams = data.streams || [];

    console.log("Flux Torrentio reçus :", streams.length);

    return {
      streams
    };

  } catch (error) {
    console.log("Erreur appel Torrentio :", error.message);
    return { streams: [] };
  }
});

const port = process.env.PORT || 8080;

serveHTTP(builder.getInterface(), {
  port
});

console.log("WWE France démarré sur le port", port);
