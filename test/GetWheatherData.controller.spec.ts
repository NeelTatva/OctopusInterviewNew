import { GetWheatherDataController } from '../src/GetWheatherData.controller';
import { GetWheatherDataService } from '../src/GetWheatherData.service';
import { mock, reset, when, instance } from 'ts-mockito';
import { expect } from 'chai';
import { Chance } from 'chance';
import * as httpMocks from 'node-mocks-http';


const chance: Chance.Chance = new Chance();
const responseMock = httpMocks.createResponse();
const requestMock = httpMocks.createRequest();

describe('DataStoreController', () => {
    const GetWheatherDataServiceMock: GetWheatherDataService = mock(GetWheatherDataService);
    let controller: GetWheatherDataController;
    let inputData: {
        minTemp: number,
        maxTemp: number,
        limit: number,
        offset: number,
    };
    beforeEach(() => {
        reset(GetWheatherDataServiceMock);
        const GetWheatherDataServiceMockInstance: GetWheatherDataService = instance(
            GetWheatherDataServiceMock
        );
        controller = new GetWheatherDataController(GetWheatherDataServiceMockInstance);
        inputData = {
            minTemp : 0,
            maxTemp : 0,
            limit : 0,
            offset : 0
        };
        requestMock.body = {};
        requestMock.query = {};
        requestMock.params = {};
    })
    it('should return HTTP 200 OK', async () => {
        when(GetWheatherDataServiceMock.getData(inputData.offset,inputData.limit,inputData.minTemp,inputData.maxTemp)).thenReturn(
          Promise.resolve<any>('test')
        );
        requestMock.query = Object.assign(inputData);
        await controller.getWheatherData(requestMock, responseMock);
        expect(responseMock.statusCode).to.equal(200);
      });
});