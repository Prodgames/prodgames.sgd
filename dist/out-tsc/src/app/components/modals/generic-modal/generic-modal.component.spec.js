/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { GenericModalComponent } from './generic-modal.component';
describe('GenericModalComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [GenericModalComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(GenericModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=generic-modal.component.spec.js.map