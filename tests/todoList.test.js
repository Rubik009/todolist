let chai = require('chai');
let chaiHttp = require('chai-http');
let request = require('supertest')
let server = require('../index')

chai.should();

chai.use(chaiHttp);

describe('Tasks API', () => {

    /**
     * test the GET route
     */
    describe('GET api/todo', () => {
        it('It should get list of tasks', async () => {
            const result = await request(server)
            .get('/api/todo')
            .set('Accept', 'application/json');
            result.should.have.status(200);
            result.body.should.be.a('object');
        })
    })
    /**
     * test GET/:name route
     */
     describe('GET api/todo/byName/:name', () => {
        it('It should get task of person by name', async () => {
            const result = await request(server)
            .get('/api/todo/byName/' + 'kirill')
            .set('Accept', 'application/json');
            result.should.have.status(200);
            result.should.be.a('object');
            result.body.should.have.property('task');
            result.body.task.should.have.property('author').eql('kirill');
        })
    })
    /**
     * test POST route
     */
    describe('POST api/todo/create', () => {
        let task = {
            "author" : "vova",
            "text" : "2879"
        }
        it('It should add task in database', async () => {
            const result = await request(server)
            .post('/api/todo/create')
            .send(task)
            .set('Accept', 'application/json');
            result.should.have.status(200);
            result.body.should.be.a('object');
            result.body.should.have.property('message').eql('Task added!');
            result.body.savedTasks.should.have.property('author').eql('vova');
        })
    })
    /**
     * test PATCH/:name route
     */
    describe('PATCH api/todo/edit/:name', () => {
        let task = {
            "text" : "999"
        }
        it('It should edit task of person database by name', async () => {
            const result = await request(server)
            .patch('/api/todo/edit/' + 'vova')
            .send(task)
            .set('Accept', 'application/json');
            result.should.have.status(200);
            result.body.should.have.property('message').eql("Task of vova edited");
        })
    })
    /**
     * test DELETE/:id route
     */
     describe('DELETE api/todo/deleteByName/:name', () => {
        it('It should delete person task by name', async () => {
            const result = await request(server)
            .delete('/api/todo/deleteByName/' + 'vova')
            .set('Accept', 'application/json');
            result.should.have.status(200);
            result.body.should.have.property('message').eql('Task of vova deleted!');
        })
    })
});