const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

const manifest = {
  id: "community.wwe.fr",
  version: "1.0.0",
  name: "WWE France",
  description: "Addon WWE français pour Stremio",
  logo: "https://www.stremio.com/website/stremio-logo-small.png",
  resources: ["stream"],
  types: ["series"],
  catalogs: [],
  idPrefixes: ["wwe-"]
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async ({ type, id }) => {
  console.log("Recherche :", type, id);

  // Pour l'instant, on ne branche aucune source externe.
  // Nous ajouterons notre système de recherche ensuite.
  return {
    streams: []
  };
});

const port = process.env.PORT || 8080;

serveHTTP(builder.getInterface(), {
  port: port
});

console.log("WWE France démarré sur le port", port);
