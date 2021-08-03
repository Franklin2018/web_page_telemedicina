import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Evento } from '../../../models/evento.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { EventoService } from '../../../services/evento.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styles: [
  ]
})
export class EventosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public eventos: Evento[] = [];
  private imgSubs: Subscription;

  constructor( private eventoService: EventoService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  ngOnInit(): void {
    this.cargarEventos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.cargarEventos() );
  }

  cargarEventos() {
    this.cargando = true;
    this.eventoService.cargarEventos()
      .subscribe( eventos => {
        this.cargando = false;
        this.eventos = eventos;
      });
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarEventos();
    }

    this.busquedasService.buscar( 'eventos', termino )
        .subscribe( (resp: any) => {
          this.eventos = resp;
        });
  }

  abrirModal(evento: Evento) {

    this.modalImagenService.abrirModal( 'eventos', evento._id, evento.img, evento.estudio);
console.log('a');

  }

  borrarEvento( evento: Evento ) {

    Swal.fire({
      title: '¿Borrar Evento?',
      text: `Esta a punto de borrar a ${ evento.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.eventoService.borrarEvento( evento._id )
          .subscribe( resp => {

            this.cargarEventos();
            Swal.fire(
              'Evento borrado',
              `${ evento.nombre } fue eliminado correctamente`,
              'success'
            );

          });

      }
    })

  }

}
