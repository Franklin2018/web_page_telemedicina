import { LowerCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;
const s3_url = environment.s3_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, arg: ["usuarios"|"medicos"|"hospitales"|"fotografos"|"estudios"|"eventos","img"|"galeria"|"qr",string, any?]): string {

  var tipo = arg[0];
  var dir = arg[1];
  var id = arg[2];


    if(tipo=='eventos'){
      let idEstudio = arg[3];
      if ( !img ) {
        return `${ base_url }/upload/${tipo}/no-image`;
      } else if ( img ) {
          return `${ s3_url }/uploads/estudios/${idEstudio}/${ tipo }/${id}/${dir}/${ img }`;
      }
    }else{
      if ( !img ) {
            return `${ base_url }/upload/${tipo}/no-image`;
        } else if ( img.includes('https') ) {
            return img;
        } else if ( img ) {
            return `${ s3_url }/uploads/${ tipo }/${id}/${dir}/${ img }`;
        } else {
            return  `${ base_url }/upload/${tipo}/no-image`;
        }
    }
  }

}
