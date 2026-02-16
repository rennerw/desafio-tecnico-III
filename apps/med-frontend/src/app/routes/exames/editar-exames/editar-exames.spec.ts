import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageHeader } from '@shared';

import { ExamesEditarExames } from './editar-exames';

describe('ExamesEditarExames', () => {
  let component: ExamesEditarExames;
  let fixture: ComponentFixture<ExamesEditarExames>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PageHeader]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamesEditarExames);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
