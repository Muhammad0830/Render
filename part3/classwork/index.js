const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());

app.use(express.json());

app.use(express.static("dist"));

const url = process.env.MONGODB_URI;
console.log('process', process.env.MONGODB_URI)
console.log('process.env', process.env)
mongoose.set("strictQuery", false);
mongoose.connect(url);
console.log('process.env.MONGODB_URI', process.env.MONGODB_URI)
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: process.argv[2],
  important: process.argv[3],
});

note.save().then((result) => {
  console.log(`added ${process.argv[2]} to the note`);
  mongoose.connection.close();
});
// app.get('/api/notes', (request, response) => {
//   Note.find({}).then(notes => {
//     response.json(notes);
//   })
// })

// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]

// making the home page
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

// fetching the notes
app.get("/api/notes", (request, response) => {
  response.json(notes);
});

// fetching the each note
app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// deleting each note
app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

// adding the note
const generatedId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((note) => Number(note.id))) : 0;
  return String(maxId + 1);
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generatedId(),
  };

  notes = notes.concat(note);

  response.json(note);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
