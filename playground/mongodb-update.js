const {MongoClient, ObjectID} = require('mongodb');
//const MongoClient = require('mongodb').MongoClient;

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) =>{
  if(err){
    return console.log('Unable to connect To MongoDB server');
  }
  console.log('Connected to MongoDB server');

//   db.collection('Todos').findOneAndUpdate({
//     _id : new ObjectID("5bd1f2123288179751e3e06a")},
//   { $set : {
//     completed : true
//   }},
// { returnOriginal : false})
// .then((res) => {
//   console.log(res);
// })

db.collection('Users').findOneAndUpdate({
  _id : new ObjectID("5bd13799fb133e167721dd13")},
{ $set : {
  name : "Subhrangsu Mukherjee"
},
 $inc : {
  age : 1
}},
{ returnOriginal : false})
.then((res) => {
console.log(res);
})

  // db.close();
});
