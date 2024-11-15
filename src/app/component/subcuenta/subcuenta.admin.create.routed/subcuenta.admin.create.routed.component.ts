import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CalendarModule } from 'primeng/calendar';
import { CALENDAR_ES } from '../../../environment/environment';
import { PrimeNGConfig } from 'primeng/api';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  
} from '@angular/forms';
import { ISubcuenta } from '../../../model/subcuenta.interface';
import { SubcuentaService } from '../../../service/subcuenta.service';
declare let bootstrap: any;

@Component({
  selector: 'app-subcuenta.admin.create.routed',
  templateUrl: './subcuenta.admin.create.routed.component.html',
  styleUrls: ['./subcuenta.admin.create.routed.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
    CalendarModule
  ],
})
export class SubcuentaAdminCreateRoutedComponent implements OnInit {

  id: number = 0;
  osubcuentaForm: FormGroup | undefined = undefined;
  osubcuenta: ISubcuenta | null = null;
  strMessage: string = '';

  myModal: any;

  constructor(private oSubcuentaService: SubcuentaService, private oRouter: Router,private oPrimeconfig: PrimeNGConfig) {}

  ngOnInit() {
    this.createForm();
    this.osubcuentaForm?.markAllAsTouched();
    this.oPrimeconfig.setTranslation(CALENDAR_ES);
  }

  createForm() {
    this.osubcuentaForm = new FormGroup({
      codigo: new FormControl('', [
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      id_cuenta: new FormControl('', [
      ]),
      momentstamp: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  updateForm() {
    this.osubcuentaForm?.controls['codigo'].setValue('');
    this.osubcuentaForm?.controls['descripcion'].setValue('');
    this.osubcuentaForm?.controls['id_cuenta'].setValue('');
    this.osubcuentaForm?.controls['momentstamp'].setValue('');
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
    this.oRouter.navigate(['/admin/subcuenta/view/' + this.osubcuenta?.id]);
  };

  onSubmit() {
    
    if (this.osubcuentaForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {
      this.oSubcuentaService.create(this.osubcuentaForm?.value).subscribe({
        next: (osubcuenta: ISubcuenta) => {
          this.osubcuenta = osubcuenta;
          this.showModal('subcuenta creada con el id: ' + this.osubcuenta.id);
        },
        error: (err) => {
          this.showModal('Error al crear el subcuenta');
          console.log(err);
        },
      });
    }
  }

}
