import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Evento } from '../models/evento.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      }
    }
  }


  cargarEventos() {

    const url = `${ base_url }/eventos`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, eventos: Evento[] }) => resp.eventos )
              );
  }

  obtenerEventoPorId( id: string ) {

    const url = `${ base_url }/eventos/${ id }`;
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, evento: Evento }) => resp.evento )
              );
  }

  crearEvento( evento: { nombre: string} ) {
    console.log('evento');
    console.log(evento);

    const url = `${ base_url }/eventos`;
    return this.http.post( url, evento, this.headers );
  }

  actualizarEvento( evento: Evento  ) {

    const url = `${ base_url }/eventos/${ evento._id }`;
    return this.http.put( url, evento, this.headers );
  }

  borrarEvento( _id: string ) {

    const url = `${ base_url }/eventos/${ _id }`;
    return this.http.delete( url, this.headers );
  }

}
