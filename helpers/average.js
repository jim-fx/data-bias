export default (persons, key) => {
  return (
    persons.reduce((accumulator, person) => {
      return accumulator + person[key];
    }, 0) / persons.length
  );
};
