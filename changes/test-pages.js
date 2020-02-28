//const credentials       =   require('../config/credentials') //not here
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
//let User = require('../models/user'); //not here
let ActualTotalLoad = require('../app/models/ActualTotalLoad.model.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server.js');
let should = chai.should();
let expect =chai.expect()
chai.use(chaiHttp);


describe('Test Cases that can be done by anybody', () => {
    
    it('Checking if Health Check works', (done) => {
   
      chai.request(server)
      .get('/energy/api/HealthCheck')
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        done();
      })
    })

      });
      
      
let admin_token = ''

describe('Admin Test Cases', () => {
    
    it('Checking if log in for admin works', (done) => {
   
      let user = {
        username: "admin",
        passw: "321nimda"
      };
      chai.request(server)
      .post('/energy/api/Login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        admin_token = res.body.token
        done();
      })
    })

    it('Checking if admin can add a new user', (done) => {

          let user = {
            username: "vag",
            email: "vag@user.com",
            passw : "123",
            quota : 5
          };
          
          chai.request(server)
          .post('/energy/api/Admin/users')
          .set('x-observatory-auth', admin_token)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        });
        
       it('Checking if admin can modify user', (done) => {

          let user = {
            username: "vag",
            email: "vag@user.com",
            passw : "123",
            quota : 42
          };
          
          chai.request(server)
          .put('/energy/api/Admin/users/vag')
          .set('x-observatory-auth', admin_token)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        });
        
      it('Checking if admin can see the userstatus', (done) => {
          
          chai.request(server)
          .get(`/energy/api/Admin/users/vag`)
          .set('x-observatory-auth', admin_token)
          .send()
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
            res.body[0].should.have.property('user')
            res.body[0].should.have.property('email')
            res.body[0].should.have.property('quota')
            done();
          });
        }) 
      
       it('Checking if Admin can Logout', (done) => {
          
          chai.request(server)
          .post(`/energy/api/Logout`)
          .set('x-observatory-auth', admin_token)
          .send()
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        }) 
      });
      
let user_token=' '
      
describe('Simple User Test Cases', () => {
    
    it('Checking if simple user can Log in', (done) => {
   
      let user = {
        username: "vag",
        passw: "123"
      };
      chai.request(server)
      .post('/energy/api/Login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        user_token = res.body.token
        done();
      })
    })

    it('Checking status received by question 1a', (done) => {

          let user = {
            username: "vag",
            email: "vag@user.com",
            passw : "123",
            quota : 5
          };
          
          chai.request(server)
          .get('/energy/api/ActualTotalLoad/Austria/PT15M/date/2018-01-04')
          .set('x-observatory-auth', user_token)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        });
        
          it('Checking status received by question 1b', (done) => {

          let user = {
            username: "vag",
            email: "vag@user.com",
            passw : "123",
            quota : 5
          };
          
          chai.request(server)
          .get('/energy/api/ActualTotalLoad/Austria/PT15M/month/2018-01')
          .set('x-observatory-auth', user_token)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        });
        
          it('Checking status and answer received by question 1c', (done) => {

          let user = {
            username: "vag",
            email: "vag@user.com",
            passw : "123",
            quota : 5
          };
          
          chai.request(server)
          .get('/energy/api/ActualTotalLoad/Austria/PT15M/year/2018')
          .set('x-observatory-auth', user_token)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body[0].Source.should.be.equal('entso-e')
            res.body[0].Dataset.should.be.equal('ActualTotalLoad')
            res.body[0].AreaName.should.be.equal('Austria')
            res.body[0].AreaTypeCode.should.be.equal('CTY')
            res.body[0].MapCode.should.be.equal('AT')
            res.body[0].ResolutionCode.should.be.equal('PT15M')
            res.body[0].Year.should.be.equal(2018)
            res.body[0].Month.should.be.equal(1)
            res.body[0].ActualTotalLoadByMonthValue.should.be.equal(6542441.6)
            
            done();
          });
        });
        
        
          it('Checking status received by question 2a', (done) => {

          let user = {
            username: "vag",
            email: "vag@user.com",
            passw : "123",
            quota : 5
          };
          
          chai.request(server)
          .get('/energy/api/AggregatedGenerationPerType/Austria/Fossil Gas/PT15M/date/2018-01-06')
          .set('x-observatory-auth', user_token)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        });
        
         it('Checking status received by question 2b', (done) => {

          let user = {
            username: "vag",
            email: "vag@user.com",
            passw : "123",
            quota : 5
          };
          
          chai.request(server)
          .get('/energy/api/AggregatedGenerationPerType/Austria/Fossil Gas/PT15M/month/2018-01')
          .set('x-observatory-auth', user_token)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        });
        
        it('Checking status and answer received by question 2c', (done) => {

          let user = {
            username: "vag",
            email: "vag@user.com",
            passw : "123",
            quota : 5
          };
          
          chai.request(server)
          .get('/energy/api/AggregatedGenerationPerType/Austria/Fossil Gas/PT15M/year/2018')
          .set('x-observatory-auth', user_token)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body[0].Source.should.be.equal('entso-e')
            res.body[0].Dataset.should.be.equal('AggregatedGenerationPerType')
            res.body[0].AreaName.should.be.equal('Austria')
            res.body[0].AreaTypeCode.should.be.equal('CTY')
            res.body[0].MapCode.should.be.equal('AT')
            res.body[0].ResolutionCode.should.be.equal('PT15M')
            res.body[0].Year.should.be.equal(2018)
            res.body[0].Month.should.be.equal(1)
            res.body[0].ProductionType.should.be.equal('Fossil Gas')
            res.body[0].ActualGenerationOutputByDayValue.should.be.equal(915122.8)
            done();
          });
        });
        
          it('Checking status received by question 3a', (done) => {

          let user = {
            username: "vag",
            email: "vag@user.com",
            passw : "123",
            quota : 5
          };
          
          chai.request(server)
          .get('/energy/api/DayAheadTotalLoadForecast/Slovakia/PT60M/date/2018-01-01')
          .set('x-observatory-auth', user_token)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        });
        
         it('Checking status received by question 3b', (done) => {

          let user = {
            username: "vag",
            email: "vag@user.com",
            passw : "123",
            quota : 5
          };
          
          chai.request(server)
          .get('/energy/api/DayAheadTotalLoadForecast/Slovakia/PT60M/month/2018-01')
          .set('x-observatory-auth', user_token)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        });
        
        it('Checking status received by question 3c', (done) => {

          let user = {
            username: "vag",
            email: "vag@user.com",
            passw : "123",
            quota : 5
          };
          
          chai.request(server)
          .get('/energy/api/DayAheadTotalLoadForecast/Slovakia/PT60M/year/2018')
          .set('x-observatory-auth', user_token)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body[0].Source.should.be.equal('entso-e')
            res.body[0].Dataset.should.be.equal('DayAheadTotalLoadForecast')
            res.body[0].AreaName.should.be.equal('Slovakia')
            res.body[0].AreaTypeCode.should.be.equal('CTY')
            res.body[0].MapCode.should.be.equal('SK')
            res.body[0].ResolutionCode.should.be.equal('PT60M')
            res.body[0].Year.should.be.equal(2018)
            res.body[0].Month.should.be.equal(1)
            res.body[0].DayAheadTotalLoadForecastByDayValue.should.be.equal(17786160)
            done();
          });
        });
        
       it('Checking status received by question 4a', (done) => {

          let user = {
            username: "vag",
            email: "vag@user.com",
            passw : "123",
            quota : 5
          };
          
          chai.request(server)
          .get('/energy/api/ActualvsForecast/Austria/PT15M/date/2018-01-04')
          .set('x-observatory-auth', user_token)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        });
        
         it('Checking status received by question 4b', (done) => {

          let user = {
            username: "vag",
            email: "vag@user.com",
            passw : "123",
            quota : 5
          };
          
          chai.request(server)
          .get('/energy/api/ActualvsForecast/Austria/PT15M/month/2018-01')
          .set('x-observatory-auth', user_token)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
        });
        
          it('Checking status and answer received by question 4c', (done) => {

          let user = {
            username: "vag",
            email: "vag@user.com",
            passw : "123",
            quota : 5
          };
          
          chai.request(server)
          .get('/energy/api/ActualvsForecast/Austria/PT15M/year/2018')
          .set('x-observatory-auth', user_token)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body[0].Source.should.be.equal('entso-e')
            res.body[0].Dataset.should.be.equal('ActualVSForecastTotalLoad')
            res.body[0].AreaName.should.be.equal('Austria')
            res.body[0].AreaTypeCode.should.be.equal('CTY')
            res.body[0].MapCode.should.be.equal('AT')
            res.body[0].ResolutionCode.should.be.equal('PT15M')
            res.body[0].Year.should.be.equal(2018)
            res.body[0].Month.should.be.equal(1)
            res.body[0].DayAheadTotalLoadForecastByDayValue.should.be.equal(16118466908.64)
            res.body[0].ActualTotalLoadValue.should.be.equal(15059135078.4)
            done();
          });
        });
    });
