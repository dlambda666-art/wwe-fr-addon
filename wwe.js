const WWE_SHOWS = {
  raw: {
    name: "WWE Monday Night RAW",
    aliases: ["RAW", "Monday Night RAW"]
  },

  smackdown: {
    name: "WWE Friday Night SmackDown",
    aliases: ["SmackDown", "Friday Night SmackDown"]
  },

  ple: {
    name: "WWE Premium Live Events",
    aliases: ["PLE", "Premium Live Event"]
  }
};

function identifyShow(query) {
  const text = String(query || "").toLowerCase();

  if (text.includes("smackdown")) {
    return WWE_SHOWS.smackdown;
  }

  if (text.includes("raw")) {
    return WWE_SHOWS.raw;
  }

  if (
    text.includes("premium live event") ||
    text.includes("ple")
  ) {
    return WWE_SHOWS.ple;
  }

  return null;
}

module.exports = {
  WWE_SHOWS,
  identifyShow
};
