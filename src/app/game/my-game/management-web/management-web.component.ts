import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalFileComponent } from 'src/app/components/modals/modal-file/modal-file.component';
import Swal from 'sweetalert2';
import { GameService } from '../../game.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-management-web',
  templateUrl: './management-web.component.html',
  styleUrls: ['./management-web.component.css']
})
export class ManagementWebComponent implements OnInit {
  details: any[];
  file: File;
  id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private readonly _authenticationService: AuthService,
    private readonly _gameService: GameService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.clientgame_id;
      this.getDetailGameByClient(this.id);
    });
    // this.getDetailGameByClient();
  }

  async getDetailGameByClient(id: any) {
    // const id = await this._authenticationService.getIdClient();
    this._gameService.getDetailGameByClient(id, 'sga').subscribe(
      async (data) => {
        console.log(data);
        if (data.success) {
          this.details = data.data;
        }
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
        }
        console.log(err);
      }
    );
  }

  changeGeneric(detail) : any {

    const obj = {
      property: detail.property,
      value: detail.value,
      type: detail.type
    }
    this._gameService.changePropertyGeneric(detail.id, obj).subscribe(
      async (data) => {
        console.log(data);
        if(data.success){
          this.getDetailGameByClient(this.id);
          Swal.fire('Cambio exitoso', data.message, 'success')
        }else{
          Swal.fire('Ocurrió un problema', data.message, 'error')
        }
        return data;
      },
      (err) => {
        console.log(err);
        Swal.fire('Ocurrió un problema !', err.error.message, 'error')
        return err;
      }
    );
  }

  changeValueGeneric(detail) {
    Swal.fire({
      backdrop: false,
      title: 'Importante !',
      text: 'Ingrese el nuevo valor de "' + detail.property + '"',
      // icon: 'info',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      showConfirmButton: true,
      showCancelButton: true,
      input: 'textarea',
      inputAttributes: {
        autocapitalize: 'off'
      },
      preConfirm: async (textarea) => {
        console.log(textarea);
        detail.value = textarea;
        return await this.changeGeneric(detail);
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        // Swal.fire({
        //   title: `${result.value.file}'s avatar`,
        //   imageUrl: result.value.file
        // })
      }
    })
  }

  changeValueFile(detail) {
    const modalRef = this.modalService.open(ModalFileComponent);
    modalRef.componentInstance.closeMyModal = ()=>{
      modalRef.close();
      this.getDetailGameByClient(this.id);
    }
    modalRef.componentInstance.title = 'Editar imágen';
    modalRef.componentInstance.type = 'edit';
    modalRef.componentInstance.detail = detail;
    modalRef.componentInstance.outEvent.subscribe(res => {
      modalRef.close();
      this.getDetailGameByClient(this.id);
    });
  }

  onFileSelected(event) {
    this.file = event.target.files[0] as File;
  }


}
