import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { NuevoProductoComponent } from './components/nuevo-producto/nuevo-producto.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogoEliminarProductoComponent } from './components/dialogo-eliminar-producto/dialogo-eliminar-producto.component';
import { MatDialogModule } from '@angular/material/dialog';




@NgModule({
  declarations: [ListaProductosComponent, NuevoProductoComponent, DialogoEliminarProductoComponent, EditarProductoComponent],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule
  ]
})
export class ProductosModule { }
