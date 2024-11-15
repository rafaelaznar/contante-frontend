import { Routes } from '@angular/router';
import { UsuarioAdminPlistRoutedComponent } from './component/usuario/usuario.admin.plist.routed/usuario.admin.plist.routed.component';
import { UsuarioAdminEditRoutedComponent } from './component/usuario/usuario.admin.edit.routed/usuario.admin.edit.routed.component';
import { SharedHomeRoutedComponent } from './component/shared/shared.home.routed/shared.home.routed.component';
import { UsuarioAdminViewRoutedComponent } from './component/usuario/usuario.admin.view.routed/usuario.admin.view.routed.component';
import { UsuarioAdminCreateRoutedComponent } from './component/usuario/usuario.admin.create.routed/usuario.admin.create.routed.component';
import { UsuarioAdminDeleteRoutedComponent } from './component/usuario/usuario.admin.delete.routed/usuario.admin.delete.component';

import { ApunteAdminDeleteRoutedComponent } from './component/apunte/apunte.admin.delete.routed/apunte.admin.delete.component';
import { ApunteAdminPlistRoutedComponent } from './component/apunte/apunte.admin.plist.routed/apunte.admin.plist.routed.component';
import { ApunteAdminEditRoutedComponent } from './component/apunte/apunte.admin.edit.routed/apunte.admin.edit.routed.component';
import { ApunteAdminViewRoutedComponent } from './component/apunte/apunte.admin.view.routed/apunte.admin.view.routed.component';
import { ApunteAdminCreateRoutedComponent } from './component/apunte/apunte.admin.create.routed/apunte.admin.create.routed.component';
import { SubcuentaAdminPlistRoutedComponent } from './component/subcuenta/subcuenta.admin.plist.routed/subcuenta.admin.plist.routed.component';
import { SubcuentaAdminEditRoutedComponent } from './component/subcuenta/subcuenta.admin.edit.routed/subcuenta.admin.edit.routed.component';
import { SubcuentaAdminViewRoutedComponent } from './component/subcuenta/subcuenta.admin.view.routed/subcuenta.admin.view.routed.component';
import { SubcuentaAdminCreateRoutedComponent } from './component/subcuenta/subcuenta.admin.create.routed/subcuenta.admin.create.routed.component';
import { SubcuentaAdminDeleteRoutedComponent } from './component/subcuenta/subcuenta.admin.delete.routed/subcuenta.admin.delete.routed.component';

import { AsientoAdminDeleteRoutedComponent } from './component/asiento/asiento.admin.delete.routed/asiento.admin.delete.component';
import { AsientoAdminCreateRoutedComponent } from './component/asiento/asiento.admin.create.routed/asiento.admin.create.routed.component';
import { AsientoAdminViewRoutedComponent } from './component/asiento/asiento.admin.view.routed/asiento.admin.view.routed.component';
import { AsientoAdminEditRoutedComponent } from './component/asiento/asiento.admin.edit.routed/asiento.admin.edit.routed.component';
import { AsientoAdminPlistRoutedComponent } from './component/asiento/asiento.admin.plist.routed/asiento.admin.plist.routed.component';

import { TipoAsientoAdminPlistRoutedComponent } from './component/tipoAsiento/tipoAsiento.admin.plist.routed/tipoAsiento.admin.plist.routed.component';
import { TipoAsientoAdminEditRoutedComponent } from './component/tipoAsiento/tipoAsiento.admin.edit.routed/tipoAsiento.admin.edit.routed.component';
import { TipoAsientoAdminViewRoutedComponent } from './component/tipoAsiento/tipoAsiento.admin.view.routed/tipoAsiento.admin.view.routed.component';
import { TipoAsientoAdminCreateRoutedComponent } from './component/tipoAsiento/tipoAsiento.admin.create.routed/tipoAsiento.admin.create.routed.component';
import { TipoAsientoAdminDeleteRoutedComponent } from './component/tipoAsiento/tipoAsiento.admin.delete.routed/tipoAsiento.admin.delete.routed.component';

import { PeriodoAdminPlistRoutedComponent } from './component/periodo/periodo.admin.plist.routed/periodo.admin.plist.routed.component';
import { PeriodoAdminEditRoutedComponent } from './component/periodo/periodo.admin.edit.routed/periodo.admin.edit.routed.component';
import { PeriodoAdminViewRoutedComponent } from './component/periodo/periodo.admin.view.routed/periodo.admin.view.routed.component';
import { PeriodoAdminCreateRoutedComponent } from './component/periodo/periodo.admin.create.routed/periodo.admin.create.routed.component';
import { PeriodoAdminDeleteRoutedComponent } from './component/periodo/periodo.admin.delete.routed/periodo.admin.delete.component';

export const routes: Routes = [
  { path: '', component: SharedHomeRoutedComponent },
  { path: 'home', component: SharedHomeRoutedComponent },

  { path: 'admin/usuario/plist', component: UsuarioAdminPlistRoutedComponent },
  { path: 'admin/usuario/edit/:id', component: UsuarioAdminEditRoutedComponent },
  { path: 'admin/usuario/view/:id', component: UsuarioAdminViewRoutedComponent },
  { path: 'admin/usuario/create', component: UsuarioAdminCreateRoutedComponent, pathMatch: 'full' },
  { path: 'admin/usuario/delete/:id', component: UsuarioAdminDeleteRoutedComponent },

    { path: 'admin/asiento/plist', component: AsientoAdminPlistRoutedComponent },
  { path: 'admin/asiento/edit/:id', component: AsientoAdminEditRoutedComponent },
  { path: 'admin/asiento/view/:id', component: AsientoAdminViewRoutedComponent },
  { path: 'admin/asiento/create', component: AsientoAdminCreateRoutedComponent, pathMatch: 'full' },
  { path: 'admin/asiento/delete/:id', component: AsientoAdminDeleteRoutedComponent },
  
  { path: 'admin/apunte/plist', component: ApunteAdminPlistRoutedComponent },
  { path: 'admin/apunte/edit/:id', component: ApunteAdminEditRoutedComponent },
  { path: 'admin/apunte/view/:id', component: ApunteAdminViewRoutedComponent },
  { path: 'admin/apunte/create', component: ApunteAdminCreateRoutedComponent, pathMatch: 'full' },
  { path: 'admin/apunte/delete/:id', component: ApunteAdminDeleteRoutedComponent },

  { path: 'admin/subcuenta/plist', component: SubcuentaAdminPlistRoutedComponent },
  { path: 'admin/subcuenta/edit/:id', component: SubcuentaAdminEditRoutedComponent },
  { path: 'admin/subcuenta/view/:id', component: SubcuentaAdminViewRoutedComponent },
  { path: 'admin/subcuenta/create', component: SubcuentaAdminCreateRoutedComponent, pathMatch: 'full' },
  { path: 'admin/subcuenta/delete/:id', component: SubcuentaAdminDeleteRoutedComponent },

  
  { path: 'admin/tipoAsiento/plist', component: TipoAsientoAdminPlistRoutedComponent },
  { path: 'admin/tipoAsiento/edit/:id', component: TipoAsientoAdminEditRoutedComponent },
  { path: 'admin/tipoAsiento/view/:id', component: TipoAsientoAdminViewRoutedComponent },
  { path: 'admin/tipoAsiento/create', component: TipoAsientoAdminCreateRoutedComponent, pathMatch: 'full' },
  { path: 'admin/tipoAsiento/delete/:id', component: TipoAsientoAdminDeleteRoutedComponent },
  
  { path: 'admin/periodo/plist', component: PeriodoAdminPlistRoutedComponent },
  { path: 'admin/periodo/edit/:id', component: PeriodoAdminEditRoutedComponent },
  { path: 'admin/periodo/view/:id', component: PeriodoAdminViewRoutedComponent },
  { path: 'admin/periodo/create', component: PeriodoAdminCreateRoutedComponent, pathMatch: 'full' },
  { path: 'admin/periodo/delete/:id', component: PeriodoAdminDeleteRoutedComponent },
];
