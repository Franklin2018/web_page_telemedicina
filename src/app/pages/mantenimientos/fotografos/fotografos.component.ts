import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Fotografo } from '../../../models/fotografo.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { FotografoService } from '../../../services/fotografo.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-fotografos',
  templateUrl: './fotografos.component.html',
  styles: [
  ]
})
export class FotografosComponent implements OnInit, OnDestroy {

  public fotografos: Fotografo[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor( private fotografoService: FotografoService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarFotografos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarFotografos() );
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarFotografos();
    }

    this.busquedasService.buscar( 'fotografos', termino )
        .subscribe( (resp: Fotografo[]) => {

          this.fotografos = resp;

        });
  }

  cargarFotografos() {

    this.cargando = true;
    this.fotografoService.cargarFotografos()
        .subscribe( fotografos => {
          // fotografos = this.fotografoService.imgUrl(fotografos);
          this.cargando = false;
          this.fotografos = fotografos;
        })
  }

  guardarCambios( fotografo: Fotografo ) {

    this.fotografoService.actualizarFotografo( fotografo._id, fotografo.nombre )
        .subscribe( resp => {
          Swal.fire( 'Actualizado', fotografo.nombre, 'success' );
        });

  }

  eliminarFotografo( fotografo: Fotografo ) {

    this.fotografoService.borrarFotografo( fotografo._id )
        .subscribe( resp => {
          this.cargarFotografos();
          Swal.fire( 'Borrado', fotografo.nombre, 'success' );
        });

  }

  async abrirSweetAlert() {

    const { value : formValues } = await Swal.fire({
      title: 'Crear fotografo',
      html:
    '<input placeholder="Nombre del fotografo" id="swal-input1" class="swal2-input">' +
    '<input placeholder="Cedula Identidad" id="swal-input2" class="swal2-input">'+
    '<input placeholder="Telefono" id="swal-input3" class="swal2-input">',
      showCancelButton: true,
      preConfirm: () => {
        return {
          // nombre :document.getElementById('swal-input1').value,
          // ci: document.getElementById('swal-input2').value,
          // telefono: document.getElementById('swal-input3').value
      }
      }
    });

    console.log(formValues);

    if( formValues) {
      this.fotografoService.crearFotografo( formValues )
        .subscribe( (resp: any) => {
          this.fotografos.push( resp.fotografo )
        })
    }
  }

  abrirModal(fotografo: Fotografo) {

    this.modalImagenService.abrirModal( 'fotografos', fotografo._id, fotografo.img );
    this.ngOnInit();

  }

}
