module.exports = app => {
  const entry = require("../controlers/entry.controller.js");

  // Retrieve a single Entry with Id
  app.get("/entry/:Id", entry.findOne);
  
  app.get("/energy/api/ActualTotalLoad/:AreaName/:Resolution/date/:Year-:Month-:Day", entry.findTwo);
  
  app.get("/energy/api/ActualTotalLoad/:AreaName/:Resolution/month/:Year-:Month", entry.findThree);
  
  app.get("/energy/api/ActualTotalLoad/:AreaName/:Resolution/year/:Year", entry.findFour);
  
  app.get("/energy/api/AggregatedGenerationPerType/:AreaName/AllTypes/:Resolution/date/:Year-:Month-:Day", entry.findEight);
  
  app.get("/energy/api/AggregatedGenerationPerType/:AreaName/AllTypes/:Resolution/month/:Year-:Month", entry.findNine);
  
  app.get("/energy/api/AggregatedGenerationPerType/:AreaName/AllTypes/:Resolution/year/:Year", entry.findTen);
  
  app.get("/energy/api/AggregatedGenerationPerType/:AreaName/:ProductionType/:Resolution/date/:Year-:Month-:Day", entry.findFive);
  
  app.get("/energy/api/AggregatedGenerationPerType/:AreaName/:ProductionType/:Resolution/month/:Year-:Month", entry.findSix);
  
  app.get("/energy/api/AggregatedGenerationPerType/:AreaName/:ProductionType/:Resolution/year/:Year", entry.findSeven);
  
  app.get("/energy/api/DayAheadTotalLoadForecast/:AreaName/:Resolution/date/:Year-:Month-:Day", entry.findEleven);
  
  app.get("/energy/api/DayAheadTotalLoadForecast/:AreaName/:Resolution/month/:Year-:Month", entry.findTwelve);
  
  app.get("/energy/api/DayAheadTotalLoadForecast/:AreaName/:Resolution/year/:Year", entry.findThirteen);
  
  app.get("/energy/api/ActualvsForecast/:AreaName/:Resolution/date/:Year-:Month-:Day", entry.findFourteen);
  
  app.get("/energy/api/ActualvsForecast/:AreaName/:Resolution/month/:Year-:Month", entry.findFifteen);
  
  app.get("/energy/api/ActualvsForecast/:AreaName/:Resolution/year/:Year", entry.findSixteen);
  
  app.get('*', function(req, res){
  	res.status(400).send('Error 400: Bad Request');
  });
	  
};
