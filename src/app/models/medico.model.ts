import { Persona } from './persona.model';


export class Medico {

  constructor(
      public licMedica: string,
      public titulo: string,
      public _id?: string,
      public nosocomio?: string,
      public direccionNosocomio?: string,
      public calificacion?: string,
      public descripcion?: string,
      public cv?: string,
      public credencialMedico?: string,
      public especilidad?: string,
      public persona?: Persona,
  ) {}

}

