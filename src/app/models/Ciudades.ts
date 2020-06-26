import { Propiedades } from './Propiedades';

export class Ciudades {
    id: number;
    nombre: string;
    codigo: string;
    estado: string;
    fechaCreacion: string;
    fechaModificacion: string;
    idEstado: number;

    propiedades: Propiedades[]

    constructor(){
        this.propiedades = null
    }
}