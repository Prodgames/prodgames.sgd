import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalInfoComponent } from 'src/app/components/modals/modal-info/modal-info.component';
import { AuthService } from '../auth.service';

import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private modalService: NgbModal,
    public router: Router,
    private afAuth: AngularFireAuth,
    private authenticationService: AuthService
  ) { }

  ngOnInit() {
    // this.open("Hola");
    // warning, error, success, info, question
    /* Swal.fire({
      title: 'Question!',
      text: 'Do you want to continue',
      icon: 'question',
      confirmButtonText: 'OK',
      denyButtonText: 'No',
      cancelButtonText: 'Cancelar',
      showConfirmButton: true,
      showDenyButton: true,
      showCancelButton: true
    }).then((result) => {
      console.log("result: ");
      console.log(result);
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      } else if (result.isDismissed) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    }) */

    // Toast.fire({
    //   icon: 'success',
    //   title: 'Signed in successfully'
    // })
  }

  signIn() : any{
    this.afAuth.signInWithEmailAndPassword(this.email, this.password)
      .then(async value => {
        this.email = '';
        this.password = '';
        console.log(value);
        if(value.user.emailVerified){
          // Guardar token
          const token = await value.user.getIdToken();
          console.log(token);
          this.authenticationService.saveToken(token);
          this.router.navigate(['/dashboard']);
          // this.testApi();
        } else{
          // Popup de confirmacion de correo
          Swal.fire({
            title: 'Confirmación de correo',
            text: 'Te enviamos un correo electrónico, verifica tu identidad para poder iniciar sesión',
            icon: 'info',
            confirmButtonText: 'Reenviar',
            cancelButtonText: 'Cerrar',
            showConfirmButton: true,
            showCancelButton: true
          }).then((result) => {
            console.log("result: ");
            console.log(result);
            if (result.isConfirmed) {
              Swal.fire('Confirmación de correo', 'Te enviamos un correo electrónico, verifica tu identidad para poder iniciar sesión', 'success')
            }
          })
        }
      })
      .catch(err => {
        // Informar error
        console.log('Something went wrong: ', err.message);
      });
  }

  signInApi() {
    const obj= {
      email: this.email,
      password: this.password
    };
		this.authenticationService.signin(obj).subscribe(
			async (data) => {
				console.log(data);
        if(data.success){
          // this.authenticationService.saveToken(data.data);
          this.authenticationService.saveToken(data.data.token);
          this.authenticationService.saveUser(data.data);
          this.router.navigate(['/dashboard']);
        } else{
          Swal.fire('Credenciales incorrectas', 'El correo ingresado ya fue registrado', 'error')
        }
			},
			(err) => {
        Swal.fire('Ocurrió un problema !', err.error.message, 'error')
				// if (err.status === 401 || err.status === 403) {
				// }
				console.log(err);
			}
		);
	}

  testApi() {
		this.authenticationService.test().subscribe(
			async (data) => {
				console.log(data);
			},
			(err) => {
				if (err.status === 401 || err.status === 403) {
				}
				console.log(err);
			}
		);
	}

  open(title: string) {
    const modalRef = this.modalService.open(ModalInfoComponent);
    modalRef.componentInstance.closeMyModal = ()=>{
      modalRef.close();
    }
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.outEvent.subscribe(res => {
      console.log('res: ', res);
    });
  }

}
