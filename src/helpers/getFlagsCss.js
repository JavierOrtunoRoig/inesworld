import atlas from "../data/atlas.geo.json" assert { type: "json" };

const countriesVisited = atlas.features.filter((country) => country.properties.visited !== 0);

console.log("THE DICTIONARY TO BE COPIED IS: ");

const dictionary = `
    ${countriesVisited.map(
			(country) => `${country.properties.iso_a2}: "fi fi-${country.properties.iso_a2.toLowerCase()}"\n`
		)}
`;

console.log(dictionary);

//* TODO: these css classes are being analyzed in the tailwind.config.mjs file, so it's generating all flags we need
/* 
SX: "fi fi-sx"
ID: "fi fi-id"
CY: "fi fi-cy"
KR: "fi fi-kr"
VN: "fi fi-vn"
AE: "fi fi-ae"
TR: "fi fi-tr"
TH: "fi fi-th"
PH: "fi fi-ph"
MA: "fi fi-ma"
FR: "fi fi-fr"
DE: "fi fi-de"
NO: "fi fi-no"
SE: "fi fi-se"
BE: "fi fi-be"
ES: "fi fi-es"
HU: "fi fi-hu"
PL: "fi fi-pl"
GB: "fi fi-gb"
AT: "fi fi-at"
IT: "fi fi-it"
CH: "fi fi-ch"
NL: "fi fi-nl"
HR: "fi fi-hr"
BG: "fi fi-bg"
PT: "fi fi-pt"
VA: "fi fi-va"
FO: "fi fi-fo"

  };
 */