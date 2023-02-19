import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "src/app/auth/auth.service";
import { ModalFileComponent } from "src/app/components/modals/modal-file/modal-file.component";
import Swal from "sweetalert2";
import { GameService } from "../game.service";
import { ActivatedRoute } from "@angular/router";
import { IGame } from "../model/game.interface";
var $: any;

@Component({
  selector: "app-my-game",
  templateUrl: "./my-game.component.html",
  styleUrls: ["./my-game.component.css"],
})
export class MyGameComponent implements OnInit {
  active = 1;
  game!: IGame;
  loading = {
    game: true,
  };

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly gameService: GameService
  ) {}

  ngOnInit(): void {
    this.getGame();
  }

  getGame() {
    let gameId = 0;

    this.activatedRoute.queryParams.subscribe((query) => {
      gameId = query["gameId"];
    });

    this.gameService.getGameById(gameId).subscribe({
      next: (response) => {
        if (typeof response.resource !== "string") {
          this.game = response.resource;
        }

        this.loading.game = false;
      },
    });
  }

  changeView(act) {
    this.active = act;
  }
}
