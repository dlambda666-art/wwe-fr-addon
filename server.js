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

  // Exemple attendu :
  // wwe-xxx:28:32

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

  // Pour l'instant, aucun flux :
  // cette étape sert uniquement à vérifier
  // ce que Nuvio nous transmet.

  return {
    streams: []
  };
});

const port = process.env.PORT || 8080;

serveHTTP(builder.getInterface(), {
  port: port
});

console.log("WWE France démarré sur le port", port);
