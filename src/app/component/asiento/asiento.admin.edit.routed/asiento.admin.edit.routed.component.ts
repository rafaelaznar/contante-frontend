import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AsientoService } from '../../../service/asiento.service';
import { IAsiento } from '../../../model/asiento.interface';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { CALENDAR_ES } from '../../../environment/environment';
import { PrimeNGConfig } from 'primeng/api';


declare let bootstrap: any;

@Component({
  selector: 'app-asiento-admin-edit-routed',
  templateUrl: './asiento.admin.edit.routed.component.html',
  styleUrls: ['./asiento.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    MatCheckboxModule,
    FormsModule,
    CalendarModule,
  ],
})
export class AsientoAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  oAsientoForm: FormGroup | undefined = undefined;
  oAsiento:IAsiento = {} as IAsiento;
  message: string = '';
  checkboxValue: number = 0;  // Inicia con 0

  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oAsientoService: AsientoService,
    private oRouter: Router,
    private oPrimeconfig: PrimeNGConfig
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oAsientoForm?.markAllAsTouched();
    this.oPrimeconfig.setTranslation(CALENDAR_ES);
  }

  createForm() {
    this.oAsientoForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
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
      momentstamp: new FormControl(new Date(), [
        Validators.required
      ,
      ]),
      id_tipoasiento: new FormControl('',[Validators.required]),
      id_usuario: new FormControl('',[Validators.required]),
      id_periodo: new FormControl('',[Validators.required]),

    });
  }

  onReset() {
    this.oAsientoService.get(this.id).subscribe({
      next: (oAsiento: IAsiento) => {
        this.oAsiento = oAsiento;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    this.oAsientoForm?.controls['id'].setValue(this.oAsiento?.id);
    this.oAsientoForm?.controls['descripcion'].setValue(this.oAsiento?.descripcion);
    this.oAsientoForm?.controls['comentarios'].setValue(this.oAsiento?.comentarios);
    this.oAsientoForm?.controls['inventariable'].setValue(this.oAsiento?.inventariable);
    this.oAsientoForm?.controls['momentstamp'].setValue(new Date(this.oAsiento?.momentstamp));
    this.oAsientoForm?.controls['id_tipoasiento'].setValue(this.oAsiento?.tipoasiento);
    this.oAsientoForm?.controls['id_usuario'].setValue(this.oAsiento?.usuario);
    this.oAsientoForm?.controls['id_periodo'].setValue(this.oAsiento?.periodo);
  }

  get() {
    this.oAsientoService.get(this.id).subscribe({
      next: (oAsiento: IAsiento) => {
        this.oAsiento = oAsiento;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onCheckboxChange(event: any): void {
    this.checkboxValue = event.checked ? 1 : 0;
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
    this.oRouter.navigate(['/admin/asiento/view/' + this.oAsiento?.id]);
  };

  onSubmit() {
    if (!this.oAsientoForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oAsientoService.update(this.oAsientoForm?.value).subscribe({
        next: (oAsiento: IAsiento) => {
          this.oAsiento = oAsiento;
          this.updateForm();
          this.showModal('Asiento ' + this.oAsiento.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el asiento');
          console.error(error);
        },
      });
    }
  }
}
