const Header = (props) => {
  return (
    <header>
      <h1>{props.course}</h1>
    </header>
  );
};

const Total = (props) => {
  return (
    <footer>
      <b>Numbers of exercises {props.total}</b>
    </footer>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total
          total={course.parts.reduce((a, item) => item.exercises + a, 0)}
        />
      </div>
    </div>
  );
};

export default Course;