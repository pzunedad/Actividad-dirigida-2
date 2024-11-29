import { Collection, ObjectId } from "mongodb"; 
import { Vuelos,VuelosModel  } from "./types.ts";
import { fromModeltoVuelo } from "./utils.ts";

export const resolvers = {
    Query:{
        getFlights: async(
            _:unknown,
            __: unknown,
            context: {VuelosCollection: Collection<VuelosModel>},
        ): Promise<Vuelos[]> =>{
            const vuelosModel = await context.VuelosCollection.find().toArray();
            return vuelosModel.map((vueloModel)=>
                fromModeltoVuelo(vueloModel)
            );
        },
        getFlight: async (
            _:unknown,
            {id}: {id: string},
            context: { VuelosCollection: Collection<VuelosModel>},
        ): Promise<Vuelos | null> => {
            const vueloModel = await context.VuelosCollection.findOne({
                _id: new ObjectId(id),
            });
            if(!vueloModel){
                return null;
            }
            return fromModeltoVuelo(vueloModel);
        },
    },
    Mutation: {
        addFlight: async (
            _:unknown,
            args: {origen:string, destino:string, fechaHora: string},
            context: {
                VuelosCollection: Collection<VuelosModel>;
            },
        ): Promise<Vuelos> =>{
            const {origen, destino, fechaHora} = args;
            const {insertedId} = await context.VuelosCollection.insertOne({
                origen,
                destino,
                fechaHora,
            });
            const vueloModel = {
                _id: insertedId,
                origen,
                destino,
                fechaHora,
            };
            return fromModeltoVuelo(vueloModel);
        },
        
    },

};