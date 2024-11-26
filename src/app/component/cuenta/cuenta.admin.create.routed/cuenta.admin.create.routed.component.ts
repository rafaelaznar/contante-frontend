import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ICuenta } from '../../../model/cuenta.interface';
import { CuentaService } from '../../../service/cuenta.service';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-cuenta.admin.create.routed',
  templateUrl: './cuenta.admin.create.routed.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  styleUrls: ['./cuenta.admin.create.routed.component.css'],
})
export class CuentaAdminCreateRoutedComponent implements OnInit {
  id: number = 0;
  oCuentaForm: FormGroup | undefined = undefined;
  oCuenta: ICuenta | null = null;
  strMessage: string = '';

  myModal: any;

  constructor(private oCuentaService: CuentaService, private oRouter: Router) {}

  ngOnInit() {
    this.createForm();
    this.oCuentaForm?.markAllAsTouched();
  }

  createForm() {
    this.oCuentaForm = new FormGroup({
      codigo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      descripcion: new FormControl('', [
        Validators.maxLength(50),
      ]),
      id_tipocuenta: new FormControl(''),
    });
  }

  updateForm() {
    this.oCuentaForm?.controls['codigo'].setValue('');
    this.oCuentaForm?.controls['descripcion'].setValue('');
    this.oCuentaForm?.controls['id_tipocuenta'].setValue('');
  }

  showModal(mensaje: string) {
    this.strMessage = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  onReset() {
    this.updateForm();
    return false;
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/cuenta/view/' + this.oCuenta?.id]);
  };

  onSubmit() {
    if (this.oCuentaForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {
      this.oCuentaService.create(this.oCuentaForm?.value).subscribe({
        next: (oCuenta: ICuenta) => {
          this.oCuenta = oCuenta;
          this.showModal('Cuenta creada con el id: ' + this.oCuenta.id);
        },
        error: (err) => {
          this.showModal('Error al crear cuenta');
          console.log(err);
        },
      });
    }
  }
}
