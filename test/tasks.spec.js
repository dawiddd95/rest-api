import request from 'supertest';
import chai from 'chai';

import app from '../server';
import models from '../db/models';
import {tasks, task} from './fixtures';


describe('GET /tasks', () => {
   it('List all records', done => {
      request(app)
         .get('/api/v1.0.0/tasks')
         .set('Accept', 'application/json')
         .expect('Content-Type', /json/)
         .expect(200)
         .then(response => {
            chai.expect(response.body).to.be.a('array')
            chai.expect(response.body).to.have.lengthOf(5)
            done()
         })
   })

   it('show one record by id', done => {
      request(app)
         .get('/api/v1.0.0/tasks/12')
         .set('Accept', 'application/json')
         .expect('Content-Type', /json/)
         .expect(200)
         .then(response => {
            chai.expect(response.body).to.be.a('object')
            chai.expect(response.body).to.deep.equal(tasks[1])
            done()
         })
   })

   it('respond with json task not found', done => {
      request(app)
         .get('/api/v1.0.0/tasks/99999')
         .set('Accept', 'application/json')
         .expect('Content-Type', /json/)
         .expect(404)
         .expect('{"message":"Cannot find task"}', done) 
   })

   it('respond with json invalid input syntax for integer', done => {
      request(app)
         .get('/api/v1.0.0/tasks/someid')
         .set('Accept', 'application/json')
         .expect('Content-Type', /json/)
         .expect(500)
         .expect('{"message":"invalid input syntax for integer: \\"someid\\""}', done) 
   })
})


describe('POST /tasks', () => {
   it('respond with 201 created', done => {
      request(app)
         .post('/api/v1.0.0/tasks')
         .send(task)
         .set('Accept', 'application/json')
         .expect('Content-Type', /json/)
         .expect(201)
         .then(response => {
            chai.expect(response.body).to.be.a('object')
            chai.expect(response.body).to.have.property('id')
            chai.expect(response.body).to.have.property('title')
            chai.expect(response.body).to.have.property('description')
            chai.expect(response.body).to.have.property('done')
            chai.expect(response.body).to.have.property('updatedAt')
            chai.expect(response.body).to.have.property('createdAt')
            done()
         })
   })

   it('respond with 422 validation error', done => {
      request(app)
         .post('/api/v1.0.0/tasks')
         .send({title: "test", description: "test"})
         .set('Accept', 'application/json')
         .expect('Content-Type', /json/)
         .expect(422, done) 
   })

   after(async () => {
      await models.Task.destroy({where: {title: 'Task #1374'}})
   })
})


describe('DELETE /tasks/:id', () => {
   before(async () => {
      await models.Task.create({id: 1234, title: 'Task #1374', description: 'desc', done: true})
   })

   it('Deletes a record by id', done => {
      request(app)
         .delete('/api/v1.0.0/tasks/1234')
         .set('Accept', 'application/json')
         .expect('Content-Type', /json/)
         .expect(200)
         .then(response => {
            chai.expect(response.body).to.be.a('object')
            chai.expect(response.body).to.deep.equal({
               message: 'Deleted Task'
            })
            done()
         })
   });
});

describe('PATCH /tasks/:id', () => {
   it('Updates a record by id', done => {
      task.title = 'Updated title'

      request(app)
         .patch('/api/v1.0.0/tasks/11')
         .send(task)
         .set('Accept', 'application/json')
         .expect('Content-Type', /json/)
         .expect(200)
         .then(response => {
            chai.expect(response.body).to.be.a('object')
            chai.expect(response.body).to.have.property('id')
            chai.expect(response.body).to.have.property('title')
            chai.expect(response.body).to.have.property('description')
            chai.expect(response.body).to.have.property('done')
            chai.expect(response.body).to.have.property('updatedAt')
            chai.expect(response.body).to.have.property('createdAt')
            done()
         })
   })

   after(async () => {
      await models.Task.update({title: 'title'}, {where: {id: 11}})
   })
})