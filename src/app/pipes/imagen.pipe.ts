import { LowerCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;
const s3_url = environment.s3_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, arg: "usuarios"): string {

  var tipo = arg;
    console.log(img);

      if ( !img ) {
            return `${ base_url }/upload/${tipo}/no-image`;
        } else if ( img.includes('https') ) {
            return img;
        }  else {
            return  `${ base_url }/upload/${tipo}/no-image`;
        }
      }

}

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
