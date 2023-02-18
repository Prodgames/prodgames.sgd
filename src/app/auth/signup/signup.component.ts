import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: string;
  password: string;
  cellphone: any;

  constructor(private afAuth: AngularFireAuth, private authenticationService: AuthService) { }

  ngOnInit() {
  }

  signUp() {
    this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then(value => {
        this.email = '';
        this.password = '';
        if(value.user.emailVerified){
          // Signup con NestJS
          console.log("Registro ok - Paso 1");
          this.signupApi()
        } else{
          // Popup de confirmacion de correo
          value.user.sendEmailVerification();
        }
      })
      .catch(error => {
        console.log('Something went wrong: ', error);
        if(error.code == "auth/email-already-in-use"){
          Swal.fire('Ocurrió un problema', 'El correo ingresado ya fue registrado', 'error')
        }

      });
  }

  signupApi() {
    const obj= {};
		this.authenticationService.signup(obj).subscribe(
			async (data) => {
        Swal.fire('Confirmación de correo', 'Te enviamos un correo electrónico, verifica tu identidad para poder iniciar sesión', 'success')
				console.log(data);
			},
			(err) => {
				if (err.status === 401 || err.status === 403) {
				}
				console.log(err);
			}
		);
	}

}
