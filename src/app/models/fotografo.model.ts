import { environment } from '../../environments/environment';

const base_url = environment.base_url;
const s3_url = environment.s3_url;


interface _FotografoUser {
    _id: string;
    nombre: string;
    img: string;
}


export class Fotografo {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public telefono?: string,
        public ci?: string,
        public estado?: boolean,
        public usuario?: _FotografoUser,
    ) {}

}

