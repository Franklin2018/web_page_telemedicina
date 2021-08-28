import { FichaMedica } from '../models/ficha-medica.model';

export interface CargarFichaMedica {
    total: number;
    fichaMedicas:  FichaMedica[];
}
