import { TestBed } from '@angular/core/testing';

import { SubirFicheroService } from './subir-fichero.service';

describe('SubirFicheroService', () => {
  let service: SubirFicheroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubirFicheroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
