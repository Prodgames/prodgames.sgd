var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import Swal from "sweetalert2";
import { GameService } from "../game.service";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators, } from "@angular/forms";
var $;
var MyGameComponent = /** @class */ (function () {
    function MyGameComponent(activatedRoute, gameService, fb) {
        this.activatedRoute = activatedRoute;
        this.gameService = gameService;
        this.fb = fb;
        this.active = 1;
        this.loading = {
            game: true,
            properties: true,
        };
        this.propertiesForm = [];
        this.propertyTypes = [];
        this.propertyEnvironments = [];
    }
    MyGameComponent.prototype.ngOnInit = function () {
        this.gamePropertiesForm = this.fb.group({});
        this.getGameId();
        this.getGame();
        this.getGameProperties();
    };
    MyGameComponent.prototype.addProperty = function () {
        var auxFormControl = new FormGroup({
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
    };
    MyGameComponent.prototype.updateProperty = function (formProperty, index) {
        var _this = this;
        console.log("Actualizar propiedad: " + index, formProperty);
        Swal.fire({
            backdrop: false,
            title: "Mensaje de confirmación !!",
            text: "\u00BFEsta seguro de actualizar la propiedad " + formProperty.get("property").value + "?",
            icon: "question",
            confirmButtonText: "Si",
            denyButtonText: "No",
            showConfirmButton: true,
            showDenyButton: true,
        }).then(function (result) {
            if (result.isConfirmed) {
                _this.updatePropertyById(_this.gameId, __assign({}, formProperty.value), index, formProperty);
            }
        });
    };
    MyGameComponent.prototype.updatePropertyById = function (gameId, propertyData, index, formProperty) {
        var _this = this;
        this.gameService.updatePropertyById(gameId, propertyData).subscribe({
            next: function (response) {
                if (typeof response.resource !== "string") {
                    _this.gameProperties[index] = response.resource;
                    console.log(_this.gameProperties[index]);
                    formProperty.reset({
                        createdAt: _this.gameProperties[index].createdAt,
                        environment: _this.gameProperties[index].environment,
                        id: _this.gameProperties[index].id,
                        property: _this.gameProperties[index].property,
                        status: _this.gameProperties[index].status,
                        type: _this.gameProperties[index].type,
                        updateAt: _this.gameProperties[index].updateAt,
                        value: _this.gameProperties[index].value,
                    });
                    Swal.fire({
                        backdrop: false,
                        title: "Mensaje de confirmación !!",
                        text: "La propiedad se actualizo correctamente",
                        icon: "success",
                        confirmButtonText: "Ok",
                        showConfirmButton: true,
                    });
                }
            },
            error: function (error) {
                console.log(error);
            },
        });
    };
    MyGameComponent.prototype.cancelProperty = function (index, fromDel) {
        var _this = this;
        if (fromDel) {
            this.propertiesForm.splice(index, 1);
            this.gameProperties.splice(index, 1);
        }
        else {
            Swal.fire({
                backdrop: false,
                title: "Mensaje de confirmación !!",
                text: "\u00BFEsta seguro de cancelar la propiedad?",
                icon: "question",
                confirmButtonText: "Si",
                denyButtonText: "No",
                showConfirmButton: true,
                showDenyButton: true,
            }).then(function (result) {
                if (result.isConfirmed) {
                    _this.propertiesForm.splice(index, 1);
                    _this.gameProperties.splice(index, 1);
                }
            });
        }
    };
    MyGameComponent.prototype.deleteProperty = function (formProperty, index) {
        var _this = this;
        Swal.fire({
            backdrop: false,
            title: "Mensaje de confirmación !!",
            text: "\u00BFEsta seguro de eliminar la propiedad " + formProperty.get("property").value + "?",
            icon: "question",
            confirmButtonText: "Si",
            denyButtonText: "No",
            showConfirmButton: true,
            showDenyButton: true,
        }).then(function (result) {
            if (result.isConfirmed) {
                _this.deletePropertyById(_this.gameId, formProperty.get("id").value, index);
            }
        });
    };
    MyGameComponent.prototype.deletePropertyById = function (gameId, propertyId, index) {
        var _this = this;
        this.gameService.deletePropertyById(gameId, propertyId).subscribe({
            next: function (response) {
                if (response.success) {
                    Swal.fire({
                        backdrop: false,
                        title: "Mensaje de confirmación !!",
                        text: "La propiedad fue eliminada correctamente",
                        icon: "success",
                        confirmButtonText: "Ok",
                        showConfirmButton: true,
                    });
                    _this.cancelProperty(index, true);
                }
            },
        });
    };
    MyGameComponent.prototype.saveProperty = function (propertyForm, index) {
        var _this = this;
        console.log("Guardar propiedades");
        console.log(propertyForm.value.type);
        this.gameService
            .saveProperty([
            {
                property: propertyForm.value.property,
                value: propertyForm.value.value,
                type: propertyForm.value.type,
                environment: propertyForm.value.environment,
            },
        ], this.gameId)
            .subscribe({
            next: function (response) {
                console.log(response);
                if (typeof response.resource !== "string") {
                    _this.gameProperties[index] = response.resource[0];
                    propertyForm.reset({
                        createdAt: _this.gameProperties[index].createdAt,
                        environment: _this.gameProperties[index].environment,
                        id: _this.gameProperties[index].id,
                        property: _this.gameProperties[index].property,
                        status: _this.gameProperties[index].status,
                        type: _this.gameProperties[index].type,
                        updateAt: _this.gameProperties[index].updateAt,
                        value: _this.gameProperties[index].value,
                    });
                    Swal.fire({
                        backdrop: false,
                        title: "Mensaje de confirmación !!",
                        text: "La propiedad se creo correctamente",
                        icon: "success",
                        confirmButtonText: "Ok",
                        showConfirmButton: true,
                    });
                }
            },
            error: function (error) {
                console.log(error);
            },
        });
    };
    MyGameComponent.prototype.getGameId = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (query) {
            _this.gameId = query["gameId"];
        });
    };
    MyGameComponent.prototype.getGame = function () {
        var _this = this;
        this.gameService.getGameById(this.gameId).subscribe({
            next: function (response) {
                if (typeof response.resource !== "string") {
                    _this.game = response.resource;
                }
                _this.loading.game = false;
            },
        });
    };
    MyGameComponent.prototype.onFormGroupChange = function (formGroup) {
        formGroup.markAllAsTouched();
    };
    MyGameComponent.prototype.onFormGroupCancel = function (formGroup) {
        if (formGroup) {
            this.gameProperties.map(function (property) {
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
    };
    MyGameComponent.prototype.setPropertiesToForm = function () {
        var _this = this;
        this.gameProperties.map(function (property) {
            var auxFormGroup = new FormGroup({});
            Object.keys(property).map(function (key) {
                auxFormGroup.addControl(key, new FormControl(property[key], [Validators.required]));
            });
            _this.propertiesForm.push(auxFormGroup);
        });
        console.log(this.propertiesForm);
    };
    MyGameComponent.prototype.getGameProperties = function () {
        var _this = this;
        this.gameService.getGamePropertiesByGameId(this.gameId).subscribe({
            next: function (response) {
                if (typeof response.resource !== "string") {
                    _this.gameProperties = response.resource;
                    _this.setPropertiesToForm();
                }
                _this.loading.properties = false;
            },
        });
    };
    MyGameComponent = __decorate([
        Component({
            selector: "app-my-game",
            templateUrl: "./my-game.component.html",
            styleUrls: ["./my-game.component.css"],
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            GameService,
            FormBuilder])
    ], MyGameComponent);
    return MyGameComponent;
}());
export { MyGameComponent };
//# sourceMappingURL=my-game.component.js.map