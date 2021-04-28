export function convertFormToObject(inputsElements) {
  /**
   * #SCOPE:  takes in an array of inputs and returns a single object with the shape
   * {[input.name]L input.value}
   */
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
