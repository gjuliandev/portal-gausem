import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KilosxrestauranteComponent } from './kilosxrestaurante.component';

describe('KilosxrestauranteComponent', () => {
  let component: KilosxrestauranteComponent;
  let fixture: ComponentFixture<KilosxrestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KilosxrestauranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KilosxrestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
