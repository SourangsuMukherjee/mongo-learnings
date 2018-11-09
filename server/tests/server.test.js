const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb')

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


const todos = [{
  _id: new ObjectID(),
  text:'I am coming home'
},
  {
    _id: new ObjectID(),
    text:'I am going to work'}];

beforeEach((done) => {
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
//Success test for POST request
  it('should create a new todo', (done) => {
    var text = 'This is from test file';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text)
    })
    .end((err,res) => {
      if(err){
        return done(err);
      }
      Todo.find({text})
      .then( (todos) =>{
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((err) => done(e));
    });
  });
//Failure case in POST requests
  it('should not create a todo with invalid data body', (done) => {

    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err,res) => {
      if(err){
        return done(err);
      }
      Todo.find()
      .then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((err) => done(err))
    });
  });
});

describe('GET /todos/id', (done) => {
  it('should give 404 for non ObjectID', (done) =>{
    request(app)
    .get('/todos/123abc')
    .expect(404)
    .end(done);
  });

  it('should give 404 if objectId not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
    .get(`/todos/${hexId}`)
    .expect(404)
    .end(done);
  });

  it('should have a todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(todos[0].text)
    })
    .end(done);
  });

});

describe('GET /todos', (done) => {
  it('should get all todos', () => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

describe('DELETE /todo/:id', ()=>{

  it('it should delete a todo', (done)=>{
    var hexId = todos[1]._id.toHexString();

    request(app)
    .delete(`/todos/${hexID}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo._id).toBe(hexId)
    })
    .end((err,res) => {
      if(err){
        return done(err);
      }
      Todo.findById(hexId).then((todo) =>{
        expect(todo).toNotExist();
        done();
      }).catch((err) => done(err));
    });
  });

  it('should return 404 if todo not found', (done) =>{
    var hexId = new ObjectID().toHexString();

    request('app')
    .delete(`/todos/${hexID}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 id _id is invalid', (done)=>{
    request(app)
    .delete(`/todos/${hexID}`)
    .expect(404)
    .end(done);
  });
});
