const Persons = ({ personName, personNumber, handleDelete }) => {
  return (
    <ul>
      <li key={personName}>
        {personName} {personNumber}
        <button onClick={handleDelete}>delete</button>
      </li>
    </ul>
  );
};

export default Persons;
