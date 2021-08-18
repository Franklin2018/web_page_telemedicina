import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Especialidad } from '../models/especialidad.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {


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


  cargarEspecialidades() {

    const url = `${ base_url }/especialidad/getespecialidades`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, especialidades: Especialidad[] }) => resp.especialidades )
              );
  }

  crearEspecialidad( data: any ) {

    const url = `${ base_url }/especialidad`;
    return this.http.post( url, data, this.headers );
  }

  actualizarEspecialidad( _id: string, nombre: string  ) {

    const url = `${ base_url }/especialidad/${ _id }`;
    return this.http.put( url, { nombre }, this.headers );
  }

  borrarEspecialidad( _id: string ) {

    const url = `${ base_url }/especialidad/${ _id }`;
    return this.http.delete( url, this.headers );
  }

//   imgUrl(especialidad: Especialidad[])
//   {
//     especialidad.forEach(fotografo => {
//       const id = fotografo._id;
//       const img = fotografo.img;
//       fotografo.img = this._imagenUrl(id,img);
//     });
//     console.log(especialidad);

//     return especialidad;
//   }

//   _imagenUrl(id:string ,img: string) {

//     if ( !img ) {
//         return ``;
//     } else if ( img.includes('https') ) {
//         return img;
//     } else if ( img ) {
//         return `${ s3_url }/uploads/especialidad/${id}/img/${ img }`;
//     } else {
//         return `${ base_url }/uploads/no-image`;
//     }
// }
}
