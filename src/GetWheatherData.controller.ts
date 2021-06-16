import { Request, Response } from "express";

import { GetWheatherDataService } from "./GetWheatherData.service";
export class GetWheatherDataController {
  public constructor(
    private readonly getWheatherDataService: GetWheatherDataService
  ) {
    this.getWheatherDataService = getWheatherDataService;
  }
  public getWheatherData = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    let response: JSON
    await this.getWheatherDataService
    .getData(+req.query.offset,+req.query.limit,+req.query.minTemp,+req.query.maxTemp)
    .then((data: JSON) => {
      if (data) {
          response = data
      }
    })
    .catch((error: Error) => {
    });
  return res.status(200).json(response);
  }
}