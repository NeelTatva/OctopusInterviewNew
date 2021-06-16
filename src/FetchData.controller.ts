import { Request, Response } from "express";
const https = require("https");

import { FetchDataService } from "./FetchData.service";
export class FetchDataController {
  public constructor(
    private readonly fetchDataService: FetchDataService
  ) {
    this.fetchDataService = fetchDataService;
  }
  public getData = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    let response: JSON | null
    console.log(req);
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    await this.fetchDataService
      .fetchData(req.body.language,req.body.units,req.body.city_ids)
      .then((data: JSON | null) => {
          
        if (data) {
            return res.status(200).json({message: 'success'});
        }
      })
      .catch((error: Error) => {
          
        return res.status(500).json({message: 'error'});
      });
   
      return res.status(200).json({message: 'success'});
  };
}
