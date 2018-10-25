const {MongoClient, ObjectID} = require('mongodb');
//const MongoClient = require('mongodb').MongoClient;

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) =>{
  if(err){
    return console.log('Unable to connect To MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').find({completed : false}).toArray()
  .then((docs) => {
    console.log(JSON.stringify(docs,undefined,2))
  },(err) => {
    console.log('Unable to fetch docs',err);
  });

  db.collection('Todos').find().count()
  .then((count) => {
    console.log(count)
  },(err) => {
    console.log('Unable to fetch docs',err);
  });

  db.collection('Todos').find({
    _id : new ObjectID("5bd1de073288179751e3ddc4")
  }).toArray()
  .then((docs) => {
    console.log(JSON.stringify(docs,undefined,2))
  },(err) => {
    console.log('Unable to fetch docs',err);
  });

  // db.close();
});
