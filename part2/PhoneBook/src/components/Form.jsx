const Form = ({
  addPerson,
  newName,
  handleNewName,
  newNumber,
  handleNewNumber,
}) => {
  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <input value={newName} onChange={handleNewName} required={true} />
          <br />
          <br />
          number:{" "}
          <input value={newNumber} onChange={handleNewNumber} required={true} />
        </div>
        <br />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default Form;
