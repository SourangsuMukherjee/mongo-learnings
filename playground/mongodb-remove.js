const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} =require('mongodb');
const {User} =require('./../server/models/user')

Todo.remove({}).then((res) => {
  console.log(res);
});

Todo.findOneAndRemove({_id:'5be17a68fae1c6eed1722b8a'}).then((todo) => {
  console.log(todo);
});

Todo.findByIdAndRemove('5be17a68fae1c6eed1722b8a').then((todo) => {
  console.log(todo);
});
