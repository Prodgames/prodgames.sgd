var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
var GameService = /** @class */ (function () {
    function GameService(router, http) {
        this.router = router;
        this.http = http;
    }
    GameService.prototype.getGames = function () {
        return this.http.get(environment.api + "/game");
    };
    GameService.prototype.getClientGames = function (idClient) {
        return this.http.get(environment.api + "/client-game/client/" + idClient);
    };
    GameService.prototype.getDetailGameByClient = function (idClient, env) {
        return this.http.get(environment.api + "/client-game-detail/" + idClient + "/" + env);
    };
    GameService.prototype.linkClientGame = function (body) {
        console.log(body);
        return this.http.post(environment.api + "/client-game/client/" + body.client_ + "/game/" + body.game_, {});
    };
    GameService.prototype.changePropertyFile = function (id, file) {
        return this.http.put(environment.api + "/client-game-detail/file/" + id, file);
    };
    GameService.prototype.changePropertyGeneric = function (id, body) {
        return this.http.put(environment.api + "/client-game-detail/" + id, body);
    };
    GameService.prototype.getGameById = function (gameId) {
        return this.http.get(environment.api + "/game/" + gameId);
    };
    GameService.prototype.getGamePropertiesByGameId = function (gameId) {
        return this.http.get(environment.api + "/games/" + gameId + "/properties");
    };
    GameService.prototype.saveProperty = function (property, gameId) {
        return this.http.post(environment.api + "/games/" + gameId + "/properties", property);
    };
    GameService.prototype.deletePropertyById = function (gameId, propertyId) {
        return this.http.delete(environment.api + "/games/" + gameId + "/properties/" + propertyId);
    };
    GameService.prototype.updatePropertyById = function (gameId, propertyData) {
        return this.http.put(environment.api + "/games/" + gameId + "/properties/" + propertyData.id, propertyData);
    };
    GameService = __decorate([
        Injectable({
            providedIn: "root",
        }),
        __metadata("design:paramtypes", [Router, HttpClient])
    ], GameService);
    return GameService;
}());
export { GameService };
//# sourceMappingURL=game.service.js.map