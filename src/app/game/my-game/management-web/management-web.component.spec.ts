import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementWebComponent } from './management-web.component';

describe('ManagementWebComponent', () => {
  let component: ManagementWebComponent;
  let fixture: ComponentFixture<ManagementWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementWebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
