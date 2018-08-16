import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoFormulariosComponent } from './listado-formularios.component';

describe('ListadoFormulariosComponent', () => {
  let component: ListadoFormulariosComponent;
  let fixture: ComponentFixture<ListadoFormulariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoFormulariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoFormulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
