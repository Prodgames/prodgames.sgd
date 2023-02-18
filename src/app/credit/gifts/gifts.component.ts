import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalFileComponent } from 'src/app/components/modals/modal-file/modal-file.component';
import { ModalGiftComponent } from 'src/app/components/modals/modal-gift/modal-gift.component';
import { CreditService } from '../credit.service';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.css']
})
export class GiftsComponent implements OnInit {

  gifts: any[];
  testImg: any;

  constructor(
    private readonly _authenticationService: AuthService,
    private modalService: NgbModal,
    private readonly _creditService: CreditService
  ) { }

  ngOnInit(): void {
    this.getDetailGameByClient();
    // this.getFile();
  }

  async getDetailGameByClient() {
    const id = await this._authenticationService.getIdClient();
    this._creditService.getGiftClient(id).subscribe(
      async (data) => {
        console.log(data);
        if (data.success) {
          this.gifts = data.data;
        }
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
        }
        console.log(err);
      }
    );
  }

  add() {
    const modalRef = this.modalService.open(ModalGiftComponent);
    modalRef.componentInstance.closeMyModal = ()=>{
      modalRef.close();
      this.getDetailGameByClient();
    }
    modalRef.componentInstance.title = 'Agregar Premio';
    modalRef.componentInstance.type = 'add';
    modalRef.componentInstance.outEvent.subscribe(res => {
      console.log('res: ', res);
      modalRef.close();
      this.getDetailGameByClient();
    });
  }

  edit(id) {
    const modalRef = this.modalService.open(ModalGiftComponent);
    modalRef.componentInstance.closeMyModal = ()=>{
      modalRef.close();
    }
    modalRef.componentInstance.title = 'Editar Premio';
    modalRef.componentInstance.type = 'edit';
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.outEvent.subscribe(res => {
      console.log('res: ', res);
      modalRef.close();
      this.getDetailGameByClient();
    });
  }

  async getFile() {
    var url = "https://prodgames-sg.s3.amazonaws.com/7a9eeb4fa972a27c412e6a114386115b.jpg?AWSAccessKeyId=AKIAXEASB3MHW4ZOWSMT&Expires=1626917550&Signature=tnJ2%2FnI7LUuh5NMm86A4NKlxUEI%3D";
    this.testImg = url;
    this._creditService.getFile(url).subscribe(
      async (data) => {

        console.log(data);
      },
      (err) => {
        // Swal.fire('Ocurrió un problema !', err.error.message, 'error')
        console.log(err);
      }
    );
  }

}
