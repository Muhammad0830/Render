const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());

morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// making the home page
app.get("/", (request, response) => {
  response.send("<h1>Home Page</h1>");
});

//fetching the persons page
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// fetching info page
app.get("/info", (request, response) => {
    const date = new Date;
    response.send(`PhoneBook has info for ${persons.length} people <br/> <br/> ${date}`)
})

// fetching the single person
app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    const person = persons.find(person => person.id === id);
    if(person){
        response.json(person)
    } else{
        response.status(404).end();
    }
})

//deleting the single person
app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id;
    persons = persons.filter(person => person.id !== id);
    
    response.status(204).end();
})

const generateId = () => {
    const maxId = persons.length > 0 
        ? Math.max(...persons.map(person => Number(person.id)))
        : 0
    return String(maxId + 1);
}

// adding the new person to persons page
app.post("/api/persons", (request, response) => {
    const body = request.body;

    if(!body.name || !body.number){
        response.status(404).json({
            error: 'name or number is missing'
        });
    }

    
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number        
    }
    
    persons.map(person => {
        if(body.name == person.name){
            response.status(404).json({
                error: 'the name must be unique'
            })
        }
    })

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
