import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalFileComponent } from 'src/app/components/modals/modal-file/modal-file.component';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { GameService } from '../../game.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-management-game',
  templateUrl: './management-game.component.html',
  styleUrls: ['./management-game.component.css']
})
export class ManagementGameComponent implements OnInit, AfterContentChecked {

  details: any[];
  file: File;
  urlGame: string = '';
  token = '';
  showGame = false;
  numberLoad = 0;

  id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private readonly _authenticationService: AuthService,
    private readonly _gameService: GameService,
    private readonly _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params.clientgame_id;
    });
    this.getDetailGameByClient(this.id);
    // this.openNew();
    // var iframe = document.getElementById("my-iframe");
    // var queryStr = window.location.search;
    // var url = window.location.href.replace(queryStr, "");
    // iframe.src = iframe.src + "?client_url=" + url;
  }

  ngAfterContentChecked(): void {

  }

  openTest(){
    window.open(this.urlGame,'popup','directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=420px,height=640px,frameborder=0'); return false;
  }

  openNew(){

    // window.open('http://kanishkkunal.com','popup','width=100%,height=100%,frameborder=0'); return false;
    var win = window.open();
    win.document.write('<iframe width="400px" height="640px" src=' + this.urlGame + ' allowfullscreen></iframe>')
  }

  // frameborder="0" style="width: 100%; height: 100%; margin: auto;"
  async getDetailGameByClient(id) {
    // var iframe:any = document.getElementById('game');
    // iframe.contentWindow.location.reload();
    // const id = await this._authenticationService.getIdClient();
    this.token = await this._authenticationService.getToken();
    this._gameService.getDetailGameByClient(id, 'unity').subscribe(
      async (data) => {
        console.log(data);
        if (data.success) {
          this.details = data.data;
          this.numberLoad++;
          if(this.numberLoad < 2){
            this.showGame = true;
          }
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
        // this.showGame = false;
        // this.showGame = true;
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
      // this.showGame = false;
      // this.showGame = true;
      this.getDetailGameByClient(this.id);
    });
  }

  onFileSelected(event) {
    this.file = event.target.files[0] as File;
  }



  gameURL() {
    const urlGame = environment.urlGame + '?token=' + this.token;
    // this.urlGame = "http://localhost/ruleta-sg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJwcm9kZ2FtZXNAZ21haWwuY29tIiwicm9sZXMiOiJDIiwiaWF0IjoxNjI2OTgwNTg1LCJleHAiOjE2MjY5ODQxODV9.TbjBsYC4JxCxWweOKs59v6jPfmxAFCElwKUTq0Q2hPM";
    // return this._sanitizer.bypassSecurityTrustResourceUrl(urlGame);
    // alert("gameURL");
    this.urlGame = urlGame;
    return this._sanitizer.bypassSecurityTrustResourceUrl(urlGame);
  }

}
