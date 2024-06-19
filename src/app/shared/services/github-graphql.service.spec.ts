import { TestBed } from '@angular/core/testing';

import { GithubGraphqlService } from './github-graphql.service';

describe('GithubGraphqlService', () => {
  let service: GithubGraphqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubGraphqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
