require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} =require('mongodb');
const _ =require('lodash')

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app =express();
const port = process.env.PORT||3000;

app.use(bodyParser.json());

app.post('/todos',(req,res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save()
  .then((doc) =>{
    res.send(doc);
  },(err) => {
    res.status(400).send(err);
  });

});

app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) =>{
    res.status(400).send(err)
  })
});

app.get('/todos/:id',(req,res) =>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((err) => res.status(404).send());

});

app.delete('/todos/:id', (req,res) => {
  var hexId = req.params.id;
  if(!ObjectID.isValid(hexId)){
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(hexId).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo})
  }).catch((err) => res.status(400).send());
});

app.patch('/todos/:id', (req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed']);

  console.log(JSON.stringify(body,undefined,2));

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id,{$set : body},{new : true})
  .then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => res.status(404).send());

});

app.listen(port, () => {
  console.log(`Started server on port ${port}`);
});

module.exports = {app};
