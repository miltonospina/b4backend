import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BodegaService } from 'src/app/core/services/bodega.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.css']
})
export class VisualComponent implements OnInit {

  niveles: number[] = [];
  columnas: number[] = [];
  posiciones: number[] = [];

  contenidoBodega = [];
  dimW: number;
  dimH: number;

  dim = {
    x: 0,
    y: 0,
    xcubo: 15,
    ycubo: 19,
    xespacio: 4,
    yespacio: 7,
    max_x : 904,
    max_y : 1000
  };

  constructor(private bodegaService: BodegaService) { }

  ngOnInit(): void {
    this.fetchLayout();
  }


  fetchLayout(): void {
    this.bodegaService.getLayout()
      .subscribe(bodega => {
        this.niveles = bodega.niveles;
        this.columnas = bodega.columnas;
        this.posiciones = bodega.posiciones;

        this.contenidoBodega = new Array(this.niveles.length);
        this.niveles.forEach(nivel => {
          console.log(nivel);
          this.contenidoBodega[nivel - 1] = [];
          this.cargarNivel(nivel);
        });
      });
  }

  cargarNivel(niv: number): void {
    this.bodegaService.getVisual(niv)
      .subscribe(rnivel => {
        rnivel.forEach(element => {
          this.contenidoBodega[niv - 1].push(element);
        });
      });
  }


  infoPaquete(paq): void{
    let idPaquete = paq.paquetesId;
    this.bodegaService.getPaquete(idPaquete).subscribe(
      rs => {
        Swal.fire(
          '<b>Información de la estiba</b>',
          '<b>Lote: </b>' + rs.lote+'<br/>'+
          '<b>Cliente: </b>' + rs.cliente.nombre+"<br/>"+
          '<b>Bultos: </b>' + rs.bultos+"<br/>"+
          '<b>Producto: </b>' + rs.producto.codigoProvidencia+" - "+rs.producto.nombre,
          'info'
        )
    });
  }
}
