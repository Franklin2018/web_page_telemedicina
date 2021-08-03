import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Fotografo } from '../models/fotografo.model';

const base_url = environment.base_url;
const s3_url = environment.s3_url;


@Injectable({
  providedIn: 'root'
})
export class FotografoService {


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


  cargarFotografos() {

    const url = `${ base_url }/fotografos`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, fotografos: Fotografo[] }) => resp.fotografos )
              );
  }

  crearFotografo( data: any ) {

    const url = `${ base_url }/fotografos`;
    return this.http.post( url, data, this.headers );
  }

  actualizarFotografo( _id: string, nombre: string  ) {

    const url = `${ base_url }/fotografos/${ _id }`;
    return this.http.put( url, { nombre }, this.headers );
  }

  borrarFotografo( _id: string ) {

    const url = `${ base_url }/fotografos/${ _id }`;
    return this.http.delete( url, this.headers );
  }

//   imgUrl(fotografos: Fotografo[])
//   {
//     fotografos.forEach(fotografo => {
//       const id = fotografo._id;
//       const img = fotografo.img;
//       fotografo.img = this._imagenUrl(id,img);
//     });
//     console.log(fotografos);

//     return fotografos;
//   }

//   _imagenUrl(id:string ,img: string) {

//     if ( !img ) {
//         return ``;
//     } else if ( img.includes('https') ) {
//         return img;
//     } else if ( img ) {
//         return `${ s3_url }/uploads/fotografos/${id}/img/${ img }`;
//     } else {
//         return `${ base_url }/uploads/no-image`;
//     }
// }
}
