"use client";
const { graphqlRequest } = require("./graphqlClient");

export const getRadniDani = async () => {
    const query = `
        query {
            radni_dani {
                id
                zaposleni_id
                datum
                sati
                kreirano
            }
        }
    `;

    try {
        const data = await graphqlRequest(query);
        return data.radni_dani;
    }

    catch (error) {
        console.error("Greska pri hvatanju radnih dana", error.massage);
        return [];
    }
};
