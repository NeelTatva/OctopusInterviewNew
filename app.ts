import express from 'express';
import { FetchDataController } from './src/FetchData.controller';
import { FetchDataService } from './src/FetchData.service';
import { FetchDataRepository } from './src/FetchData.repository';
import { GetWheatherDataController } from './src/GetWheatherData.controller';
import { GetWheatherDataService } from './src/GetWheatherData.service';
import { GetWheatherDataRepository } from './src/GetWheatherData.repository';
import * as bodyParser from 'body-parser';
const fetchDatarepository: FetchDataRepository = new FetchDataRepository();
const fetchDataservice: FetchDataService = new FetchDataService(fetchDatarepository);
const fetchDatacontroller: FetchDataController = new FetchDataController(fetchDataservice);

const getWheatherDatarepository: GetWheatherDataRepository = new GetWheatherDataRepository();
const getWheatherDataservice: GetWheatherDataService = new GetWheatherDataService(getWheatherDatarepository);
const getWheatherDatacontroller: GetWheatherDataController = new GetWheatherDataController(getWheatherDataservice);
const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/getWheatherData', getWheatherDatacontroller.getWheatherData);
app.post('/getData', fetchDatacontroller.getData);

app.listen(3000);