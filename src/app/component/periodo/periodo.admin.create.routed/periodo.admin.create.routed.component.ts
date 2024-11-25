import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IPeriodo } from '../../../model/periodo.interface';
import { PeriodoService } from '../../../service/periodo.service';
import { CommonModule } from '@angular/common';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-periodo-admin-create-routed',
  templateUrl: './periodo.admin.create.routed.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  styleUrls: ['./periodo.admin.create.routed.component.css'],
})
export class PeriodoAdminCreateRoutedComponent implements OnInit {
  id: number = 0;
  oPeriodoForm!: FormGroup; // Usamos el operador ! para asegurar que no sea undefined
  oPeriodo: IPeriodo | null = null;
  strMessage: string = '';

  myModal: any;

  constructor(private oPeriodoService: PeriodoService, private oRouter: Router) {}

  ngOnInit() {
    this.createForm();
    this.oPeriodoForm.markAllAsTouched();
  }

  createForm() {
    this.oPeriodoForm = new FormGroup({
      anyo: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d+$'),
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      comentarios: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      cerrado: new FormControl(false, [
        Validators.required
      ]),
    });
  }

  updateForm() {
    this.oPeriodoForm.controls['anyo'].setValue('');
    this.oPeriodoForm.controls['descripcion'].setValue('');
    this.oPeriodoForm.controls['comentarios'].setValue('');
    this.oPeriodoForm.controls['cerrado'].setValue(false);
    console.log(this.oPeriodo);
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
    this.oRouter.navigate(['/admin/periodo/view/' + this.oPeriodo?.id]);
  };

  onSubmit() {
    if (this.oPeriodoForm.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {
      this.oPeriodoService.create(this.oPeriodoForm.value).subscribe({
        next: (oPeriodo: IPeriodo) => {
          this.oPeriodo = oPeriodo;
          this.showModal('Periodo creado con el id: ' + this.oPeriodo.id);
        },
        error: (err) => {
          this.showModal('Error al crear el Periodo');
          console.log(err);
        },
      });
    }
  }
}
