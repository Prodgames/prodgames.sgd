import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-share',
  templateUrl: './modal-share.component.html',
  styleUrls: ['./modal-share.component.css']
})
export class ModalShareComponent implements OnInit {

  @Input() closeMyModal: (any) => void;
  @Input() title: string;
  @Output() outEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emitEvent(param) {
    this.outEvent.emit(param);
  }

}
