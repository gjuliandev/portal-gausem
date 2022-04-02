import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KilosxmesComponent } from './kilosxmes.component';

describe('KilosxmesComponent', () => {
  let component: KilosxmesComponent;
  let fixture: ComponentFixture<KilosxmesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KilosxmesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KilosxmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
