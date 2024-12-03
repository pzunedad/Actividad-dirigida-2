import {MongoClient } from "mongodb";
import { schema } from "./schema.ts";
import {ApolloServer} from "@apollo/server";
import { VuelosModel } from "./types.ts";
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from "./resolvers.ts";

const MONGO_URL ="mongodb+srv://otheruser:123456aaabbb@clusterpedro.txa9b.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPedro";
if(!MONGO_URL){
    throw new Error("Please provide a MONGO_URL");
}

const mongoClient = new MongoClient(MONGO_URL);
await mongoClient.connect();

console.info("Connected to MongoDB");

const mongoDB = mongoClient.db("vuelos");
const VuelosCollection = mongoDB.collection<VuelosModel>("vuelos");

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
  });
  
  const { url } = await startStandaloneServer(server, {
    context: async () => ({ VuelosCollection }),
  });
  
  console.info(`Server ready at ${url}`);
