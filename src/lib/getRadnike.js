'use client';
const { graphqlRequest } = require("./graphqlClient");

export const getRadnike = async () => {

    const query = `
        query {
            zaposleni {
                id
                ime
                koeficijent
                kreirano
            }
        }
    `;

    try {
        const data = await graphqlRequest(query);
        return data.zaposleni;
    } catch (error) {
        console.log('Greska pri fetchovanju radnika', error.message);
        return [];
    }
}
