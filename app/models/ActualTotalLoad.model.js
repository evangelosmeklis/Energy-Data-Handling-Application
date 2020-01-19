const sql = require("./db.js");

// constructor
const Entry = function(entry) {
  this.Id=entry.Id
  this.AreaName=entry.AreaName
  this.Resolution=entry.Resolution
  this.Year=entry.Year
  this.Month=entry.Month
  this.Day=entry.Day
};

Entry.findByPk = (Id, result) => {
  sql.query(`SELECT * FROM ActualTotalLoad WHERE Id= ${Id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found entry: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Entry.findByPars = (AreaName,Resolution,Year,Month,Day,result) => { //1a
  sql.query(`SELECT "entso-e" AS "Source","ActualTotalLoad" AS "Dataset",AreaName,AreaTypeCodeText AS "AreaTypeCode",MapCodeText AS "MapCode",ResolutionCodeText AS "ResolutionCode",Year,Month,Day,DateTime AS "DateTimeUTC",TotalLoadValue AS "ActualTotalLoadValue",UpdateTime AS "UpdateTimeUTC" FROM ActualTotalLoad AS A,AreaTypeCode AS T,MapCode AS M,ResolutionCode AS R WHERE AreaName = ? AND R.ResolutionCodeText = ? AND Year = ? AND Month = ? AND Day = ? AND A.ResolutionCodeId=R.Id AND A.MapCodeId=M.Id AND A.AreaTypeCodeId=T.Id`,[AreaName,Resolution,Year,Month,Day] , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found entry: ", res);
      result(null,res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Entry.findByPars2 = (AreaName,Resolution,Year,Month,result) => { //1b
  sql.query(`SELECT DISTINCT "entso-e" AS "Source","ActualTotalLoad" AS "Dataset",AreaName,AreaTypeCodeText AS "AreaTypeCode",MapCodeText AS "MapCode",ResolutionCodeText AS "ResolutionCode",A.Year,A.Month,A.Day,SUM(TotalLoadValue) FROM ActualTotalLoad AS A,AreaTypeCode AS T,MapCode AS M,ResolutionCode AS R WHERE AreaName = ? AND R.ResolutionCodeText = ? AND A.Year = ? AND A.Month = ? AND A.ResolutionCodeId=R.Id AND A.MapCodeId=M.Id AND A.AreaTypeCodeId=T.Id GROUP BY A.AreaName,A.AreaTypeCodeId,A.MapCodeId,A.ResolutionCodeId,A.Year,A.Month,A.Day`,[AreaName,Resolution,Year,Month] , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found entry: ", res);
      result(null,res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Entry.findByPars3 = (AreaName,Resolution,Year,result) => { //1c
  sql.query(`SELECT DISTINCT "entso-e" AS "Source","ActualTotalLoad" AS "Dataset",AreaName,AreaTypeCodeText AS "AreaTypeCode",MapCodeText AS "MapCode",ResolutionCodeText AS "ResolutionCode",A.Year,A.Month,SUM(TotalLoadValue) AS "ActualTotalLoadByMonthValue" FROM ActualTotalLoad AS A,AreaTypeCode AS T,MapCode AS M,ResolutionCode AS R WHERE AreaName = ? AND R.ResolutionCodeText = ? AND A.Year = ? AND A.Month AND A.ResolutionCodeId=R.Id AND A.MapCodeId=M.Id AND A.AreaTypeCodeId=T.Id GROUP BY A.AreaName,A.AreaTypeCodeId,A.MapCodeId,A.ResolutionCodeId,A.Year,A.Month`,[AreaName,Resolution,Year] , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found entry: ", res);
      result(null,res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Entry.findByPars4 = (AreaName,ProductionType,Resolution,Year,Month,Day,result) => { //2a
  sql.query(`SELECT DISTINCT "entso-e" AS "Source","AggregatedGenerationPerType" AS "Dataset",AreaName,AreaTypeCodeText AS "AreaTypeCode",MapCodeText AS "MapCode",ResolutionCodeText AS "ResolutionCode",A.Year,A.Month,A.Day,DateTime AS "DateTimeUTC",ProductionTypeText AS "ProductionType",ActualGenerationOutput AS "ActualGenerationOutputValue",UpdateTime AS "UpdateTimeUTC" FROM AggregatedGenerationPerType AS A,AreaTypeCode AS T,MapCode AS M,ResolutionCode AS R,ProductionType AS P WHERE AreaName = ? AND P.ProductionTypeText= ?  AND R.ResolutionCodeText = ? AND Year = ? AND Month = ? AND Day = ? AND A.ResolutionCodeId=R.Id AND A.MapCodeId=M.Id AND A.AreaTypeCodeId=T.Id AND P.Id=A.ProductionTypeId`,[AreaName,ProductionType,Resolution,Year,Month,Day] , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found entry: ", res);
      result(null,res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Entry.findByPars5 = (AreaName,ProductionType,Resolution,Year,Month,result) => { //2b
  sql.query(`SELECT DISTINCT "entso-e" AS "Source","AggregatedGenerationPerType" AS "Dataset",AreaName,T.AreaTypeCodeText AS "AreaTypeCode",MapCodeText AS "MapCode",ResolutionCodeText AS "ResolutionCode",A.Year,A.Month,A.Day,ProductionTypeText AS "ProductionType",SUM(ActualGenerationOutput) AS "ActualGenerationOutputByDayValue" FROM AggregatedGenerationPerType AS A,AreaTypeCode AS T,MapCode AS M,ResolutionCode AS R,ProductionType AS P WHERE AreaName = ?  AND P.ProductionTypeText= ? AND R.ResolutionCodeText = ? AND A.Year = ? AND A.Month = ? AND A.ResolutionCodeId=R.Id AND A.MapCodeId=M.Id AND A.AreaTypeCodeId=T.Id  AND A.ProductionTypeId=P.Id GROUP BY A.AreaName,A.AreaTypeCodeId,A.MapCodeId,A.ResolutionCodeId,A.Year,A.Month,A.Day`,[AreaName,ProductionType,Resolution,Year,Month] , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found entry: ", res);
      result(null,res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Entry.findByPars6 = (AreaName,ProductionType,Resolution,Year,result) => { //2c
  sql.query(`SELECT DISTINCT "entso-e" AS "Source","AggregatedGenerationPerType" AS "Dataset",AreaName,T.AreaTypeCodeText AS "AreaTypeCode",MapCodeText AS "MapCode",ResolutionCodeText AS "ResolutionCode",A.Year,A.Month,ProductionTypeText AS "ProductionType",SUM(ActualGenerationOutput) AS "ActualGenerationOutputByDayValue" FROM AggregatedGenerationPerType AS A,AreaTypeCode AS T,MapCode AS M,ResolutionCode AS R,ProductionType AS P WHERE AreaName = ? AND P.ProductionTypeText= ? AND R.ResolutionCodeText = ? AND A.Year = ? AND A.ResolutionCodeId=R.Id AND A.MapCodeId=M.Id AND A.AreaTypeCodeId=T.Id  AND A.ProductionTypeId=P.Id GROUP BY A.AreaName,A.AreaTypeCodeId,A.MapCodeId,A.ResolutionCodeId,A.Year,A.Month`,[AreaName,ProductionType,Resolution,Year] , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found entry: ", res);
      result(null,res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Entry.findByPars7 = (AreaName,Resolution,Year,Month,Day,result) => { //2a-1
  sql.query(`SELECT DISTINCT "entso-e" AS "Source","AggregatedGenerationPerType" AS "Dataset",AreaName,AreaTypeCodeText AS "AreaTypeCode",MapCodeText AS "MapCode",ResolutionCodeText AS "ResolutionCode",A.Year,A.Month,A.Day,DateTime AS "DateTimeUTC",ProductionTypeText AS "ProductionType",ActualGenerationOutput AS "ActualGenerationOutputValue",UpdateTime AS "UpdateTimeUTC" FROM AggregatedGenerationPerType AS A,AreaTypeCode AS T,MapCode AS M,ResolutionCode AS R,ProductionType AS P WHERE AreaName = ? AND R.ResolutionCodeText = ? AND A.Year = ? AND A.Month = ? AND A.Day = ? AND A.ResolutionCodeId=R.Id AND A.MapCodeId=M.Id AND A.AreaTypeCodeId=T.Id AND P.Id=A.ProductionTypeId`,[AreaName,Resolution,Year,Month,Day] , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found entry: ", res);
      result(null,res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Entry.findByPars8 = (AreaName,Resolution,Year,Month,result) => { //2b-1
  sql.query(`SELECT DISTINCT "entso-e" AS "Source","AggregatedGenerationPerType" AS "Dataset",AreaName,T.AreaTypeCodeText AS "AreaTypeCode",MapCodeText AS "MapCode",ResolutionCodeText AS "ResolutionCode",A.Year,A.Month,A.Day,ProductionTypeText AS "ProductionType",SUM(ActualGenerationOutput) AS "ActualGenerationOutputByDayValue" FROM AggregatedGenerationPerType AS A,AreaTypeCode AS T,MapCode AS M,ResolutionCode AS R,ProductionType AS P WHERE AreaName = ? AND R.ResolutionCodeText = ? AND A.Year = ? AND A.Month = ? AND A.ResolutionCodeId=R.Id AND A.MapCodeId=M.Id AND A.AreaTypeCodeId=T.Id  AND A.ProductionTypeId=P.Id GROUP BY A.AreaName,A.AreaTypeCodeId,A.MapCodeId,A.ResolutionCodeId,A.ProductionTypeId,A.Year,A.Month,A.Day`,[AreaName,Resolution,Year,Month] , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found entry: ", res);
      result(null,res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Entry.findByPars9 = (AreaName,Resolution,Year,result) => { //2c-1
  sql.query(`SELECT DISTINCT "entso-e" AS "Source","AggregatedGenerationPerType" AS "Dataset",AreaName,T.AreaTypeCodeText AS "AreaTypeCode",MapCodeText AS "MapCode",ResolutionCodeText AS "ResolutionCode",A.Year,A.Month,ProductionTypeText AS "ProductionType",SUM(ActualGenerationOutput) AS "ActualGenerationOutputByDayValue" FROM AggregatedGenerationPerType AS A,AreaTypeCode AS T,MapCode AS M,ResolutionCode AS R,ProductionType AS P WHERE AreaName = ? AND R.ResolutionCodeText = ? AND A.Year = ? AND A.ResolutionCodeId=R.Id AND A.MapCodeId=M.Id AND A.AreaTypeCodeId=T.Id AND A.ProductionTypeId=P.Id GROUP BY A.AreaName,A.AreaTypeCodeId,A.MapCodeId,A.ResolutionCodeId,A.ProductionTypeId,A.Year,A.Month` ,[AreaName,Resolution,Year], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found entry: ", res);
      result(null,res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};


Entry.findByPars10 = (AreaName,Resolution,Year,Month,Day,result) => { //3a
  sql.query(`SELECT DISTINCT "entso-e" AS "Source","DayAheadTotalLoadForecast" AS "Dataset",AreaName,T.AreaTypeCodeText AS "AreaTypeCode",MapCodeText AS "MapCode",ResolutionCodeText AS "ResolutionCode",A.Year,A.Month,A.Day,DateTime AS "DateTimeUTC",TotalLoadValue AS "DayAheadTotalLoadForecastValue",UpdateTime AS "UpdateTimeUTC" FROM DayAheadTotalLoadForecast AS A,AreaTypeCode AS T,MapCode AS M,ResolutionCode AS R WHERE AreaName = ? AND R.ResolutionCodeText = ? AND A.Year = ? AND A.Month=? AND A.Day=? AND A.ResolutionCodeId=R.Id AND A.MapCodeId=M.Id AND A.AreaTypeCodeId=T.Id` ,[AreaName,Resolution,Year,Month,Day], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found entry: ", res);
      result(null,res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Entry.findByPars11 = (AreaName,Resolution,Year,Month,result) => { //3b
  sql.query(`SELECT DISTINCT "entso-e" AS "Source","DayAheadTotalLoadForecast" AS "Dataset",AreaName,T.AreaTypeCodeText AS "AreaTypeCode",MapCodeText AS "MapCode",ResolutionCodeText AS "ResolutionCode",A.Year,A.Month,A.Day,SUM(TotalLoadValue) AS "DayAheadTotalLoadForecastByDayValue" FROM DayAheadTotalLoadForecast AS A,AreaTypeCode AS T,MapCode AS M,ResolutionCode AS R,ProductionType AS P WHERE AreaName = ? AND R.ResolutionCodeText = ? AND A.Year = ? AND A.Month = ? AND A.ResolutionCodeId=R.Id AND A.MapCodeId=M.Id AND A.AreaTypeCodeId=T.Id GROUP BY A.AreaName,A.AreaTypeCodeId,A.MapCodeId,A.ResolutionCodeId,A.Year,A.Month,A.Day`,[AreaName,Resolution,Year,Month] , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found entry: ", res);
      result(null,res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Entry.findByPars12 = (AreaName,Resolution,Year,result) => { //3c
  sql.query(`SELECT DISTINCT "entso-e" AS "Source","DayAheadTotalLoadForecast" AS "Dataset",AreaName,T.AreaTypeCodeText AS "AreaTypeCode",MapCodeText AS "MapCode",ResolutionCodeText AS "ResolutionCode",A.Year,A.Month,SUM(TotalLoadValue) AS "DayAheadTotalLoadForecastByDayValue" FROM DayAheadTotalLoadForecast AS A,AreaTypeCode AS T,MapCode AS M,ResolutionCode AS R,ProductionType AS P WHERE AreaName = ? AND R.ResolutionCodeText = ? AND A.Year = ? AND A.ResolutionCodeId=R.Id AND A.MapCodeId=M.Id AND A.AreaTypeCodeId=T.Id  GROUP BY A.AreaName,A.AreaTypeCodeId,A.MapCodeId,A.ResolutionCodeId,A.Year,A.Month` ,[AreaName,Resolution,Year], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found entry: ", res);
      result(null,res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Entry.findByPars13 = (AreaName,Resolution,Year,Month,Day,Type,result) => { //4a
  sql.query(`SELECT DISTINCT "entso-e" AS "Source","DayAheadTotalLoadForecast" AS "Dataset",A.AreaName,AreaTypeCodeText AS "AreaTypeCode",MapCodeText AS "MapCode",ResolutionCodeText AS "ResolutionCode",A.Year,A.Month,A.Day,A.DateTime AS "DateTimeUTC",D.TotalLoadValue AS "DayAheadTotalLoadForecastValue",A.TotalLoadValue AS "ActualTotalLoadValue" FROM ActualTotalLoad AS A,DayAheadTotalLoadForecast AS D,AreaTypeCode AS T,MapCode AS M,ResolutionCode AS R WHERE A.AreaName = ? AND R.ResolutionCodeText = ? AND A.Year = ? AND A.Month = ? AND A.Day = ? AND A.ResolutionCodeId=R.Id AND A.MapCodeId=M.Id AND A.AreaTypeCodeId=T.Id AND A.AreaName=D.AreaName AND A.Year=D.Year AND A.Month=D.Month AND A.Day=D.Day AND A.MapCodeId=D.MapCodeId AND A.AreaTypeCodeId=D.AreaTypeCodeId AND A.ResolutionCodeId=D.ResolutionCodeId`,[AreaName,Resolution,Year,Month,Day], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found entry: ", res);
      result(null,res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Entry.findByPars14 = (AreaName,Resolution,Year,Month,result) => { //4b
  sql.query(`SELECT DISTINCT "entso-e" AS "Source","DayAheadTotalLoadForecast" AS "Dataset",A.AreaName,AreaTypeCodeText AS "AreaTypeCode",MapCodeText AS "MapCode",ResolutionCodeText AS "ResolutionCode",A.Year,A.Month,SUM(D.TotalLoadValue) AS "DayAheadTotalLoadForecastByDayValue",SUM(A.TotalLoadValue) AS "ActualTotalLoadValue" FROM ActualTotalLoad AS A,DayAheadTotalLoadForecast AS D,AreaTypeCode AS T,MapCode AS M,ResolutionCode AS R,ProductionType AS P WHERE A.AreaName = ? AND R.ResolutionCodeText = ? AND A.Year = ? AND A.Month = ? AND A.ResolutionCodeId=R.Id AND A.MapCodeId=M.Id AND A.AreaTypeCodeId=T.Id AND A.AreaName=D.AreaName AND A.Year=D.Year AND A.Month=D.Month AND A.Day=D.Day AND A.MapCodeId=D.MapCodeId AND A.AreaTypeCodeId=D.AreaTypeCodeId AND A.ResolutionCodeId=D.ResolutionCodeId GROUP BY A.AreaName,A.AreaTypeCodeId,A.MapCodeId,A.ResolutionCodeId,A.Year,A.Month,A.Day`,[AreaName,Resolution,Year,Month] , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found entry: ", res);
      result(null,res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Entry.findByPars15 = (AreaName,Resolution,Year,result) => { //4b
  sql.query(`SELECT DISTINCT "entso-e" AS "Source","DayAheadTotalLoadForecast" AS "Dataset",A.AreaName,AreaTypeCodeText AS "AreaTypeCode",MapCodeText AS "MapCode",ResolutionCodeText AS "ResolutionCode",A.Year,A.Month,SUM(D.TotalLoadValue) AS "DayAheadTotalLoadForecastByDayValue",SUM(A.TotalLoadValue) AS "ActualTotalLoadValue" FROM ActualTotalLoad AS A,DayAheadTotalLoadForecast AS D,AreaTypeCode AS T,MapCode AS M,ResolutionCode AS R,ProductionType AS P WHERE A.AreaName = ? AND R.ResolutionCodeText = ? AND A.Year = ? AND A.ResolutionCodeId=R.Id AND A.MapCodeId=M.Id AND A.AreaTypeCodeId=T.Id AND A.AreaName=D.AreaName AND A.Year=D.Year AND A.Month=D.Month AND A.Day=D.Day AND A.MapCodeId=D.MapCodeId AND A.AreaTypeCodeId=D.AreaTypeCodeId AND A.ResolutionCodeId=D.ResolutionCodeId GROUP BY A.AreaName,A.AreaTypeCodeId,A.MapCodeId,A.ResolutionCodeId,A.Year,A.Month`,[AreaName,Resolution,Year] , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found entry: ", res);
      result(null,res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};
module.exports=Entry;
