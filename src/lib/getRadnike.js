'use client';

const { useState } = require("react");
const { graphqlRequest } = require("./graphqlClient");

const getRadnike = async () => {
    const [radnici, setRadnici] = useState();

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
        setRadnici(data.zaposleni);
        console.log(radnici, "haha");
    } catch (error) {
        console.log('Greska pri fetchovanju radnika', error.message);
    }
}

export default getRadnike;