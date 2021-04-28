export function getCredentials(array = [], target) {
  // returns an object with each of the requested field names from array
  return Object.assign(
    {}, // combine the mapped array objects into a single object
    // map over the array and return an object with {name: value} for each field
    ...array.map((item) => {
      if (target[item]) {
        return { [target[item].name]: target[item].value };
      }
    })
  );
}

export function convertFormToObject(inputsElements) {
  return inputsElements.reduce(
    (obj, item) => ({ ...obj, [item.name]: item.value.trim() }),
    {}
  );
  /**
   * USAGE:

      <form onSubmit={
        onSubmit={(e) => {
          e.preventDefault();
          e.persist();

          console.log(
            "e.target",
          **  convertFormToObject([...e.target.querySelectorAll("input")])
        );
      }
      />

   */
}
