const {MongoClient, ObjectID} = require('mongodb');
//const MongoClient = require('mongodb').MongoClient;

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) =>{
  if(err){
    return console.log('Unable to connect To MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false}, (err,result) => {
      if(err){
        return console.log('Unable to insert todo',err);
      }
      console.log(JSON.stringify(result.ops,undefined,2));
    });

  //Insert New document to the users collection
  db.collection('Users').insertOne({
    name: "Subhrangsu Mukherjee",
    age: 32,
    location: "Munich"
  }, (err,result) => {
    if(err) {
      return console.log('Unable to insert user',err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  db.close();
});
