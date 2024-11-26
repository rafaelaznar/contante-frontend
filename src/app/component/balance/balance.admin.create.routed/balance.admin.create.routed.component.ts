import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IBalance } from '../../../model/balance.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BalanceService } from '../../../service/balance.service';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-balance.admin.create.routed',
  templateUrl: './balance.admin.create.routed.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  styleUrls: ['./balance.admin.create.routed.component.css']
})
export class BalanceAdminCreateRoutedComponent implements OnInit {

  id: number = 0;
  oBalanceForm: FormGroup | undefined = undefined;
  oBalance: IBalance | null = null;
  strMessage: string = '';

  myModal: any;

  constructor(
    private oBalanceService: BalanceService,
    private oRouter: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.oBalanceForm?.markAllAsTouched();
  }

  createForm() {
    this.oBalanceForm = new FormGroup({
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

  updateForm() {
    this.oBalanceForm?.controls['titulo'].setValue('');
    this.oBalanceForm?.controls['descripcion'].setValue('');
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
    this.oRouter.navigate(['/admin/balance/view/' + this.oBalance?.id]);
  };

  onSubmit() {
    if (this.oBalanceForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {      
      this.oBalanceService.create(this.oBalanceForm?.value).subscribe({
        next: (oBalance: IBalance) => {
          this.oBalance = oBalance;
          this.showModal('Balance creado con el id: ' + this.oBalance.id);
        },
        error: (err) => {
          this.showModal('Error al crear el balance');
          console.log(err);
        },
      });
    }
  }
}
