require('dotenv').config();
const express = require("express");
const Person = require ('./models/person')

const app = express();
app.use(express.json());

const cors = require("cors");
const { request, response } = require('express');
app.use(express.static('build'))
const bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post("/api/persons", (req, res, next) => {

const body= req.body;
 console.log(body);
if (body.name === undefined | body.number === undefined) {
    return res.status(400).json({ error: ' missing content' })
  }
  const person = new Person({
     name: body.name,
     number: body.number,
   })

   person.save()
   .then(savedNote => {
     return savedNote.toJSON()
   }) //here is the promise chaining
   .then(savedAndFormatNote=>{
     res.json(savedAndFormatNote)
   })
   .catch(error=>next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
  //console.log(req.params.id);
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})
app.put('/api/persons/:id', (req, res, next) => {
  
  const body= req.body;

  const newP= {
    name:body.name,
    number:body.number
  }
  Person.findByIdAndUpdate(req.params.id, newP,{new:true})
    .then(newPerson => {
      res.json(newPerson)
    })
    .catch(error => next(error))
})
const errorHandler = (error, req, res, next)=>{
  console.log(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: 'Name minimun length is 3 charcter and the number should be at least 8 digits' })
    //return res.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

app.get('/api/persons/:id', (req, res,next) => {
 Person.findById(req.params.id).then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
    })
    
app.get('/api/persons',(req,res,next)=>{
  Person.find({}).then(p=>{
    res.json(p);``
  }).catch(error=>next(error))
})
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
