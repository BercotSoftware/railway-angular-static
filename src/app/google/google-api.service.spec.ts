import {TestBed} from '@angular/core/testing';

import {PeopleApiService} from './people-api.service';

describe('GoogleApiService', () => {
  let service: PeopleApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
