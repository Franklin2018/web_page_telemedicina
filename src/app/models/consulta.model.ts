

export class Consulta {

  constructor(
    public motivo?:      string,
    public costo?:       number,
    public estado?:      string,
    public _id?:         string,
    public duracion?:     string,
    public horaInicio?:  string,
    public medico?:      string,
    public paciente?:    string,
    public fichamedica?: string,
    public sala?:        Sala
  ) {}

}


export class Sala {
  constructor(
    public estado: string,
    public _id:    string,
    public room:   string,
  ){}
}

