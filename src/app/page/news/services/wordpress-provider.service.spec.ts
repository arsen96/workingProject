import { TestBed } from '@angular/core/testing';

import { WordpressProviderService } from './wordpress-provider.service';

describe('WordpressProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WordpressProviderService = TestBed.get(WordpressProviderService);
    expect(service).toBeTruthy();
  });
});
