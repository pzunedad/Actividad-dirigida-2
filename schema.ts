export const schema = `#graphql

type Vuelos{
    id: ID!
    origen: String!
    destino: String!
    fechaHora: String!
}

type Query {
    getFlights(origen: String, destino: String): [Vuelos!]!
    getFlight(id: ID!): Vuelos
}

type Mutation {
    addFlight(origen: String!, destino: String!, fechaHora: String!): Vuelos!
}

`;