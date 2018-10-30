const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} =require('mongodb');
const {User} =require('./../server/models/user')

var id = "5bd20c03116b01197b13d605";

// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }

// Todo.find({ _id : id}).then((todos) => {
//   console.log('Todos',todos);
// }).catch((err) => {
//   console.log(err);
// });
//
// Todo.findOne({ _id : id}).then((todos) => {
//   console.log('Todo',todos);
// }).catch((err) => {
//   console.log(err);
// });

// Todo.findById(id).then((todo) => {
//   console.log('Todo by ID',todo);
// }).catch((e)=>console.log(e))

User.findById(id).then((user)=>{
  if(!user){
    return console.log('User not found');
  }
  console.log(JSON.stringify(user,undefined,2))
}).catch((err) => console.log(err));
