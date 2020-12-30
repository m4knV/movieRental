// TESTING ENVIRONMENT

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Movie = require('../api/models/movie');
const checkAuth = require('../api/middleware/check-auth');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Movies', () => {
    beforeEach((done) => { //Before each test we empty the database
        Movie.remove({}, (err) => {
            done();
        });
    });
/*
* Test the /GET route
*/
    describe('/GET movies', () => {
        it('it should GET all the movies', (done) => {
            chai.request(app)
                .get('/movies')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    /*
 * Test the /POST route
 */
    describe('/POST movies', () => {
        it('it should not POST a movie without title', (done) => {
            let book = {
                genre: "some garbage",
                descr: "some garbage",
                year: 1990
            };
            chai.request(app)
                .post('/movies')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.have.property('errors');
                    res.body.error.errors.should.have.property('title');
                    res.body.error.errors.title.should.have.property('message').equal('Path `title` is required.');
                    res.body.error.errors.title.should.have.property('kind').equal('required');
                    res.body.error.errors.title.should.have.property('path').equal('title');
                    done();
                });
        });
        it('it should not POST a movie without genre', (done) => {
            let book = {
                title: "some garbage",
                descr: "some garbage",
                year: 1990
            };
            chai.request(app)
                .post('/movies')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.have.property('errors');
                    res.body.error.errors.should.have.property('genre');
                    res.body.error.errors.genre.should.have.property('message').equal('Path `genre` is required.');
                    res.body.error.errors.genre.should.have.property('kind').equal('required');
                    res.body.error.errors.genre.should.have.property('path').equal('genre');
                    done();
                });
        });
        it('it should not POST a movie without description', (done) => {
            let book = {
                title: "some garbage",
                genre: "some garbage",
                year: 1990
            };
            chai.request(app)
                .post('/movies')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.have.property('errors');
                    res.body.error.errors.should.have.property('descr');
                    res.body.error.errors.descr.should.have.property('message').equal('Path `descr` is required.');
                    res.body.error.errors.descr.should.have.property('kind').equal('required');
                    res.body.error.errors.descr.should.have.property('path').equal('descr');
                    done();
                });
        });
        it('it should not POST a movie without year', (done) => {
            let book = {
                title: "some garbage",
                genre: "some garbage",
                descr: "some garbage"
            };
            chai.request(app)
                .post('/movies')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    res.body.error.should.have.property('errors');
                    res.body.error.errors.should.have.property('year');
                    res.body.error.errors.year.should.have.property('message').equal('Path `year` is required.');
                    res.body.error.errors.year.should.have.property('kind').equal('required');
                    res.body.error.errors.year.should.have.property('path').equal('year');
                    done();
                });
        });
        it('it should not POST a movie with all the required fields', (done) => {
            let book = {
                title: "some garbage 1",
                genre: "some garbage 2",
                descr: "some garbage 3",
                year: 2000
            };
            chai.request(app)
                .post('/movies')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').equal('Created movie successfully');
                    res.body.should.have.property('createdMovie');
                    res.body.createdMovie.should.have.property('title').equal('some garbage 1');
                    res.body.createdMovie.should.have.property('genre').equal('some garbage 2');
                    res.body.createdMovie.should.have.property('descr').equal('some garbage 3');
                    res.body.createdMovie.should.have.property('year').equal(2000);
                    done();
                });
        });
    });
});
