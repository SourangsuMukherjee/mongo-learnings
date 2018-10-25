const {MongoClient, ObjectID} = require('mongodb');
//const MongoClient = require('mongodb').MongoClient;

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) =>{
  if(err){
    return console.log('Unable to connect To MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').deleteMany({text : "Lives are at stake"})
  .then((res) => {
    console.log(res);
  });

  db.collection('Todos').deleteOne({text : "Here goes nothing"})
  .then((res) => {
    console.log(res);
  });

  db.collection('Todos').findOneAndDelete({text : "Here goes nothing"})
  .then((res) => {
    console.log(res);
  });


  // db.close();
});
