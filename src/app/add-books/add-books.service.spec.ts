import { TestBed } from '@angular/core/testing';

import { AddBooksService } from './add-books.service';

describe('AddBooksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddBooksService = TestBed.get(AddBooksService);
    expect(service).toBeTruthy();
  });
});
