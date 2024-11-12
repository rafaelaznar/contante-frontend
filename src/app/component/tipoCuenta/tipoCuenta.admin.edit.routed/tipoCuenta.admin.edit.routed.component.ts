import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TipoCuentaService } from '../../../service/tipoCuenta.service';
import { ITipoCuenta } from '../../../model/tipoCuenta.interface';
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
  selector: 'app-tipoCuenta-admin-edit-routed',
  templateUrl: './tipoCuenta.admin.edit.routed.component.html',
  styleUrls: ['./tipoCuenta.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class ApunteAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  oTipoCuentaForm: FormGroup | undefined = undefined;
  oTipoCuenta: ITipoCuenta | null = null;
  message: string = '';
  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oTipoCuentaService: TipoCuentaService,
    private oRouter: Router
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oTipoCuentaForm?.markAllAsTouched();
  }

  createForm() {
    this.oTipoCuentaForm = new FormGroup({
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      credito_o_debito: new FormControl('', [
        Validators.required,
        Validators.pattern('^[01]$'),
      ]),
      comentarios: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      real_o_nominal: new FormControl('', [
        Validators.required,
        Validators.pattern('^[01]$'),
      ]),
    });
  }

  

  onReset() {
    this.oTipoCuentaService.get(this.id).subscribe({
      next: (oTipoCuenta: ITipoCuenta) => {
        this.oTipoCuenta = oTipoCuenta;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    this.oTipoCuentaForm?.controls['id'].setValue(this.oTipoCuenta?.id);
    this.oTipoCuentaForm?.controls['debe'].setValue(this.oTipoCuenta?.descripcion);
    this.oTipoCuentaForm?.controls['haber'].setValue(this.oTipoCuenta?.credito_o_debito);
    this.oTipoCuentaForm?.controls['descripcion'].setValue(this.oTipoCuenta?.comentarios);
    this.oTipoCuentaForm?.controls['comentarios'].setValue(this.oTipoCuenta?.real_o_nominal);
  }

  get() {
    this.oTipoCuentaService.get(this.id).subscribe({
      next: (oTipoCuenta: ITipoCuenta
      ) => {
        this.oTipoCuenta = oTipoCuenta;
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
    this.oRouter.navigate(['/admin/tipoCuenta/view/' + this.oTipoCuenta?.id]);
  };

  onSubmit() {
    if (!this.oTipoCuentaForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oTipoCuentaService.update(this.oTipoCuentaForm?.value).subscribe({
        next: (oTipoCuenta: ITipoCuenta) => {
          this.oTipoCuenta = oTipoCuenta;
          this.updateForm();
          this.showModal('TipoCuenta ' + this.oTipoCuenta.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el TipoCuenta');
          console.error(error);
        },
      });
    }
  }
}
