import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Estudio } from '../models/estudio.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class EstudioService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  cargarEstudios() {

    const url = `${ base_url }/estudios`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, estudios: Estudio[] }) => resp.estudios )
              );
  }

  obtenerEstudioPorId( id: string ) {

    const url = `${ base_url }/estudios/${ id }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, estudio: Estudio }) => resp.estudio )
              );
  }

  crearEstudio( estudio: { nombre: string } ) {
console.log('estudio');
console.log(estudio);

    const url = `${ base_url }/estudios`;
    return this.http.post( url, estudio, this.headers );
  }

  actualizarEstudio( estudio: Estudio  ) {

    const url = `${ base_url }/estudios/${ estudio._id }`;
    return this.http.put( url, estudio, this.headers );
  }

  borrarEstudio( _id: string ) {

    const url = `${ base_url }/estudios/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}
