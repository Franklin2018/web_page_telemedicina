

export interface ConsultaResponse {
  motivo:      string;
    costo:       number;
    estado:      string;
    _id:         string;
    duracion:     string;
    horaInicio:  string;
    medico:      string;
    paciente:    string;
    fichamedica: string;
    sala:        Sala;
}


export interface Sala {
  estado: string;
  _id:    string;
  room:   string;
}
