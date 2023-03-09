import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { IGame } from "./model/game.interface";
import { Observable } from "rxjs";
import { IResponse } from "./model/response.interface";
import { IProperty } from "./model/property.interface";

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

  getGamePropertiesByGameId(
    gameId: number
  ): Observable<IResponse<IProperty[]>> {
    return this.http.get<IResponse<IProperty[]>>(
      `${environment.api}/games/${gameId}/properties`
    );
  }

  saveGame(gameData: IGame, image: File): Observable<IResponse<IGame>> {
    const formData = new FormData();

    formData.append("name", gameData.name);
    formData.append("description", gameData.description);
    formData.append("photo", image);

    console.log(formData);
    console.log(typeof image);
    console.log(gameData);

    return this.http.post<IResponse<IGame>>(
      `${environment.api}/game`,
      formData
    );
  }

  saveProperty(
    property: IProperty[],
    gameId: number
  ): Observable<IResponse<IProperty[]>> {
    return this.http.post<IResponse<IProperty[]>>(
      `${environment.api}/games/${gameId}/properties`,
      property
    );
  }

  savePropertyFile(
    propertyData: IProperty,
    gameId: number,
    file: any
  ): Observable<IResponse<IProperty>> {
    const formData = new FormData();

    formData.append("property", propertyData.property);
    formData.append("value", file);
    formData.append("type", propertyData.type);
    formData.append("environment", propertyData.environment);

    return this.http.post<IResponse<IProperty>>(
      `${environment.api}/games/${gameId}/properties/file`,
      formData
    );
  }

  deletePropertyById(
    gameId: number,
    propertyId: number
  ): Observable<IResponse<any>> {
    return this.http.delete<IResponse<any>>(
      `${environment.api}/games/${gameId}/properties/${propertyId}`
    );
  }

  updatePropertyById(
    gameId: number,
    propertyData: IProperty
  ): Observable<IResponse<IProperty>> {
    return this.http.put<IResponse<IProperty>>(
      `${environment.api}/games/${gameId}/properties/${propertyData.id}`,
      propertyData
    );
  }

  updatePropertyFileById(
    gameId: number,
    propertyData: IProperty,
    file: any
  ): Observable<IResponse<IProperty>> {
    const formData = new FormData();

    formData.append("property", propertyData.property);
    formData.append("value", file);
    formData.append("type", propertyData.type);
    formData.append("environment", propertyData.environment);

    return this.http.put<IResponse<IProperty>>(
      `${environment.api}/games/${gameId}/properties/file/${propertyData.id}`,
      formData
    );
  }
}
