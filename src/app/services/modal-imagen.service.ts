import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;
const s3_url = environment.s3_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo: 'usuarios'|'medicos'|'hospitales'|'fotografos'|'estudios'|'eventos';
  public id: string;
  public img: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(
      tipo: 'usuarios'|'medicos'|'hospitales'|'fotografos'|'estudios'|'eventos',
      id: string,
      img: string,
      idPadre?: any
    ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    // localhost:3000/api/upload/medicos/no-img


      if(this.tipo=='eventos'){
        if ( !img ) {
          this.img =  `${ base_url }/upload/${tipo}/no-image`;
        } else if ( img ) {
          this.img =  `${ s3_url }/uploads/estudios/${idPadre}/${ tipo }/${id}/img/${ img }`;
        }else{
          this.img =  `${ base_url }/upload/${tipo}/no-image`;
        }
      } else if(!img){
        this.img = `${ base_url }/upload/${ tipo }/no-img`;
      }else  if ( img.includes('https') ) {
        this.img = img;
      }else{
        this.img = `${s3_url}/uploads/${tipo}/${id}/img/${img}`;
      }

  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
