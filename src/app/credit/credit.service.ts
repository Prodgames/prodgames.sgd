import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditService {

  constructor(
    public router: Router,
    private http: HttpClient) { }

    getGiftDetail(id) {
      return this.http.get<any>(
        environment.api + '/gift/' + id,
      );
    }

    getGiftClient(id) {
      return this.http.get<any>(
        environment.api + '/gift/client/' + id,
      );
    }

    createGift(obj) {
      return this.http.post<any>(
        environment.api + '/gift',
        obj
      );
    }

    updateFileGift(id, obj) {
      return this.http.put<any>(
        environment.api + '/gift/file/' + id,
        obj
      );
    }

    updateGift(id, obj) {
      return this.http.put<any>(
        environment.api + '/gift/' + id,
        obj
      );
    }

    getFile(url) {
      const options = { responseType: 'blob' as 'blob' };
      // const options = {responseType: 'text'};
      return this.http.get(
        url,
        options
      );
    }

}
