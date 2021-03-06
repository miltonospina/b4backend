import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { VisualComponent } from './components/visual/visual.component';
import { ProductosComponent } from './components/productos/productos.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { ReportesRoutingModule } from './reportes-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TunelesComponent } from './components/tuneles/tuneles.component';


@NgModule({
  declarations: [MenuComponent, VisualComponent, ProductosComponent, InventarioComponent, TunelesComponent],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule
  ]
})
export class ReportesModule { }