import {Vuelos, VuelosModel} from "./types.ts";

export const fromModeltoVuelo = (vuelosModel: VuelosModel): Vuelos =>{
    return{
        id: vuelosModel._id!.toString(),
        origen: vuelosModel._id!.toString(),
        destino: vuelosModel._id!.toString(),
        fechaHora: vuelosModel._id!.toString(),
    };
};