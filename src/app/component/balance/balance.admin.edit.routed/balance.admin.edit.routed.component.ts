import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { IBalance } from '../../../model/balance.interface';
import { BalanceService } from '../../../service/balance.service';


declare let bootstrap: any;
@Component({
  selector: 'app-balance.admin.edit.routed',
  templateUrl: './balance.admin.edit.routed.component.html',
  styleUrls: ['./balance.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class BalanceAdminEditRoutedComponent implements OnInit {

  id: number = 0;
  oBalanceForm: FormGroup | undefined = undefined;
  oBalance: IBalance | null = null;
  message: string = '';
  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oBalanceService: BalanceService,
    private oRouter: Router
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oBalanceForm?.markAllAsTouched();
  }

  createForm() {
    this.oBalanceForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      titulo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
    });
  }

  onReset() {
    this.oBalanceService.get(this.id).subscribe({
      next: (oBalance: IBalance) => {
        this.oBalance = oBalance;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    this.oBalanceForm?.controls['id'].setValue(this.oBalance?.id);
    this.oBalanceForm?.controls['titulo'].setValue(this.oBalance?.titulo);
    this.oBalanceForm?.controls['descripcion'].setValue(this.oBalance?.descripcion);
  }

  get() {
    this.oBalanceService.get(this.id).subscribe({
      next: (oBalance: IBalance) => {
        this.oBalance = oBalance;
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
    this.oRouter.navigate(['/admin/balance/view/' + this.oBalance?.id]);
  };

  onSubmit() {
    if (!this.oBalanceForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oBalanceService.update(this.oBalanceForm?.value).subscribe({
        next: (oBalance: IBalance) => {
          this.oBalance = oBalance;
          this.updateForm();
          this.showModal('balance ' + this.oBalance.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el balance');
          console.error(error);
        },
      });
    }
  }
}
