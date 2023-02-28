import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { GameService } from "../game.service";
import { ModalService } from "src/app/services/modal.service";

@Component({
  selector: "app-games",
  templateUrl: "./games.component.html",
  styleUrls: ["./games.component.css"],
})
export class GamesComponent implements OnInit {
  games: any[];

  constructor(
    private readonly _gameService: GameService,
    protected modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this._gameService.getGames().subscribe(
      async (data) => {
        console.log(data);
        if (data.success) {
          this.games = data.data;
        }
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
        }
        console.log(err);
      }
    );
  }

  import(gameId) {
    Swal.fire({
      backdrop: false,
      title: "Mensaje de confirmación !",
      text: "¿ Esta seguro de importar es juego a su biblioteca ?",
      icon: "question",
      confirmButtonText: "Si",
      denyButtonText: "No",
      showConfirmButton: true,
      showDenyButton: true,
    }).then((result) => {
      console.log("result: ");
      console.log(result);
      if (result.isConfirmed) {
        this.linkClientGame(gameId);
      } else if (result.isDenied) {
      } else if (result.isDismissed) {
      }
    });
  }

  linkClientGame(gameId) {
    const myIdClient = sessionStorage.getItem("id");
    const obj = {
      client_: parseInt(myIdClient),
      game_: gameId,
    };
    this._gameService.linkClientGame(obj).subscribe(
      async (data) => {
        console.log(data);
        if (data.success) {
          Swal.fire("Importado!", "", "success");
        } else {
          Swal.fire(data.message, "", "success");
        }
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
        }
        console.log(err);
      }
    );
  }
}
