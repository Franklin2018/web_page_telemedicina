import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Fotografo } from '../../../models/fotografo.model';
import { Evento } from '../../../models/evento.model';

import { FotografoService } from '../../../services/fotografo.service';
import { EventoService } from '../../../services/evento.service';
import { delay } from 'rxjs/operators';
import { Estudio } from 'src/app/models/estudio.model';
import { EstudioService } from 'src/app/services/estudio.service';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import "../../../../assets/plugins/dropzone-master/dist/dropzone.js";
import { FileUploadService } from 'src/app/services/file-upload.service';
import { identifierModuleUrl } from '@angular/compiler';

declare var iniciar: any;

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: [ './evento.component.css' ]
})


export class EventoComponent implements OnInit {

  public eventoForm: FormGroup;
  public fotografos: Fotografo[] = [];

  public imagenesSubir: Array<File>;
  public imgTemp: any = null;

  public creado : boolean = false;
  public eventoSeleccionado: Evento;
  public fotografoSeleccionado: Fotografo[]=[];



  constructor( private fb: FormBuilder,
               private fotografoService: FotografoService,
               private eventoService: EventoService,
               private busquedasService: BusquedasService ,
               private router: Router,
               private fileUploadService: FileUploadService,
               private activatedRoute: ActivatedRoute,
               ) { }
  ngOnInit(): void {
    console.log('init');


    this.activatedRoute.params
    .subscribe( ({ id })=> {
      this.cargarEvento( id );

    });

    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required ],
      consignado: [''  ],
      direccion: [''],
      fotografo: [[] ],
      galeria: [[]],
      qr:['']
    });

    this.cargarFotografos();

    this.eventoForm.get('fotografo').valueChanges
        .subscribe( fotografosId => {
          if (typeof fotografosId != 'string') {
            for (const fotografoId of fotografosId) {
              this.fotografoSeleccionado.push( this.fotografos.find( h => h._id === fotografoId._id ));
            }
          }else if (fotografosId !='') {
            let ft = this.fotografos.find( h => h._id === fotografosId );
            if(!this.fotografoSeleccionado.includes(ft))
              this.fotografoSeleccionado.push(ft)
          }
        });
  }

   cargarEvento(id: string) {

    if ( id === 'nuevo' ) {

      return;
    }
    this.creado = true;

     this.eventoService.obtenerEventoPorId( id )
      .pipe(
        delay(100)
      )
      .subscribe( (evento:any) => {

        if ( !evento ) {
          return this.router.navigateByUrl(`/dashboard/eventos`);
        }
        const {nombre,consignado,direccion} = evento;


        const _id = (evento.fotografos.length > 0)? evento.fotografos : [];
        const fotos = (evento.galeria.length > 0)? evento.galeria : [];
        const qr = evento?.qr;
        console.log( fotos);

        // const { nombre, fotografo:{ _id } } = evento.;
        this.eventoSeleccionado = evento;

        this.eventoSeleccionado?.qr=="" ?  this.generarQR():console.log('no generooooo');
        ;
        console.log(this.eventoSeleccionado);
        console.log(nombre);
        console.log(_id);

        this.eventoForm.setValue({ nombre,consignado,direccion,galeria:fotos,fotografo:_id ,qr});
      });
  }

  cargarFotografos() {

    this.fotografoService.cargarFotografos()
      .subscribe( (fotografos: Fotografo[]) => {
        this.fotografos = fotografos;
      })

  }

  cambiarImagen( file: Array<File> ) {
    this.imagenesSubir = file;
    console.log('filefilefile');
    console.log(file);

    if ( !file ) {
      return this.imgTemp = null;
    }

    // const reader = new FileReader();
    // reader.readAsDataURL( file[0] );

    // reader.onloadend = () => {
    //   this.imgTemp = reader.result;
    // }
  }

  actulizarQR(){
    Swal.fire({title:'Please wait',
    allowEscapeKey: false,
    allowOutsideClick: false});
    Swal.showLoading();

     this.generarQR();
    console.log('4');
  }

   generarQR(){

      const data = {
        id: this.eventoSeleccionado._id,
        estudio: this.eventoSeleccionado.estudio,
        nombre: this.eventoSeleccionado.nombre,
        consignado: this.eventoSeleccionado.consignado,
        direccion: this.eventoSeleccionado.direccion,
      }

    console.log(data);
    // Swal.fire('Actualizado','QR de evento actulizado','success')

    //  this.qrService.generarQR(data).subscribe(qr =>{
    //   console.log('Fin de subscribe');
    //   this.eventoSeleccionado.qr = qr;
    //   // this.eventoForm.patchValue({qr : qr});
    //   Swal.close();
    //   // this.eventoSeleccionado.qr =  qr.;
    // }
    // );
  }
  subirImagen() {
    Swal.fire({title:'Please wait',
    allowEscapeKey: false,
    allowOutsideClick: false});
    Swal.showLoading();
    this.fileUploadService
      .actualizarFotos( this.imagenesSubir, 'eventos', 'galeria', this.eventoSeleccionado._id )
      .then( galeria => {

        this.eventoSeleccionado.galeria = this.eventoSeleccionado.galeria.concat(galeria);

        Swal.fire('Guardado', 'Imagen de evento actualizada', 'success');
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })
  }


  guardarEvento() {

    const { nombre } = this.eventoForm.value;
    console.log(this.eventoForm.value);

    if ( this.eventoSeleccionado ) {
      // actualizar
      const data = {
        ...this.eventoForm.value,
        _id: this.eventoSeleccionado._id,
        estudio: this.eventoSeleccionado.estudio,
        fotografos : this.fotografoSeleccionado
      }
      console.log('data');
      console.log(this.fotografoSeleccionado);
      console.log(data);

      this.eventoService.actualizarEvento( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
          this.actualizarEventoSeleccionado(data);

          this.generarQR();
        })

    } else {
      // crear

      this.eventoService.crearEvento( this.eventoForm.value )
          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');

            this.router.navigateByUrl(`/dashboard/evento/${ resp.evento._id }`);
        })
    }



  }

  actualizarEventoSeleccionado(dataSending){
      this.eventoSeleccionado.nombre =  dataSending.nombre,
      this.eventoSeleccionado.consignado =  dataSending.consignado,
      this.eventoSeleccionado.direccion =  dataSending.direccion
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

}
