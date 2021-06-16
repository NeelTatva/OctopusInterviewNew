const sqlite3 = require("sqlite3").verbose();
// let db = new sqlite3.Database(":memory:");
let db = new sqlite3.Database("./mydb.sqlite3", (err) => {
  if (err) {
    console.log("Error when creating the database", err);
  } else {
    console.log("Database created!");
    /* Put code to create table(s) here */
  }
});

export class FetchDataRepository {
  public async deleteOldData(): Promise<void> {
    db.serialize(function () {
      const sql = "delete from WeatherData";
      db.run(sql);
    });
  }
  public async insertData(weatherDatas: JSON): Promise<boolean | any> {
    const weatherData = weatherDatas["data"][0];

    db.serialize(function () {
      let sql = `CREATE TABLE IF NOT EXISTS WeatherData (
        rh REAL ,
        pod TEXT,
        lon REAL,
        pres REAL,
        timezone TEXT,
        ob_time TEXT,
        country_code TEXT,
        clouds INTEGER,
        ts INTEGER,
        solar_rad REAL,
        state_code TEXT,
        city_name TEXT,
        wind_spd REAL,
        wind_cdir_full TEXT,
        wind_cdir TEXT,
        slp REAL,
        vis INTEGER,
        h_angle REAL,
        sunset TEXT,
        dni REAL,
        dewpt REAL,
        snow INTEGER,
        uv REAL,
        precip INTEGER,
        wind_dir REAL,
        sunrise TEXT,
        ghi REAL,
        dhi REAL,
        aqi INTEGER,
        lat REAL,
        weather TEXT,
        datetime TEXT,
        temp REAL,
        station TEXT,
        elev_angle REAL,
        app_temp REAL
    ) `;

      db.run(sql);
      sql =
        "INSERT INTO WeatherData (rh,pod,lon,pres,timezone,ob_time,country_code,clouds,ts,solar_rad,state_code,city_name,wind_spd,wind_cdir_full,wind_cdir,slp,vis,h_angle,sunset,dni,dewpt,snow,uv,precip,wind_dir,sunrise,ghi,dhi,aqi,lat,weather,datetime,temp,station,elev_angle,app_temp)";
      sql += `VALUES ('${weatherData["rh"]}','${weatherData["pod"]}','${
        weatherData["lon"]
      }','${weatherData["pres"]}','${weatherData["timezone"]}','${
        weatherData["ob_time"]
      }','${weatherData["country_code"]}','${weatherData["clouds"]}','${
        weatherData["ts"]
      }','${weatherData["solar_rad"]}','${weatherData["state_code"]}','${
        weatherData["city_name"]
      }','${weatherData["wind_spd"]}','${weatherData["wind_cdir_full"]}','${
        weatherData["wind_cdir"]
      }','${weatherData["slp"]}','${weatherData["vis"]}','${
        weatherData["h_angle"]
      }','${weatherData["sunset"]}','${weatherData["dni"]}','${
        weatherData["dewpt"]
      }','${weatherData["snow"]}','${weatherData["uv"]}','${
        weatherData["precip"]
      }','${weatherData["wind_dir"]}','${weatherData["sunrise"]}','${
        weatherData["ghi"]
      }','${weatherData["dhi"]}','${weatherData["aqi"]}','${
        weatherData["lat"]
      }','${JSON.stringify(weatherData["weather"])}','${
        weatherData["datetime"]
      }','${weatherData["temp"]}','${weatherData["station"]}','${
        weatherData["elev_angle"]
      }','${weatherData["app_temp"]}')`;
      db.run(sql);

      sql = "select * from WeatherData where temp > 20";
      db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach((row) => {
          console.log(row);
        });
      });
    });
    // close the database connection
    // db.close((err) => {
    //   if (err) {
    //     return console.error(err.message);
    //   }
    //   console.log("Close the database connection.");
    // });
  }
}
