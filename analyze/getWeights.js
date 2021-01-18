import median from "../helpers/median";
import getMinMax from "../helpers/getMinMax";

export default (persons, keys) => {
  const weights = {};

  const normies = persons.filter(
    (p) => p["AuszeichnungBesondereLeistung(j n)"] === "n"
  );

  const nerds = persons.filter(
    (p) => p["AuszeichnungBesondereLeistung(j n)"] === "j"
  );

  let total = 0;

  for (const key of keys) {
    const [min, max] = getMinMax(persons, key);

    const averageNerds = median(nerds, key);

    const averageNormies = median(normies, key);

    let weight = (averageNerds - averageNormies) / (max - min);

    total += weight;

    weights[key] = weight;
  }

  //Normalize the weights;
  let scale = 1 / total;
  for (const key of keys) {
    weights[key] *= scale;
  }

  return weights;
};
