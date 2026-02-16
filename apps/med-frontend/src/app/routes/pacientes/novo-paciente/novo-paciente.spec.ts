import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageHeader } from '@shared';

import { PacientesNovoPaciente } from './novo-paciente';

describe('PacientesNovoPaciente', () => {
  let component: PacientesNovoPaciente;
  let fixture: ComponentFixture<PacientesNovoPaciente>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PageHeader]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientesNovoPaciente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
