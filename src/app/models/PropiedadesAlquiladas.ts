import { Propiedades } from './Propiedades'

export class PropiedadesAlquiladas {
    id: number
    idArrendador: string
    estatus: string
    fechaCreacion: Date
    fechaModificacion: Date

    propiedad: Propiedades

    constructor () {
        this.propiedad = null
    }
}