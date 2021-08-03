import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Estudio } from '../../../models/estudio.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { EstudioService } from '../../../services/estudio.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styles: [
  ]
})
export class EstudiosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public estudios: Estudio[] = [];
  private imgSubs: Subscription;

  constructor( private estudioService: EstudioService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarEstudios();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarEstudios() );
  }

  cargarEstudios() {
    this.cargando = true;
    this.estudioService.cargarEstudios()
      .subscribe( estudios => {
        this.cargando = false;
        this.estudios = estudios;
      });
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarEstudios();
    }

    this.busquedasService.buscar( 'estudios', termino )
        .subscribe( (resp: any) => {
          this.estudios = resp;
        });
  }

  abrirModal(estudio: Estudio) {

    this.modalImagenService.abrirModal( 'estudios', estudio._id, estudio.img );

  }

  borrarEstudio( estudio: Estudio ) {

    Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta a punto de borrar a ${ estudio.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.estudioService.borrarEstudio( estudio._id )
          .subscribe( resp => {

            this.cargarEstudios();
            Swal.fire(
              'Médico borrado',
              `${ estudio.nombre } fue eliminado correctamente`,
              'success'
            );

          });

      }
    })

  }

}
