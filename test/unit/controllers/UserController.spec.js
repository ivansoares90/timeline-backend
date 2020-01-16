const supertest = require('supertest');

require('../../bootstrap');

describe('POST /users', () => {
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

describe('/POST login', () => {
    it('should login if valid credentials', (done) => {
        let createdUserId = null;
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

                createdUserId = result.body.id;

                agent
                    .post('/login')
                    .set('Accept', 'application/json')
                    .send({
                        "username": "john_doe",
                        "password": "123456"
                    })
                    .end((err, result) => {
                        if (err) {
                            return done(err);
                        }

                        result.status.should.be.equal(200);
                        result.body.should.be.an('object');
                        result.body.should.have.property('id', createdUserId);
                        result.body.should.have.property('username', 'john_doe');
                        result.body.should.not.have.property('password');
                        done();
                    })
            });
    })
    it('should not login if invalid credentials', (done) => {
        let createdUserId = null;
        const agent = supertest.agent(sails.hooks.http.app);
        agent
            .post('/users')
            .set('Accept', 'application/json')
            .send({
                "username": "john_doe",
                "password": "123456"
            })
            .end((err, result) => {
                if (err) {
                    return done(err);
                }

                result.status.should.be.equal(200);

                createdUserId = result.body.id;

                agent
                    .post('/login')
                    .set('Accept', 'application/json')
                    .send({
                        "username": "john_doe",
                        "password": "wrongpassword"
                    })
                    .end((err, result) => {
                        if (err) {
                            return done(err);
                        }

                        result.status.should.be.equal(403);
                        result.text.should.include('Forbidden');

                        //result.body.should.be.an('object');
                        //result.body.should.have.property('id', createdUserId);
                        done();
                    })
            });
    });
});

describe('DELETE /logout', () => {
    it('should destroy the user session', (done) => {
        const agent = supertest.agent(sails.hooks.http.app);
        agent
            .delete('/logout')
            .set('Accept', 'application/json')
            .end((err, result) => {
                if (err) return done(err);

                result.status.should.be.equal(200);

                done();
            })
    });
})





/*describe('/GET Users', () => {
    it("should return all users with posts", (done) => {
        const agent = supertest.agent(sails.hooks.http.app);
        agent
            .get('/users')
            .end((err, result) => {
                if (err) return done(err);

                result.status.should.be.equal(200);

                done();
        })
    })

    it("should return not found if there arent users", (done) => {
        const agent = supertest.agent(sails.hooks.http.app);
        agent
            .get('/users')
            .end((err, result) => {
                if (err) return done(err);

                result.status.should.be.equal(404);

                done();
        })
    })
});*/