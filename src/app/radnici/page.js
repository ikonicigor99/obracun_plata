'use client'
import { graphqlRequest } from "@/lib/graphqlClient";
import { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import styles from '@/styles/radnici.module.css';
import Table from "@/components/table";

// const ADD_RADNIKA = gql`
//       mutation DodajRadnika($ime: String!, $koeficijent: Float!) {
//          dodajRadnik(ime: $ime, koeficijent: $koeficijent) {
//             id
//             ime
//             koeficijent
//             kreirano
//          }
//       }    
//     `;

const RadniciPage = () => {
    const [radnici, setRadnici] = useState([]);
    const [ime, setIme] = useState("");
    const [koeficijent, setKoeficijent] = useState(0.0);
    const [bezVrijednosti, setBezVrijednost] = useState(false);
    const [ucitavanje, setUcitavanje] = useState(false);
    // const [dodajRadnik] = useMutation(ADD_RADNIKA);

    useEffect(() => {

        const fetchRadnici = async () => {
            setUcitavanje(true);
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
                setUcitavanje(false);
                setRadnici(data.zaposleni);
            } catch (error) {
                console.error('Greska pri dohvacaju radnika', error.message);
            }
        };
        fetchRadnici();
    }, []);


    const kreirajRadnika = async (e) => {
        e.preventDefault();
        if (!ime || koeficijent === "" || isNaN(parseFloat(koeficijent))) {
            setBezVrijednost(true);
            return;
        }

        try {
            const data = await graphqlRequest(`
                mutation($ime: String!, $koeficijent: Float!){
                dodajRadnik(ime: $ime, koeficijent: $koeficijent){                    
                    ime
                    koeficijent
                    kreirano
                }
            }
        `,
                { ime, koeficijent: parseFloat(koeficijent), }
            );

            const noviRadnik = data.dodajRadnik;

            if (noviRadnik) {
                setRadnici((prev) => [noviRadnik, ...prev]);
            }

            setIme("");
            setKoeficijent(0.0);

        } catch (error) {
            console.error('Greska pri dodavanju radnika', error.message());
        }


        // await dodajRadnika({ variables: { ime, koeficijent } });  // ovo je jedan od jednostavnijih primjera
        // setIme("");
        // setKoeficijent("");
    }

    // const dodajRadnika = async () => {

    // }

    return (
        <>
            {ucitavanje && <div>Učitavanje...</div>}

            <div>
                <Table data={radnici} />
            </div>

            <div>Ovdje mozete da kreirate novo radnika
                <form suppressHydrationWarning={true} onSubmit={kreirajRadnika} className="forma">
                    <input value={ime} onChange={(e) => setIme(e.target.value)} type="text" placeholder="Unesite ime radnika" />
                    <input value={koeficijent} onChange={(e) => setKoeficijent(e.target.value)} type="number" min="0.00" step="0.1" max={10} placeholder="Unesite koeficijent radnika" />
                    <button type="submit">Dodaj</button>
                </form>

                {bezVrijednosti && <div> Molim da unesete validne vrijednost!!!</div>}
            </div>
        </>
    )
}


export default RadniciPage;