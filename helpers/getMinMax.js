export default (persons, key) => {
  let min = 0;
  let max = 0;

  for (const person of persons) {
    max = Math.max(max, person[key] || 0);
    min = Math.min(min, person[key] || 0);
  }

  return [min, max];
};
