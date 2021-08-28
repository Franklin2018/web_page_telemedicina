interface _User {
  _id: string;
}

interface _MedicoUser {
    _id: string;
    nombre: string;
    apellido: string;
    celular: string;
    usuario:_User;

}
interface _PacienteUser {
    _id: string;
    nombre: string;
    apellido: string;
    celular: string;
    usuario:_User
}


export class FichaMedica {

    constructor(
      public nroFicha: string,
      public fecha: Date,
      public horaInicio: string,
      public horaCierre: string,
      public estado: string,
      public medico: _MedicoUser,
      public paciente: _PacienteUser,
      public consulta?: string,
      public _id?: string,
      public nota?: string,

    ) {}

}

