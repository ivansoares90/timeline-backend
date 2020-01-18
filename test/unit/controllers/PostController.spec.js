var request = require('supertest');
var agent;

require('../../bootstrap');

describe('POST /posts', () => {
    before(function (done) {
        agent = request.agent(sails.hooks.http.app);
        done();
    })

    beforeEach(async () => {
        await agent.delete('/logout');
    })

    it("should add a post to the session user", async () => {
        const createdUser = await User.create({
            username: 'john_doe',
            password: '12345'
        }).fetch();

        const loginResponse = await agent.post('/login').send({
            username: 'john_doe',
            password: '12345'
        });

        const postResponse = await agent.post('/posts').send({
            text: 'This is my new post!'
        })

        postResponse.status.should.be.equal(200);
        postResponse.body.should.be.an('object');
        postResponse.body.should.have.property('userId', createdUser.id);
        postResponse.body.should.have.property('text', 'This is my new post!');
    });

    it('should not be able to add a post and return forbidden if user is not logged in', async () => {
        const postResponse = await agent.post('/posts').send({
            text: 'This is my new post!'
        })

        postResponse.status.should.be.equal(403);
    })
});

describe('GET /posts', () => {
    before(function (done) {
        agent = request.agent(sails.hooks.http.app);
        done();
    })

    beforeEach(async () => {
        await agent.delete('/logout');
    })

    it('should return all posts if user is logged in', async () => {
        const createdUser = await User.create({
            username: 'john_doe',
            password: '12345'
        }).fetch();

        const createdPosts = await Post.createEach([{
            text: 'post1',
            userId: createdUser.id
        }, {
            text: 'post2',
            userId: createdUser.id
        }]).fetch();

        const loginResponse = await agent.post('/login').send({
            username: 'john_doe',
            password: '12345'
        });

        const response = await agent.get('/posts');
        
        response.status.should.be.equal(200);
        response.body.should.be.an('array');
        response.body[0].should.have.property('userId', createdUser.id);
        response.body[0].should.have.property('text', 'post1');
        response.body[1].should.have.property('userId', createdUser.id);
        response.body[1].should.have.property('text', 'post2');
    });

    it('should not be able to get all posts and return forbidden if user is not logged in', async () => {
        const postResponse = await agent.get('/posts');

        postResponse.status.should.be.equal(403);
    })
});