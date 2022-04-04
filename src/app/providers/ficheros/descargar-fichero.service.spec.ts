import { TestBed } from '@angular/core/testing';

import { DescargarFicheroService } from './descargar-fichero.service';

describe('DescargarFicheroService', () => {
  let service: DescargarFicheroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescargarFicheroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
