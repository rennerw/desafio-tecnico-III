import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageHeader } from '@shared';

import { ExamesNovoExame } from './novo-exame';

describe('ExamesNovoExame', () => {
  let component: ExamesNovoExame;
  let fixture: ComponentFixture<ExamesNovoExame>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PageHeader]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamesNovoExame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
