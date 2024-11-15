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
import { IAsiento } from '../../../model/asiento.interface';
import { AsientoService } from '../../../service/asiento.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { CALENDAR_ES } from '../../../environment/environment';
import { PrimeNGConfig } from 'primeng/api';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-asiento.admin.create.routed',
  templateUrl: './asiento.admin.create.routed.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    RouterModule,
    CalendarModule,
  ],
  styleUrls: ['./asiento.admin.create.routed.component.css'],
})
export class AsientoAdminCreateRoutedComponent implements OnInit {

  id: number = 0;
  oAsientoForm: FormGroup | undefined = undefined;
  oAsiento: IAsiento | null = null;
  strMessage: string = '';
  checkboxValue: number = 0;  // Inicia con 0

  myModal: any;

  form: FormGroup = new FormGroup({});

  constructor(
    private oAsientoService: AsientoService,
    private oRouter: Router,
    private oPrimeconfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.createForm();
    this.oAsientoForm?.markAllAsTouched();
    this.oPrimeconfig.setTranslation(CALENDAR_ES);
  }

  createForm() {
    this.oAsientoForm = new FormGroup({
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255),
      ]),
      comentarios: new FormControl('', [
        Validators.minLength(0),
        Validators.maxLength(255),
      ]),
      inventariable: new FormControl(''),
      momentstamp: new FormControl('', [
        Validators.required
      ]),
      id_tipoasiento: new FormControl('',[Validators.required]),
      id_usuario: new FormControl('',[Validators.required]),
      id_periodo: new FormControl('',[Validators.required]),

    });
  }

  updateForm() {
    this.oAsientoForm?.controls['descripcion'].setValue('');
    this.oAsientoForm?.controls['comentarios'].setValue('');
    this.oAsientoForm?.controls['inventariable'].setValue('');
    this.oAsientoForm?.controls['momentstamp'].setValue('');
    this.oAsientoForm?.controls['id_tipoasiento'].setValue('');
    this.oAsientoForm?.controls['id_usuario'].setValue('');
    this.oAsientoForm?.controls['id_periodo'].setValue('');
  }

  onCheckboxChange(event: any): void {
    this.checkboxValue = event.checked ? 1 : 0;
  }

  onReset() {
    this.updateForm();
    return false;
  }

  showModal(mensaje: string) {
    this.strMessage = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/asiento/view/' + this.oAsiento?.id]);
  }

  onSubmit() {
    if (this.oAsientoForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {      
      this.oAsientoService.create(this.oAsientoForm?.value).subscribe({
        next: (oAsiento: IAsiento) => {
          this.oAsiento = oAsiento;
          this.showModal('Asiento creado con el id: ' + this.oAsiento.id);
        },
        error: (err) => {
          this.showModal('Error al crear el asiento');
          console.log(err);
        },
      });
    }
  }



}
