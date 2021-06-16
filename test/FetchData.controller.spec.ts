import { FetchDataController } from '../src/FetchData.controller';
import { FetchDataService } from '../src/FetchData.service';
import { mock, reset, when, instance } from 'ts-mockito';
import { expect } from 'chai';
import { Chance } from 'chance';
import * as httpMocks from 'node-mocks-http';


const chance: Chance.Chance = new Chance();
const responseMock = httpMocks.createResponse();
const requestMock = httpMocks.createRequest();

describe('DataStoreController', () => {
    const fetchDataServiceMock: FetchDataService = mock(FetchDataService);
    let controller: FetchDataController;
    let inputData: {
        language: string,
        units: string,
        city_ids: number[]
    };
    beforeEach(() => {
        reset(fetchDataServiceMock);
        const fetchDataServiceMockInstance: FetchDataService = instance(
            fetchDataServiceMock
        );
        controller = new FetchDataController(fetchDataServiceMockInstance);
        inputData = {
            language: "en",
            units: "M",
            city_ids: [
                735563,
                735640,
                2995041
            ]
        };
        requestMock.body = {};
        requestMock.query = {};
        requestMock.params = {};
    })
    it('should return HTTP 200 OK', async () => {
        when(fetchDataServiceMock.fetchData(inputData.language, inputData.units, inputData.city_ids)).thenReturn(
          Promise.resolve<any>('test')
        );
        requestMock.body = inputData;
        await controller.getData(requestMock, responseMock);
        expect(responseMock.statusCode).to.equal(200);
      });
});