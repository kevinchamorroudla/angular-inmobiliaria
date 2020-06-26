import { Ciudades } from './Ciudades';
import { PropiedadesAlquiladas } from './PropiedadesAlquiladas';

export class Propiedades {
    
    id: number
    titulo: string
    descripcion: string
    estado: string
    idPropietario: string
    fechaCreacion: Date
    fechaModificacion: Date
    ciudad: Ciudades

    alquileres: PropiedadesAlquiladas[]

    constructor(){
        this.id = null
        this.fechaCreacion = null
        this.fechaModificacion = null
        this.ciudad = null
        this.alquileres = null
    }
}