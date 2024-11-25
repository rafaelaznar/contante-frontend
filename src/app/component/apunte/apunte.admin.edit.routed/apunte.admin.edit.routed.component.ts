import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApunteService } from '../../../service/apunte.service';
import { IApunte } from '../../../model/apunte.interface';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CalendarModule } from 'primeng/calendar';
import { CALENDAR_ES } from '../../../environment/environment';
import { PrimeNGConfig } from 'primeng/api';


declare let bootstrap: any;
@Component({
  selector: 'app-apunte-admin-edit-routed',
  templateUrl: './apunte.admin.edit.routed.component.html',
  styleUrls: ['./apunte.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CalendarModule
  ],
})
export class ApunteAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  oApunteForm: FormGroup | undefined = undefined;
  oApunte: IApunte = {} as IApunte;
  message: string = '';
  myModal: any;


  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oApunteService: ApunteService,
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
    this.oApunteForm?.markAllAsTouched();
    this.oPrimeconfig.setTranslation(CALENDAR_ES);
  }

  createForm() {
    this.oApunteForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
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
      momentstamp: new FormControl(new Date(), [
        Validators.required
      ,
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

  

  onReset() {
    this.oApunteService.get(this.id).subscribe({
      next: (oApunte: IApunte) => {
        this.oApunte = oApunte;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    console.log(this.oApunte);
    this.oApunteForm?.controls['id'].setValue(this.oApunte?.id);
    this.oApunteForm?.controls['debe'].setValue(this.oApunte?.debe);
    this.oApunteForm?.controls['haber'].setValue(this.oApunte?.haber);
    this.oApunteForm?.controls['descripcion'].setValue(this.oApunte?.descripcion);
    this.oApunteForm?.controls['comentarios'].setValue(this.oApunte?.comentarios);
    this.oApunteForm?.controls['momentstamp'].setValue(new Date(this.oApunte?.momentstamp));
    this.oApunteForm?.controls['orden'].setValue(this.oApunte?.orden);
    this.oApunteForm?.controls['id_asiento'].setValue(this.oApunte?.asiento);
    this.oApunteForm?.controls['id_subcuenta'].setValue(this.oApunte?.subcuenta);
    this.oApunteForm?.controls['id_tipoapunte'].setValue(this.oApunte?.tipoApunte);
  }

  get() {
    this.oApunteService.get(this.id).subscribe({
      next: (oApunte: IApunte
      ) => {
        this.oApunte = oApunte;
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
    this.oRouter.navigate(['/admin/apunte/view/' + this.oApunte?.id]);
  };

  onSubmit() {
    if (!this.oApunteForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oApunteService.update(this.oApunteForm?.value).subscribe({
        next: (oApunte: IApunte) => {
          this.oApunte = oApunte;
          this.updateForm();
          this.showModal('Apunte ' + this.oApunte.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el apunte');
          console.error(error);
        },
      });
    }
  }
}
