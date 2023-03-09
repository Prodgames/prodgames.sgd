import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";
import Swal from "sweetalert2";
import { GameService } from "../game.service";
import { IGame } from "../model/game.interface";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
@Component({
  selector: "app-game-modal",
  templateUrl: "./game-modal.component.html",
  styleUrls: ["./game-modal.component.scss"],
})
export class GameModalComponent implements OnInit {
  @Input() closeMyModal: (any) => void;
  @Input() title: string;

  @Input() detail: any;

  @Output() outEvent: EventEmitter<any> = new EventEmitter();

  myForm: FormGroup;
  file: File;
  img: string;
  name: string;

  isHovering: boolean;

  files: File[] = [];

  dataArrayToStorage: any[] = [] as any[];

  imageInB64!: string | ArrayBuffer;

  constructor(
    private readonly _authenticationService: AuthService,
    private readonly _gameService: GameService
  ) {}

  ngOnInit() {
    console.log(this.detail);
    this.myForm = new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      file: new FormControl("", [Validators.required]),
    });

    console.log(this.myForm);
  }

  onFileSelected(event) {
    this.file = event.target.files[0] as File;
  }

  onImageSelected(event: any) {
    const reader = new FileReader();
    this.file = event.target.files[0]
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.imageInB64 = reader.result;
    };
  }

  saveGame() {
    this._gameService
      .saveGame(
        {
          name: this.myForm.get("title").value,
          description: this.myForm.get("description").value,
        } as IGame,
        this.file
      )
      .subscribe({
        next: (response) => {
          if (typeof response.resource !== "string") {
            Swal.fire("Juego añadido correctamente", "", "success");
          } else {
            Swal.fire("Ocurrió un problema", response.resource, "error");
          }
        },
        error: (error) => {
          Swal.fire("Ocurrió un problema", error.message, "error");
          console.log(error);
        },
      });
  }

  emitEvent(param?) {
    this.outEvent.emit(param);
  }

  onSelect(event) {
    console.log(event);
    this.files = [];
    this.files.push(...event.addedFiles);
    console.log(this.files);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  async changePropertyFile(): Promise<any> {
    if (!this.files[0]) {
      Swal.fire("Importante !", "Seleccionar una nueva imágen", "info");
    }
    const fd = new FormData();
    const id = await this._authenticationService.getIdClient();
    fd.append("property", this.detail.property);
    fd.append("value", this.files[0], this.files[0].name);
    fd.append("type", this.detail.type);
    fd.append("environment", this.detail.environment);
    fd.append("clientgame_", id);
    this._gameService.changePropertyFile(this.detail.id, fd).subscribe(
      async (data) => {
        console.log(data);
        if (data.success) {
          // this.getDetailGameByClient();
          this.emitEvent(true);
          Swal.fire("Cambio exitoso", data.message, "success");
        } else {
          Swal.fire("Ocurrió un problema", data.message, "error");
        }
        return data;
      },
      (err) => {
        console.log(err);
        Swal.fire("Ocurrió un problema !", err.error.message, "error");
        return err;
      }
    );
  }
}
