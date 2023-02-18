import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGiftComponent } from './modal-gift.component';

describe('ModalGiftComponent', () => {
  let component: ModalGiftComponent;
  let fixture: ComponentFixture<ModalGiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
