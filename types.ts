import { OptionalId } from "mongodb";

export type VuelosModel = OptionalId<{
    origen:string,
    destino: string,
    fechaHora: string,
}>

export type Vuelos ={
    id:string,
    origen: string,
    destino: string,
    fechaHora: string,
}