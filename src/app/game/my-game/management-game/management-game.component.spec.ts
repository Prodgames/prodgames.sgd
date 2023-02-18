import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementGameComponent } from './management-game.component';

describe('ManagementGameComponent', () => {
  let component: ManagementGameComponent;
  let fixture: ComponentFixture<ManagementGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
