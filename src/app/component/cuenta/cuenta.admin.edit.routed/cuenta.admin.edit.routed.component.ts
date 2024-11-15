import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CuentaService } from '../../../service/cuenta.service';
import { ICuenta } from '../../../model/cuenta.interface';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

declare let bootstrap: any;

@Component({
  selector: 'app-cuenta-admin-edit-routed',
  templateUrl: './cuenta.admin.edit.routed.component.html',
  styleUrls: ['./cuenta.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class CuentaAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  oCuentaForm: FormGroup | undefined = undefined;
  oCuenta: ICuenta | null = null;
  message: string = '';
  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oCuentaService: CuentaService,
    private oRouter: Router
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oCuentaForm?.markAllAsTouched();
  }

  createForm() {
    this.oCuentaForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      codigo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40),
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      id_tipocuenta: new FormControl(''),
    });
  }

  onReset() {
    this.oCuentaService.get(this.id).subscribe({
      next: (oCuenta: ICuenta) => {
        this.oCuenta = oCuenta;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    this.oCuentaForm?.controls['id'].setValue(this.oCuenta?.id);
    this.oCuentaForm?.controls['codigo'].setValue(this.oCuenta?.codigo);
    this.oCuentaForm?.controls['descripcion'].setValue(
      this.oCuenta?.descripcion
    );
    this.oCuentaForm?.controls['id_tipocuenta'].setValue(
      this.oCuenta?.id_tipocuenta
    );
  }

  get() {
    this.oCuentaService.get(this.id).subscribe({
      next: (oCuenta: ICuenta) => {
        this.oCuenta = oCuenta;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  showModal(mensaje: string) {
    this.message = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/cuenta/view/' + this.oCuenta?.id]);
  };

  onSubmit() {
    if (!this.oCuentaForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oCuentaService.update(this.oCuentaForm?.value).subscribe({
        next: (oCuenta: ICuenta) => {
          this.oCuenta = oCuenta;
          this.updateForm();
          this.showModal('Cuenta ' + this.oCuenta.id + ' actualizada');
        },
        error: (error) => {
          this.showModal('Error al actualizar la cuenta');
          console.error(error);
        },
      });
    }
  }
}
