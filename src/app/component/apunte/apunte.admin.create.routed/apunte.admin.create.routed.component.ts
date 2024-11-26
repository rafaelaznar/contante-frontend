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
import { IApunte } from '../../../model/apunte.interface';
import { ApunteService } from '../../../service/apunte.service';
import { CalendarModule } from 'primeng/calendar';
import { CALENDAR_ES } from '../../../environment/environment';
import { PrimeNGConfig } from 'primeng/api';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-apunte.admin.create.routed',
  templateUrl: './apunte.admin.create.routed.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
    CalendarModule
  ],
  styleUrls: ['./apunte.admin.create.routed.component.css'],
})
export class ApunteAdminCreateRoutedComponent implements OnInit {
  id: number = 0;
  oApunteForm: FormGroup | undefined = undefined;
  oApunte: IApunte | null = null;
  strMessage: string = '';

  myModal: any;

  constructor(private oApunteService: ApunteService, private oRouter: Router,private oPrimeconfig: PrimeNGConfig) {}

  ngOnInit() {
    this.createForm();
    this.oApunteForm?.markAllAsTouched();
    this.oPrimeconfig.setTranslation(CALENDAR_ES);
  }

  createForm() {
    this.oApunteForm = new FormGroup({
      debe: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d{1,4}(\\.\\d{1,4})?$'),
      ]),
      haber: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d{1,4}(\\.\\d{1,4})?$'),
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
      momentstamp: new FormControl('', [
        Validators.required
      ]),
      orden: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?:-?(?:[0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-7]|128)|127)$'),
      ]),
      id_asiento: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d+$'),
      ]),
      id_subcuenta: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d+$'),
      ]),
      id_tipoapunte: new FormControl('', [
        Validators.required,
        Validators.pattern('^\\d+$'),
      ]),
    });
  }

  updateForm() {
    this.oApunteForm?.controls['debe'].setValue('');
    this.oApunteForm?.controls['haber'].setValue('');
    this.oApunteForm?.controls['descripcion'].setValue('');
    this.oApunteForm?.controls['comentarios'].setValue('');
    this.oApunteForm?.controls['momentstamp'].setValue('');
    this.oApunteForm?.controls['orden'].setValue('');
    this.oApunteForm?.controls['id_asiento'].setValue('');
    this.oApunteForm?.controls['id_subcuenta'].setValue('');
    this.oApunteForm?.controls['id_tipoapunte'].setValue('');
    console.log(this.oApunte);
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
    this.oRouter.navigate(['/admin/apunte/view/' + this.oApunte?.id]);
  };

  onSubmit() {
    
    if (this.oApunteForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {
      this.oApunteService.create(this.oApunteForm?.value).subscribe({
        next: (oApunte: IApunte) => {
          this.oApunte = oApunte;
          this.showModal('Apunte creado con el id: ' + this.oApunte.id);
        },
        error: (err) => {
          this.showModal('Error al crear el Apunte');
          console.log(err);
        },
      });
    }
  }
}
