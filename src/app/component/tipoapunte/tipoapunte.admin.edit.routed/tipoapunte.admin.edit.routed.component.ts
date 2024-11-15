import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TipoApunteService } from '../../../service/tipoapunte.service';
import { ITipoApunte } from '../../../model/tipoapunte.interface';
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
  selector: 'app-tipoapunte.admin.edit.routed',
  templateUrl: './tipoapunte.admin.edit.routed.component.html',
  styleUrls: ['./tipoapunte.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class TipoApunteAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  oTipoApunteForm: FormGroup | undefined = undefined;
  oTipoApunte: ITipoApunte | null = null;
  message: string = '';
  myModal: any;


  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oTipoApunteService: TipoApunteService,
    private oRouter: Router
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
   }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oTipoApunteForm?.markAllAsTouched();
  }

  createForm() {
    this.oTipoApunteForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
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
    });
  }

  

  onReset() {
    this.oTipoApunteService.get(this.id).subscribe({
      next: (oTipoApunte: ITipoApunte) => {
        this.oTipoApunte = oTipoApunte;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    this.oTipoApunteForm?.controls['descripcion'].setValue(this.oTipoApunte?.descripcion);
    this.oTipoApunteForm?.controls['comentarios'].setValue(this.oTipoApunte?.comentarios);
    this.oTipoApunteForm?.controls['id'].setValue(this.oTipoApunte?.id);  // Actualiza el id también si es necesario

    // Marca los controles como tocados para que se muestren los mensajes de error, si los hay
    this.oTipoApunteForm?.markAllAsTouched();
  }

  get() {
    this.oTipoApunteService.get(this.id).subscribe({
      next: (oTipoApunte: ITipoApunte
      ) => {
        this.oTipoApunte = oTipoApunte;
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
    if (this.oTipoApunte?.id) {
      this.oRouter.navigate(['/admin/tipoapunte/view/' + this.oTipoApunte.id]);
    }
  };

  onSubmit() {
    if (!this.oTipoApunteForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oTipoApunteService.update(this.oTipoApunteForm?.value).subscribe({
        next: (oTipoApunte: ITipoApunte) => {
          this.oTipoApunte = oTipoApunte;
          this.updateForm();
          this.showModal('Tipo de Apunte ' + this.oTipoApunte.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el tipo de apunte');
          console.error(error);
        },
      });
    }
  }
}
