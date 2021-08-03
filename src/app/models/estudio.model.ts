import { Fotografo } from './Fotografo.model';

interface _EstudioUser {
    _id: string;
    nombre: string;
    telefono: string;
    direccion: string;
    img: string;
}


export class Estudio {

    constructor(
        public nombre: string,
        public direccion: string,
        public telefono: string,
        public _id?: string,
        public img?: string,
        public usuario?: _EstudioUser,
        public fotografo?: Fotografo
    ) {}

}

