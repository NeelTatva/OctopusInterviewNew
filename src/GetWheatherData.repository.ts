const sqlite3 = require("sqlite3").verbose();

export class GetWheatherDataRepository {
  public async getData(offset: number,limit: number,minTemp: number, maxTemp: number): Promise<Object[]> {
    let db = new sqlite3.Database("./mydb.sqlite3");

    const returnData: object[] = [];
    let sql = "select * from WeatherData where 1=1 ";
    if(minTemp){
        sql+= `AND temp > ${minTemp} `
    }
    if(maxTemp){
        sql+= `AND temp < ${maxTemp} `
    }
    if(offset && limit){
        sql+= `limit ${offset},${limit} `
    }

    const res = await new Promise((resolve, reject) => {
      db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach((row) => {
          returnData.push(row);
        });
        resolve(returnData);
      });
    });
    return res as object[];
  }
}
