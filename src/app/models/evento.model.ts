import { Estudio } from './estudio.model';
import { Fotografo } from './Fotografo.model';

interface _EventoUser {
    _id: string;
    nombre: string;
    img: string;
}


export class Evento {

    constructor(
      public nombre: string,
      public consignado: string,
      public direccion: string,
      public _id?: string,
        public img?: string,
        public qr?: string,
        public galeria?: Array<string>,
        public usuario?: _EventoUser,
        public fotografo?: Fotografo,
        public estudio?: Estudio
    ) {}

}

