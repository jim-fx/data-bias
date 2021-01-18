import papa from "papaparse";

import currentRaw from "./Berufsfeuerwehr.csv";
import bewerberRaw from "./Berufsfeuerwehr_Bewerber.csv";

const clone = (data) => JSON.parse(JSON.stringify(data));

const current = clone(
  papa.parse(currentRaw, { header: true, dynamicTyping: true }).data
);
const bewerber = clone(
  papa.parse(bewerberRaw, { header: true, dynamicTyping: true }).data
);

export { current, bewerber };
