const supertest = require('supertest');

require('../../bootstrap');

describe('/POST Users', () => {
    let createdUserId = 0;

    it('should return a created user', (done) => {
        const agent = supertest.agent(sails.hooks.http.app);
        agent
            .post('/users')
            .set('Accept', 'application/json')
            .send({
                "username": "john_doe",
                "password": "123456"
            })
            .expect('Content-Type', /json/)
            .end((err, result) => {
                if (err) {
                    return done(err);
                }

                result.status.should.be.equal(200);

                result.body.should.be.an('object');
                result.body.should.have.property('id');
                result.body.should.have.property('username', 'john_doe');
                result.body.should.not.have.property('password');
                createdPostId = result.body.id;

                done();
            })
    });

    it('should return server error if creates an user with same name', (done) => {
        const agent = supertest.agent(sails.hooks.http.app);
        agent
            .post('/users')
            .set('Accept', 'application/json')
            .send({
                "username": "john_doe",
                "password": "123456"
            })
            .expect('Content-Type', /json/)
            .end((err, result) => {
                if (err) {
                    return done(err);
                }

                result.status.should.be.equal(200);

                agent
                    .post('/users')
                    .set('Accept', 'application/json')
                    .send({
                        "username": "john_doe",
                        "password": "123456"
                    })
                    .expect('Content-Type', /json/)
                    .end((err, result) => {
                        if (err) {
                            return done(err);
                        }

                        result.status.should.be.equal(500);

                        done();
                    });
            });
    });

    it('should return status 422 if param names are invalid', (done) => {
        const agent = supertest.agent(sails.hooks.http.app);
        agent
            .post('/users')
            .set('Accept', 'application/json')
            .send({
                "uzername": "John Doe",
                "pazzword": "123456"
            })
            .end((err, result) => {
                if (err) return done(err);

                result.status.should.be.equal(402);

                done();
            })
    })
});
