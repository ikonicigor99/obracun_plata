import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "../graphql/resolvers";

const typeDefs = `
    type Zaposleni {
        id: ID!
        ime: String!
        koeficijent: Float!
        kreirano: String!
    }

    type Evidencija {
        id: ID!
        zaposleni_id: ID!
        datum: String!
        radni_sati: Float!
        kreirano: String!
    }

    type Query {
        zaposleni: [Zaposleni!]!
        radni_dani: [Evidencija!]!
    }

    type Mutation {
       dodajRadnik( ime: String!, koeficijent: Float!, ): Zaposleni!

       unesiEvidenciju(
         zaposleni_id: ID!
         radni_dan: String!
         sati: Float!
       ): Evidencija!
    }
    
`;

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
