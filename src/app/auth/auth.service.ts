import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public router: Router,
    private afAuth: AngularFireAuth,
    private http: HttpClient) { }



    signin(obj) {
      return this.http.post<any>(
        environment.api + '/auth/client/signin',
        obj
      );
    }

    signup(obj) {
      return this.http.post<any>(
        environment.api + '/auth/client/signup',
        obj
      );
    }

    test() {
      alert("test in service !");
      return this.http.get<any>(
        environment.api + '/game',
      );
    }

    saveToken(token){
      sessionStorage.setItem('token', token)
    }


    saveUser(user){
      sessionStorage.setItem('id', user.id)
      sessionStorage.setItem('email', user.email)
    }

    getIdClient(){
      return sessionStorage.getItem('id');
    }

    getToken(){
      return sessionStorage.getItem('token');
    }

  // googleLogin() {
  //   const auth = useAuth;
  //   const provider = new firebase.GoogleAuthProvider();
  //   return this.oAuthLogin(provider)
  //     .then(value => {
  //       console.log('Sucess', value),
  //         this.router.navigateByUrl('/profile');
  //     })
  //     .catch(error => {
  //       console.log('Something went wrong: ', error);
  //     });
  // }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/auth']);
    });
  }

  private oAuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider);
  }

}
