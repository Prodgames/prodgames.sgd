import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { IGame } from "./model/game.interface";
import { Observable } from "rxjs";
import { IResponse } from "./model/response.interface";

@Injectable({
  providedIn: "root",
})
export class GameService {
  constructor(public router: Router, private http: HttpClient) {}

  getGames() {
    return this.http.get<any>(environment.api + "/game");
  }

  getClientGames(idClient) {
    return this.http.get<any>(
      environment.api + "/client-game/client/" + idClient
    );
  }

  getDetailGameByClient(idClient, env) {
    return this.http.get<any>(
      environment.api + "/client-game-detail/" + idClient + "/" + env
    );
  }

  linkClientGame(body) {
    console.log(body);
    return this.http.post<any>(
      `${environment.api}/client-game/client/${body.client_}/game/${body.game_}`,
      {}
    );
  }

  changePropertyFile(id, file) {
    return this.http.put<any>(
      environment.api + "/client-game-detail/file/" + id,
      file
    );
  }

  changePropertyGeneric(id, body) {
    return this.http.put<any>(
      environment.api + "/client-game-detail/" + id,
      body
    );
  }

  getGameById(gameId: number): Observable<IResponse<IGame>> {
    return this.http.get<any>(`${environment.api}/game/${gameId}`);
  }
}
