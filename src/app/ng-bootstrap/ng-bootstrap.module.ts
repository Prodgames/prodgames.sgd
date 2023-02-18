import { NgModule } from '@angular/core';

import {
  NgbAccordion,
  NgbAccordionModule,
  NgbModalModule,
  NgbModule, NgbNavModule, NgbToastModule,
} from '@ng-bootstrap/ng-bootstrap';

const NgBootstrapComponents = [
  NgbModule, NgbToastModule, NgbModalModule, NgbNavModule, NgbAccordionModule
];

@NgModule({
  declarations: [
  ],
  imports: [
    NgBootstrapComponents,
  ],
  exports: [
    NgBootstrapComponents,
  ]
})

export class NgBootstrapModule { }
