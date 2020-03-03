import {expect, test} from '@oclif/test'

describe('Checking main CLI commands for Admin', () => {

  test
  .stdout()
  .command(['HealthCheck'])
  .it('HealthCheck works fine', ctx => {
    expect(ctx.stdout).to.contain(JSON.parse('{ "status": "OK" }'))
  })
  
  test
  .stdout()
  .command(['Login','--username','admin','--passw','321nimda'])
  .it('Logs in succesfully', ctx => {
    expect(ctx.stdout).to.contain('Successfully logged in')
  })
  
  test
  .stdout()
  .command(['Admin','--newuser','panos','--passw','0000','--email','panos@user.com','--quota','42'])
  .it('Inserts user succesfully', ctx => {
    expect(ctx.stdout).to.contain('User inserted succesfully')
  })

  test
  .stdout()
  .command(['Admin','--moduser','panos','--passw','0000','--email','panos@user.com','--quota','52'])
  .it('Modifies user succesfully', ctx => {
    expect(ctx.stdout).to.contain('User modified succesfully')
  })
  
   test
  .stdout()
  .command(['Admin','--userstatus','panos'])
  .it('Userstatus works fine', ctx => {
    expect(ctx.stdout).to.contain(JSON.parse('{"user": "panos","email": "panos@user.com","quota": "52"}'))
  })
  
   test
  .stdout()
  .command(['Logout'])
  .it('Logs out succesfully', ctx => {
    expect(ctx.stdout).to.contain('Successfully Logged out')
  })
 
})

describe('Checking main CLI commands for simple User', () => {

  test
  .stdout()
  .command(['Login','--username','panos','--passw','0000'])
  .it('Logs in succesfully', ctx => {
    expect(ctx.stdout).to.contain('Successfully logged in')
  })
  
  test
  .stdout()
  .command(['ActualTotalLoad','--area','Austria','--timeres','PT15M','--year','2018'])
  .it('ActualTotalLoad Question 1C works fine', ctx => {
    expect(ctx.stdout).to.contain(JSON.parse('{ "Source": "entso-e","Dataset": "ActualTotalLoad","AreaName": "Austria","AreaTypeCode": "CTY","MapCode": "AT","ResolutionCode": "PT15M","Year": "2018","Month": "1", "ActualTotalLoadByMonthValue": "6542441.6"}'))
  })
  
  test
  .stdout()
  .command(['AggregatedGenerationPerType','--area','Austria','--prodtype','Fossil Gas','--timeres','PT15M','--year','2018'])
  .it('AggregatedGenerationPerType Question 2C works fine', ctx => {
    expect(ctx.stdout).to.contain(JSON.parse('{ "Source": "entso-e","Dataset": "AggregatedGenerationPerType","AreaName": "Austria","AreaTypeCode": "CTY","MapCode": "AT","ResolutionCode": "PT15M","Year": "2018","Month": "1",  "ProductionType": "Fossil Gas", "ActualGenerationOutputByDayValue": "915122.8"}'))
  })
  
    test
  .stdout()
  .command(['DayAheadTotalLoadForecast','--area','Slovakia','--timeres','PT60M','--year','2018'])
  .it('DayAheadTotalLoadForecast Question 3C works fine', ctx => {
    expect(ctx.stdout).to.contain(JSON.parse('{ "Source": "entso-e","Dataset": "DayAheadTotalLoadForecast","AreaName": "Austria","AreaTypeCode": "CTY","MapCode": "SK","ResolutionCode": "PT60M","Year": "2018","Month": "1", "DayAheadTotalLoadForecastByDayValue": "17786160"}'))
  })
  
   test
  .stdout()
  .command(['ActualvsForecast','--area','Austria','--timeres','PT15M','--year','2018'])
  .it('ActualVSForecast Question 4C works fine', ctx => {
    expect(ctx.stdout).to.contain(JSON.parse('{ "Source": "entso-e","Dataset": "ActualVSForecastTotalLoad","AreaName": "Austria","AreaTypeCode": "CTY","MapCode": "AT","ResolutionCode": "PT15M","Year": "2018","Month": "1", "DayAheadTotalLoadForecastByDayValue": "16118466908.64","ActualTotalLoadValue":"15059135078.4"}'))
  })
  
    test
  .stdout()
  .command(['Logout'])
  .it('Logs out succesfully', ctx => {
    expect(ctx.stdout).to.contain('Successfully Logged out')
  })
})

  


