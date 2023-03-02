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

interface PropertyFile {
  index: number;
  file: File;
}

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

  files = [] as PropertyFile[];

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
  }

  addProperty() {
    const auxFormControl = new FormGroup({
      property: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      environment: new FormControl(null, [Validators.required]),
      id: new FormControl(null),
      createdAt: new FormControl(null),
      updateAt: new FormControl(null),
    });

    this.propertiesForm.push(auxFormControl);
    this.gameProperties.push({
      environment: null,
      property: null,
      status: null,
      type: null,
      value: null,
      id: null,
      createdAt: null,
      updateAt: null,
    });
  }

  updateProperty(formProperty: FormGroup, index: number) {
    console.log(`Actualizar propiedad: ${index}`, formProperty);
    Swal.fire({
      backdrop: false,
      title: "Mensaje de confirmación !!",
      text: `¿Esta seguro de actualizar la propiedad ${
        formProperty.get("property").value
      }?`,
      icon: "question",
      confirmButtonText: "Si",
      denyButtonText: "No",
      showConfirmButton: true,
      showDenyButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.updatePropertyById(
          this.gameId,
          {
            ...formProperty.value,
          } as IProperty,
          index,
          formProperty
        );
      }
    });
  }

  updatePropertyById(
    gameId: number,
    propertyData: IProperty,
    index: number,
    formProperty: FormGroup
  ) {
    this.gameService.updatePropertyById(gameId, propertyData).subscribe({
      next: (response) => {
        if (typeof response.resource !== "string") {
          this.gameProperties[index] = response.resource;
          console.log(this.gameProperties[index]);
          formProperty.reset({
            createdAt: this.gameProperties[index].createdAt,
            environment: this.gameProperties[index].environment,
            id: this.gameProperties[index].id,
            property: this.gameProperties[index].property,
            status: this.gameProperties[index].status,
            type: this.gameProperties[index].type,
            updateAt: this.gameProperties[index].updateAt,
            value: this.gameProperties[index].value,
          });

          Swal.fire({
            backdrop: false,
            title: "Mensaje de confirmación !!",
            text: `La propiedad se actualizo correctamente`,
            icon: "success",
            confirmButtonText: "Ok",
            showConfirmButton: true,
          });
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  cancelProperty(index: number, fromDel?: boolean) {
    if (fromDel) {
      this.propertiesForm.splice(index, 1);
      this.gameProperties.splice(index, 1);
    } else {
      Swal.fire({
        backdrop: false,
        title: "Mensaje de confirmación !!",
        text: `¿Esta seguro de cancelar la propiedad?`,
        icon: "question",
        confirmButtonText: "Si",
        denyButtonText: "No",
        showConfirmButton: true,
        showDenyButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.propertiesForm.splice(index, 1);
          this.gameProperties.splice(index, 1);

          let indexAux = -1;

          this.files.forEach((file, i) => {
            indexAux = i;
          });

          this.files.splice(indexAux, 1);

          this.files.map((file) => ({
            ...file,
            index: file.index > index ? index-- : file.index,
          }));
        }
      });
    }
  }

  deleteProperty(formProperty: FormGroup, index: number) {
    Swal.fire({
      backdrop: false,
      title: "Mensaje de confirmación !!",
      text: `¿Esta seguro de eliminar la propiedad ${
        formProperty.get("property").value
      }?`,
      icon: "question",
      confirmButtonText: "Si",
      denyButtonText: "No",
      showConfirmButton: true,
      showDenyButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePropertyById(
          this.gameId,
          formProperty.get("id").value,
          index
        );
      }
    });
  }

  deletePropertyById(gameId: number, propertyId: number, index: number) {
    this.gameService.deletePropertyById(gameId, propertyId).subscribe({
      next: (response) => {
        if (response.success) {
          Swal.fire({
            backdrop: false,
            title: "Mensaje de confirmación !!",
            text: `La propiedad fue eliminada correctamente`,
            icon: "success",
            confirmButtonText: "Ok",
            showConfirmButton: true,
          });

          this.cancelProperty(index, true);
        }
      },
    });
  }

  saveProperty(propertyForm: FormGroup, index: number) {
    console.log("Guardar propiedades");
    console.log(propertyForm.value.type);

    this.gameService
      .saveProperty(
        [
          {
            property: propertyForm.value.property,
            value: propertyForm.value.value,
            type: propertyForm.value.type,
            environment: propertyForm.value.environment,
          } as IProperty,
        ],
        this.gameId
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          if (typeof response.resource !== "string") {
            this.gameProperties[index] = response.resource[0];
            propertyForm.reset({
              createdAt: this.gameProperties[index].createdAt,
              environment: this.gameProperties[index].environment,
              id: this.gameProperties[index].id,
              property: this.gameProperties[index].property,
              status: this.gameProperties[index].status,
              type: this.gameProperties[index].type,
              updateAt: this.gameProperties[index].updateAt,
              value: this.gameProperties[index].value,
            });

            Swal.fire({
              backdrop: false,
              title: "Mensaje de confirmación !!",
              text: `La propiedad se creo correctamente`,
              icon: "success",
              confirmButtonText: "Ok",
              showConfirmButton: true,
            });
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
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

  onFormGroupChange(formGroup: FormGroup, index?: number) {
    if (
      typeof index === "number" &&
      formGroup.get("type").value !== this.gameProperties[index].type &&
      formGroup.get("type").value === "file"
    ) {
      formGroup.patchValue({ value: "../../../assets/svg/icons/image.svg" });
    }
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
        auxFormGroup.addControl(
          key,
          new FormControl(property[key], [Validators.required])
        );
      });
      this.propertiesForm.push(auxFormGroup);
    });
    console.log(this.propertiesForm);
  }

  onFileSelect(event: any, propertyForm: FormGroup, index: number) {
    let existingFile = false;

    this.files.map((file) => {
      if (file.index === index) {
        existingFile = true;
        file.file = event.target.files[0];
      }
    });

    if (existingFile === false) {
      this.files.push({
        index: index,
        file: event.target.files[0],
      } as PropertyFile);
    }

    console.log(this.files);

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      propertyForm.patchValue({
        value: reader.result,
      });
    };
  }

  getGameProperties() {
    this.gameService.getGamePropertiesByGameId(this.gameId).subscribe({
      next: async (response) => {
        if (typeof response.resource !== "string") {
          this.gameProperties = response.resource;

          const promises = this.gameProperties.map(async (property, index) => {
            if (property.type === PropertyTypes.FILE) {
              let fileName = property.value.split("?")[0].split("/")[
                property.value.split("?")[0].split("/").length - 1
              ];

              let fileExtention = fileName.substring(
                fileName.lastIndexOf(".") + 1
              );

              await fetch(property.value)
                .then((response) => response.blob())
                .then((blob) => {
                  this.files.push({
                    index: index,
                    file: new File([blob], fileName, { type: fileExtention }),
                  } as PropertyFile);
                });
            }
          });

          Promise.all(promises);

          this.setPropertiesToForm();
        }

        this.loading.properties = false;
      },
    });
  }
}
