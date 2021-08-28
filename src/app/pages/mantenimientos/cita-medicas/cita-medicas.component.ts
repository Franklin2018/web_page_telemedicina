import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

import { Usuario } from '../../../models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Subscription } from 'rxjs';
import { FichaMedicaService } from '../../../services/ficha-medica.service';
import { FichaMedica } from '../../../models/ficha-medica.model';
import { CargarFichaMedica } from '../../../interfaces/cargar-fichamedicas.interface';

@Component({
  selector: 'app-cita-medicas',
  templateUrl: './cita-medicas.component.html',
  styles: [
  ]
})
export class CitaMedicasComponent implements OnInit, OnDestroy {

  public totalFichaMedicas: number = 0;
  public fichaMedicas: FichaMedica[] = [];
  public fichaMedicasTemp: FichaMedica[] = [];

  public desde: number = 0;
  public entrada: number = 10;
  public sort: number = -1;
  public estado : string = "aceptado";
  public cargando: boolean = true;


  constructor( private usuarioService: UsuarioService,
               private busquedasService: BusquedasService,
               private modalImagenService: ModalImagenService,
               private fichaMedicaService: FichaMedicaService,
               ) { }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.cargarFichaMedicas();

    // this.imgSubs = this.modalImagenService.nuevaImagen
    //   .pipe(delay(100))
    //   .subscribe( img => this.cargarUsuarios() );
  }

  cargarFichaMedicas() {
    this.cargando = true;
    this.fichaMedicaService.cargarFichaMedicas( this.desde, this.entrada, this.estado,this.sort)
      .subscribe( ({ total, fichaMedicas }) => {
        console.log('fichaMedicas');
        console.log(fichaMedicas);

        this.totalFichaMedicas = total;
        this.fichaMedicas = fichaMedicas;
        this.fichaMedicasTemp = fichaMedicas;
        this.cargando = false;
    })
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;

    if ( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalFichaMedicas ) {
      this.desde -= valor;
    }

    this.cargarFichaMedicas();
  }

  buscar( termino: string ) {

    // if ( termino.length === 0 ) {
    //   return this.fichaMedicas = this.fichaMedicasTemp;
    // }

    // this.busquedasService.buscar( 'usuarios', termino )
    //     .subscribe( (resp: Usuario[]) => {

    //       this.usuarios = resp;

    //     });
  }

  // eliminarUsuario( usuario: Usuario ) {

  //   if ( usuario.uid === this.usuarioService.uid ) {
  //     return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
  //   }

  //   Swal.fire({
  //     title: '¿Borrar usuario?',
  //     text: `Esta a punto de borrar a ${ usuario.nombre }`,
  //     icon: 'question',
  //     showCancelButton: true,
  //     confirmButtonText: 'Si, borrarlo'
  //   }).then((result) => {
  //     if (result.value) {

  //       this.usuarioService.eliminarUsuario( usuario )
  //         .subscribe( resp => {

  //           this.cargarUsuarios();
  //           Swal.fire(
  //             'Usuario borrado',
  //             `${ usuario.nombre } fue eliminado correctamente`,
  //             'success'
  //           );

  //         });

  //     }
  //   })

  // }

  cambiarRole( usuario:Usuario ) {

    this.usuarioService.guardarUsuario( usuario )
      .subscribe( resp => {
        console.log(resp);
      })
  }

  cambiarEstado( fichaMedica:FichaMedica ) {
    console.log('fichaMedica');
    console.log(fichaMedica);

    this.fichaMedicaService.guardarFichaMedica( fichaMedica )
      .subscribe( resp => {
        console.log(resp);
      })
  }



  abrirModal( usuario: Usuario ) {

    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img );
  }

}
