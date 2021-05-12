const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const { response } = require("express");
const User = require("../models/User")

//Assertion style
chai.should();

chai.use(chaiHttp);

let defaultUser = {
  name: "TestUser",
  username: "TestUser",
  password: "TestUser@123",
  password2: "TestUser@123",
};

let defaultUserLoginTest = {
  username: "TestUser",
  password: "TestUser@123",
};




        describe('Testing APIs', function() {

                it('Should Register user, Login user, Create Token, Getting Global Messages', function(done) {
                    chai.request(server)

                        // register request
                        .post('/api/users/register')
                        .send(defaultUser)

                        .end((err, res) => {

                            // follow up with login
                            chai.request(server)
                                .post('/api/users/login')
                                .send(defaultUserLoginTest)
                                .end((err, res) => {
                                    console.log('this runs the login part');
                                    res.body.should.have.property('token');
                                    var token = res.body.token;

                                    // follow up with getting global messages
                                    chai.request(server)
                                        .get('/api/messages/global')
                                                // we set the auth header with our token
                                        .set('Authorization', token)
                                                .end(function(error, res) {
                                                    res.should.have.status(200);
                                                      done();
                                                });
                                        })
                                })
                        })
                  })



        describe('Testing APIs', function() {

                it('Should Register user, Login user, Create Token, Posting Global Messages', function(done) {
                    chai.request(server)

                        // register request
                        .post('/api/users/register')
                        .send(defaultUser)
                        .end((err, res) => {

                            // follow up with login
                            chai.request(server)
                                .post('/api/users/login')
                                .send(defaultUserLoginTest)
                                .end((err, res) => {
                                    res.body.should.have.property('token');
                                    var token = res.body.token;

                                    // follow up with getting global messages
                                    chai.request(server)
                                        .post('/api/messages/global')
                                                // we set the auth header with our token
                                        .set('Authorization', token)
                                        .send({
                                          body: "Mirchi is pagal",
                                        })

                                                .end(function(error, res) {
                                                    res.body.message.should.be.eq("Success");
                                                      done();
                                                });
                                        })
                                })
                        })
                })

            describe('Testing APIs', function() {

                        it('Should Register user, Login user, Create Token, Getting Conversation List', function(done) {
                            chai.request(server)

                                // register request
                                .post('/api/users/register')
                                .send(defaultUser)

                                .end((err, res) => {

                                    // follow up with login
                                    chai.request(server)
                                        .post('/api/users/login')
                                        .send(defaultUserLoginTest)
                                        .end((err, res) => {
                                            console.log('this runs the login part');
                                            res.body.should.have.property('token');
                                            var token = res.body.token;

                                            // follow up with getting global messages
                                            chai.request(server)
                                                .get('/api/messages/conversations')
                                                        // we set the auth header with our token
                                                .set('Authorization', token)
                                                        .end(function(error, res) {
                                                            //console.log(res.body);
                                                              done();
                                                        });
                                                })
                                        })
                                })
                          })



                describe('Testing APIs', function() {

                              it('Should Register user, Login user, Create Token, Getting Conversation Messages', function(done) {
                                          chai.request(server)

                                              // register request
                                              .post('/api/users/register')
                                              .send(defaultUser)

                                              .end((err, res) => {

                                                  // follow up with login
                                                  chai.request(server)
                                                      .post('/api/users/login')
                                                      .send(defaultUserLoginTest)
                                                      .end((err, res) => {
                                                          res.body.should.have.property('token');
                                                          var token = res.body.token;

                                                          // follow up with getting
                                                          chai.request(server)
                                                              .get('/api/messages/conversations/query')
                                                                      // we set the auth header with our token
                                                              .set('Authorization', token)
                                                              .send({
                                                                user2: "608aecb039b2c4c0639bb033",
                                                              })
                                                                      .end(function(error, res) {
                                                                          res.statusCode.should.be.eq(200);
                                                                            done();
                                                                      });
                                                              })
                                                      })
                                              })
                                        })



                describe('Testing APIs', function() {

                              it('Should Register user, Login user, Create Token, Private Conversation Messages', function(done) {
                                          chai.request(server)

                                              // register request
                                              .post('/api/users/register')
                                              .send(defaultUser)

                                              .end((err, res) => {

                                                  // follow up with login
                                                  chai.request(server)
                                                      .post('/api/users/login')
                                                      .send(defaultUserLoginTest)
                                                      .end((err, res) => {
                                                          res.body.should.have.property('token');
                                                          var token = res.body.token;

                                                          // follow up with getting
                                                          chai.request(server)
                                                              .post('/api/messages')
                                                                      // we set the auth header with our token
                                                              .set('Authorization', token)
                                                              .send({
                                                                to: "608aecb039b2c4c0639bb033",
                                                                body: "Final Test case",
                                                              })
                                                                      .end(function(error, res) {
                                                                          res.statusCode.should.be.eq(200);
                                                                            done();
                                                                      });
                                                              })
                                                      })
                                              })
                                        })

