import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Fotografo } from '../../../models/fotografo.model';
import { Estudio } from '../../../models/estudio.model';

import { FotografoService } from '../../../services/fotografo.service';
import { EstudioService } from '../../../services/estudio.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-estudio',
  templateUrl: './estudio.component.html',
  styles: [
  ]
})
export class EstudioComponent implements OnInit {

  public estudioForm: FormGroup;
  public fotografos: Fotografo[] = [];

  public estudioSeleccionado: Estudio;
  public fotografoSeleccionado: Fotografo;



  constructor( private fb: FormBuilder,
               private fotografoService: FotografoService,
               private estudioService: EstudioService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {


    this.activatedRoute.params
    .subscribe( ({ id }) => this.cargarEstudio( id ) );
    // .subscribe(params) => console.log(params);

    this.estudioForm = this.fb.group({
      nombre: ['', Validators.required ],
      direccion: [''],
      telefono: ['']
    });

    // this.cargarFotografos();

    // this.estudioForm.get('fotografo').valueChanges
    //     .subscribe( fotografoId => {
    //       console.log('++++++++fotografoId');
    //       console.log(fotografoId);

    //       this.fotografoSeleccionado = this.fotografos.find( h => h._id === fotografoId );
    //       console.log(this.fotografoSeleccionado);
    //     })
  }

  cargarEstudio(id: string) {

    // if ( id === 'nuevo' ) {
    //   return;
    // }

     this.estudioService.obtenerEstudioPorId( id )
      .pipe(
        delay(100)
      )
      .subscribe( (estudio:Estudio) => {

        if ( !estudio ) {
          return this.router.navigateByUrl(`/dashboard/estudios`);
        }
        console.log(estudio);

        const { nombre, direccion, telefono } = estudio;
        this.estudioSeleccionado = estudio;
        this.estudioForm.setValue({ nombre, direccion, telefono});
      });

  }

  // cargarFotografos() {

  //   this.fotografoService.cargarFotografos()
  //     .subscribe( (fotografos: Fotografo[]) => {
  //       this.fotografos = fotografos;
  //     })

  // }

  guardarEstudio() {

    const { nombre } = this.estudioForm.value;

    if ( this.estudioSeleccionado ) {
      // actualizar
      const data = {
        ...this.estudioForm.value,
        _id: this.estudioSeleccionado._id
      }
      this.estudioService.actualizarEstudio( data )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
        })

    } else {
      // crear

      console.log('crear');
      console.log(this.estudioForm);
      console.log(this.estudioForm.value);
      this.estudioService.crearEstudio( this.estudioForm.value )
          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/estudio/${ resp.estudio._id }`)
        })
    }



  }

}
