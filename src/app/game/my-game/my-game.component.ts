import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "src/app/auth/auth.service";
import { ModalFileComponent } from "src/app/components/modals/modal-file/modal-file.component";
import Swal from "sweetalert2";
import { GameService } from "../game.service";
import { ActivatedRoute } from "@angular/router";
import { IGame } from "../model/game.interface";
import { IProperty } from "../model/property.interface";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { PropertyTypes } from "../model/property-types.enum";
import { PropertyEnvironment } from "../model/property-environment.enum";
var $: any;

@Component({
  selector: "app-my-game",
  templateUrl: "./my-game.component.html",
  styleUrls: ["./my-game.component.css"],
})
export class MyGameComponent implements OnInit {
  active = 1;
  gameId: number;
  game!: IGame;
  gameProperties!: IProperty[];
  loading = {
    game: true,
    properties: true,
  };

  propertiesForm: FormGroup[] = [];
  gamePropertiesForm: FormGroup;

  propertyTypes = [];
  propertyEnvironments = [];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly gameService: GameService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.gamePropertiesForm = this.fb.group({});
    this.getGameId();
    this.getGame();
    this.getGameProperties();

    Object.keys(PropertyTypes).forEach((key) => {
      this.propertyTypes = [...this.propertyTypes, { [0]: PropertyTypes[key] }];
    });

    Object.keys(PropertyEnvironment).forEach((key) => {
      this.propertyEnvironments = [
        ...this.propertyEnvironments,
        { [0]: PropertyEnvironment[key] },
      ];
    });
  }

  addControlToForm(prop: IProperty) {
    this.gamePropertiesForm.addControl(
      prop.property,
      this.fb.control(prop.value, Validators.required)
    );
  }

  addProperty() {
    const newProp: IProperty = {
      property: "",
      value: "",
      type: null,
      environment: null,
    };
    const auxFormControl = new FormGroup({
      property: new FormControl(null),
      value: new FormControl(null),
      type: new FormControl(null),
      environment: new FormControl(null),
    });

    this.propertiesForm.push(auxFormControl);
    //this.gameProperties.push(newProp);
    //this.addControlToForm(newProp);
  }

  updateProperty(prop: IProperty) {
    console.log(`Actualizar propiedad: ${prop.property}`);
  }

  deleteProperty(prop: IProperty) {
    console.log(`Eliminar propiedad: ${prop.property}`);
    const index = this.gameProperties.findIndex((p) => p.id === prop.id);
    if (index !== -1) {
      this.gameProperties.splice(index, 1);
      this.gamePropertiesForm.removeControl(prop.property);
    }
  }

  saveProperties() {
    console.log("Guardar propiedades");
    console.log(this.gamePropertiesForm.value);
  }

  getGameId() {
    this.activatedRoute.queryParams.subscribe((query) => {
      this.gameId = query["gameId"];
    });
  }

  getGame() {
    this.gameService.getGameById(this.gameId).subscribe({
      next: (response) => {
        if (typeof response.resource !== "string") {
          this.game = response.resource;
        }

        this.loading.game = false;
      },
    });
  }

  onFormGroupChange(formGroup: FormGroup) {
    formGroup.markAllAsTouched();
  }

  onFormGroupCancel(formGroup?: FormGroup) {
    if (formGroup) {
      this.gameProperties.map((property) => {
        if (property.id === formGroup.get("id").value) {
          formGroup.reset({
            createdAt: property.createdAt,
            environment: property.environment,
            id: property.id,
            property: property.property,
            status: property.status,
            type: property.type,
            updateAt: property.updateAt,
            value: property.value,
          });
        }
      });
    }
  }

  setPropertiesToForm() {
    this.gameProperties.map((property) => {
      let auxFormGroup = new FormGroup({});
      Object.keys(property).map((key) => {
        auxFormGroup.addControl(key, new FormControl(property[key]));
      });
      this.propertiesForm.push(auxFormGroup);
    });
    console.log(this.propertiesForm);
  }

  getGameProperties() {
    this.gameService.getGamePropertiesByGameId(this.gameId).subscribe({
      next: (response) => {
        if (typeof response.resource !== "string") {
          this.gameProperties = response.resource;

          this.gameProperties.forEach((prop) => {
            this.addControlToForm(prop);
          });

          this.setPropertiesToForm();

          console.log(this.gamePropertiesForm);
        }

        this.loading.properties = false;
      },
    });
  }
}
