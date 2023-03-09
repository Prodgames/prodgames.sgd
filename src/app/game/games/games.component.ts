import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { GameService } from "../game.service";
import { ModalService } from "src/app/services/modal.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GameModalComponent } from "../game-modal/game-modal.component";
import { IProperty } from "../model/property.interface";
import { PropertyTypes } from "../model/property-types.enum";
import { PropertyEnvironment } from "../model/property-environment.enum";

@Component({
  selector: "app-games",
  templateUrl: "./games.component.html",
  styleUrls: ["./games.component.css"],
})
export class GamesComponent implements OnInit {
  games: any[];

  constructor(
    private readonly _gameService: GameService,
    protected modalService: ModalService,
    private readonly modlService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getGames();
  }

  addGame() {
    //alert("a");
    const modalRef = this.modlService.open(GameModalComponent);
    modalRef.componentInstance.closeMyModal = () => {
      modalRef.close();
      this.getGames();
    };
    modalRef.componentInstance.title = "Editar imágen";
    modalRef.componentInstance.type = "edit";
    modalRef.componentInstance.detail = {
      value:
        "https://prodgames-sg.s3.amazonaws.com/CLIENTS_GAMES/1/output-onlinepngtools.png?AWSAccessKeyId=AKIAQZQ2OL7R3KZO4XXH&Expires=1678378836&Signature=5kXQU2oPwVotfbXXtFTa7Hxop8Y%3D",
      property: "Logo",
      id: 1,
      type: PropertyTypes.FILE,
      environment: PropertyEnvironment.SGA,
      status: "A",
    } as IProperty;
    modalRef.componentInstance.outEvent.subscribe((res) => {
      modalRef.close();
      // this.showGame = false;
      // this.showGame = true;
      
    });
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
