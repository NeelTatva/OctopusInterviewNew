import { Chance } from 'chance';
import { expect } from 'chai';
import { instance, mock, reset, when } from 'ts-mockito';
import { describe, it, beforeEach } from 'mocha';
import { GetWheatherDataRepository } from '../src/GetWheatherData.repository';
import { GetWheatherDataService } from '../src/GetWheatherData.service';


describe('DataStoreService', () => {
    const getWheatherDataRepositoryMock: GetWheatherDataRepository = mock(GetWheatherDataRepository);
    const getWheatherDataRepositoryMockInstance: GetWheatherDataRepository = instance(
        getWheatherDataRepositoryMock
    );
    let service: GetWheatherDataService;
    let inputData: {
        minTemp: number,
        maxTemp: number,
        limit: number,
        offset: number,
    };
    beforeEach(() => {
        reset(getWheatherDataRepositoryMock);
        service = new GetWheatherDataService(getWheatherDataRepositoryMockInstance);
        inputData = {
            minTemp : 0,
            maxTemp : 0,
            limit : 0,
            offset : 0
        };
    });
    it('should return email templates details by id', async () => {
        when(getWheatherDataRepositoryMock.getData(inputData.offset,inputData.limit,inputData.minTemp,inputData.maxTemp)).thenReturn(
          Promise.resolve<Object[]>([])
        );
        const result = await service.getData(inputData.offset,inputData.limit,inputData.minTemp,inputData.maxTemp);
        expect(JSON.stringify(result)).to.equal(JSON.stringify([]));
      });
});