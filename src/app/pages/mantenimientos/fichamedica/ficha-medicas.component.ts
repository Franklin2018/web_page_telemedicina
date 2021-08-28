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
  selector: 'app-ficha-medicas',
  templateUrl: './ficha-medicas.component.html',
  styles: [
  ]
})
export class FichaMedicasComponent implements OnInit, OnDestroy {

  public totalFichaMedicas: number = 0;
  public fichaMedicas: FichaMedica[] = [];
  public fichaMedicasTemp: FichaMedica[] = [];

  public desde: number = 0;
  public entrada: number = 10;
  public sort: number = -1;
  public role: string = "todos";
  public estado : string = "todos";
  public cargando: boolean = true;


  constructor( private usuarioService: UsuarioService,
               private busquedasService: BusquedasService,
               private modalImagenService: ModalImagenService,
               private fichaMedicaService: FichaMedicaService
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


  cambiarRole( usuario:Usuario ) {

    this.usuarioService.guardarUsuario( usuario )
      .subscribe( resp => {
        console.log(resp);
      })
  }

  async cambiarEstado( fichaMedica:FichaMedica ) {

    switch(fichaMedica.estado){
      case "rechazado":
        await this.rechazarFichaMedica(fichaMedica);
      break
      case "aceptado":
        this.aceptarFichaMedica(fichaMedica);
      break
      // case "atendido" :
      // break
      // case "pendiente" :
      // break
      default:
        this.fichaMedicaService.guardarFichaMedica( fichaMedica )
        .subscribe( resp => {
          console.log(resp);
        })
      break
    }

  }


  async rechazarFichaMedica( fichaMedica:FichaMedica ) {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear Nota',
      text: 'Ingresa una nota para el paciente',
      input: 'text',
      inputPlaceholder: 'Nota',
      showCancelButton: true,
    });

    if( value.trim().length > 0 ) {
      fichaMedica.nota = value.trim();

      this.fichaMedicaService.rechazarFichaMedica( fichaMedica )
      .subscribe( resp => {
        console.log(resp);
      })
    }


  }
  aceptarFichaMedica( fichaMedica:FichaMedica ) {

    this.fichaMedicaService.aceptarFichaMedica( fichaMedica )
      .subscribe( resp => {
        console.log(resp);
      })
  }



  abrirModal( usuario: Usuario ) {

    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img );
  }

}
