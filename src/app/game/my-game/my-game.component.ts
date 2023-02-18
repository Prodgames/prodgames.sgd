import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalFileComponent } from 'src/app/components/modals/modal-file/modal-file.component';
import Swal from 'sweetalert2';
import { GameService } from '../game.service';
var $ :any;

@Component({
  selector: 'app-my-game',
  templateUrl: './my-game.component.html',
  styleUrls: ['./my-game.component.css']
})
export class MyGameComponent implements OnInit {

  active = 1;

  constructor(

  ) { }

  ngOnInit(): void {
  }

  changeView(act){
    this.active = act;
  }

}
