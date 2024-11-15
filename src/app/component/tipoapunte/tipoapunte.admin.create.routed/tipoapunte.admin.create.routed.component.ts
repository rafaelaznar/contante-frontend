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
import { ITipoApunte } from '../../../model/tipoapunte.interface';
import { TipoApunteService } from '../../../service/tipoapunte.service';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-tipoapunte.admin.create.routed',
  templateUrl: './tipoapunte.admin.create.routed.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  styleUrls: ['./tipoapunte.admin.create.routed.component.css']
})
export class TipoApunteAdminCreateRoutedComponent implements OnInit {
  id: number = 0;
  oTipoApunteForm: FormGroup | undefined = undefined;
  oTipoApunte: ITipoApunte | null = null;
  strMessage: string = '';

  myModal: any;

  constructor(private oTipoApunteService: TipoApunteService, private oRouter: Router) { }

  ngOnInit() {
    this.createForm();
    this.oTipoApunteForm?.markAllAsTouched();
  }

  createForm() {
    this.oTipoApunteForm = new FormGroup({
     
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

  updateForm() {
    this.oTipoApunteForm?.controls['descripcion'].setValue('');
    this.oTipoApunteForm?.controls['comentarios'].setValue('');
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
    this.oRouter.navigate(['/admin/tipoapunte/view/' + this.oTipoApunte?.id]);
  };

  onSubmit() {
    
    if (this.oTipoApunteForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {
      this.oTipoApunteService.create(this.oTipoApunteForm?.value).subscribe({
        next: (oTipoApunte: ITipoApunte) => {
          this.oTipoApunte = oTipoApunte;
          this.showModal('Tipo de apunte creado con el id: ' + this.oTipoApunte.id);
        },
        error: (err) => {
          this.showModal('Error al crear el Tipo de Apunte');
          console.log(err);
        },
      });
    }
  }





}
