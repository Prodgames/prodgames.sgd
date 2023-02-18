import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { AuthService } from 'src/app/auth/auth.service';
import { CreditService } from 'src/app/credit/credit.service';

import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

@Component({
  selector: 'app-modal-gift',
  templateUrl: './modal-gift.component.html',
  styleUrls: ['./modal-gift.component.css']
})
export class ModalGiftComponent implements OnInit {

  @Input() closeMyModal: (any) => void;
  @Input() id: string;
  @Input() title: string;
  @Input() type: string;
  @Output() outEvent: EventEmitter<any> = new EventEmitter();
  myForm: FormGroup;
  file: File;
  img: string;
  name: string;

  isHovering: boolean;

  files: File[] = [];

  dataArrayToStorage: any[] = [] as any[];

  constructor(
    private readonly _authenticationService: AuthService,
    private formBuilder: FormBuilder,
    private readonly _creditService: CreditService
  ) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      nameCtrl: new FormControl('', [Validators.required]),
      descriptionCtrl: new FormControl('', [Validators.maxLength(40)]),
      valueCtrl: new FormControl(100, [Validators.required]),
      stockCtrl: new FormControl(1, [Validators.required]),
      typeCtrl: new FormControl('private', [Validators.required])
    })
    if (this.type == 'edit') {
      this.getDetail(this.id);
    }
  }

  onFileSelected(event) {
    this.file = event.target.files[0] as File;
    if (this.type == 'edit') {
      // this.open("Hola");
      // warning, error, success, info, question
      Swal.fire({
        title: 'Cambio de foto!',
        text: '¿Esta seguro de cambiar la foto del premio?',
        icon: 'question',
        confirmButtonText: 'Si',
        denyButtonText: 'No',
        showConfirmButton: true,
        showDenyButton: true,
      }).then((result) => {
        console.log("result: ");
        console.log(result);
        if (result.isConfirmed) {
          this.changeFile();
        } else if (result.isDenied) {
        } else if (result.isDismissed) {
        }
      })
    }
  }

  changeFile() {
    const fd = new FormData();
    fd.append('photo', this.file, this.file.name);
    this._creditService.updateFileGift(this.id, fd).subscribe(
      async (data) => {
        console.log(data);
        if (data.success) {
          this.getDetail(this.id);
          Toast.fire({
            icon: 'success',
            title: 'Foto del premio actualizada !'
          })
          // this.emitEvent(true);
        }
      },
      (err) => {
        Swal.fire('Ocurrió un problema !', err.error.message, 'error')
        console.log(err);
      }
    );
  }

  getDetail(id) {
    this._creditService.getGiftDetail(id).subscribe(
      async (data) => {
        console.log(data);
        if (data.success) {
          this.myForm.patchValue({ descriptionCtrl: data.data.description });
          this.myForm.patchValue({ nameCtrl: data.data.name });
          this.myForm.patchValue({ valueCtrl: data.data.value });
          this.myForm.patchValue({ stockCtrl: data.data.stock });
          this.img = data.data.photo;
          this.getFile(this.img);

        }
      },
      (err) => {
        Swal.fire('Ocurrió un problema !', err.error.message, 'error')
        console.log(err);
      }
    );
  }

  async add() {
    this.myForm.markAllAsTouched();
    this.myForm.updateValueAndValidity();
    console.log(this.myForm);
    if (this.myForm.invalid) {
      return;
    }
    const id = await this._authenticationService.getIdClient();
    const fd = new FormData();
    fd.append('name', this.myForm.controls.nameCtrl.value);
    fd.append('description', this.myForm.controls.descriptionCtrl.value);
    fd.append('value', this.myForm.controls.valueCtrl.value);
    fd.append('stock', this.myForm.controls.stockCtrl.value);
    fd.append('type', 'private');
    fd.append('photo', this.files[0], this.files[0].name);
    fd.append('client_', id);

    this._creditService.createGift(fd).subscribe(
      async (data) => {
        console.log(data);
        if (data.success) {
          Swal.fire('Premio creado !', 'El premio se creo de manera exitosa', 'success')
          this.emitEvent(true);
        }
      },
      (err) => {
        Swal.fire('Ocurrió un problema !', err.error.message, 'error')
        console.log(err);
      }
    );
  }

  async edit() {
    this.myForm.markAllAsTouched();
    this.myForm.updateValueAndValidity();
    if (this.myForm.invalid) {
      return;
    }
    const id = await this._authenticationService.getIdClient();
    const obj = {
      name: this.myForm.controls.nameCtrl.value,
      description: this.myForm.controls.descriptionCtrl.value,
      value: this.myForm.controls.valueCtrl.value,
      stock: this.myForm.controls.stockCtrl.value,
      type: 'private',
      client_: id
    }
    const fd = new FormData();
    fd.append('name', this.myForm.controls.nameCtrl.value);
    fd.append('description', this.myForm.controls.descriptionCtrl.value);
    fd.append('value', this.myForm.controls.valueCtrl.value);
    fd.append('stock', this.myForm.controls.stockCtrl.value);
    fd.append('type', 'private');
    // fd.append('photo', this.file, this.file.name);
    fd.append('client_', id);

    this._creditService.updateGift(this.id, obj).subscribe(
      async (data) => {
        console.log(data);
        if (data.success) {
          Swal.fire(data.message, 'El premio se ceo de manera exitosa', 'success')
          this.emitEvent(true);
        }
      },
      (err) => {
        Swal.fire('Ocurrió un problema !', err.error.message, 'error')
        console.log(err);
      }
    );
  }

  emitEvent(param) {
    this.outEvent.emit(param);
  }

  onSelect(event) {
    console.log(event);
    this.files = [];
    this.files.push(...event.addedFiles);
    console.log(this.files);
    if (this.type == 'edit') {
      this.file = this.files[0] as File;
      // this.open("Hola");
      // warning, error, success, info, question
      Swal.fire({
        title: 'Cambio de foto!',
        text: '¿Esta seguro de cambiar la foto del premio?',
        icon: 'question',
        confirmButtonText: 'Si',
        denyButtonText: 'No',
        showConfirmButton: true,
        showDenyButton: true,
      }).then((result) => {
        console.log("result: ");
        console.log(result);
        if (result.isConfirmed) {
          this.changeFile();
        } else if (result.isDenied) {
          this.files = [];
        } else if (result.isDismissed) {
          this.files = [];
        }
      })
    }
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  async getFile(url) {
    this._creditService.getFile(url).subscribe(
      async (data: any) => {
        console.log(data);
        this.files = [];
        this.files.push(data);
      },
      (err) => {
        Swal.fire('Ocurrió un problema !', err.error.message, 'error')
        console.log(err);
      }
    );
  }

}
