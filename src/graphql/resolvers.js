import { pool } from '@/lib/db';

export const resolvers = {
    Query: {
        zaposleni: async () => {
            try {
                const [rows] = await pool.query('SELECT * FROM zaposleni');
                console.log('MySQL rows:', rows);

                // eksplicitno mapiraj kolone na polja koja GraphQL očekuje
                return rows.map(row => ({
                    id: row.id,
                    ime: row.ime,
                    koeficijent: parseFloat(row.koeficijent),
                    kreirano: row.kreirano.toISOString() // pretvori timestamp u string
                }));
            } catch (error) {
                console.error('Greška u upitu:', error);
                return [];
            }
        },

        radni_dani: async () => {
            try {
                const [radni_dani] = await pool.query('SELECT rd.id, rd.zaposleni_id, rd.datum, rd.sati, z.ime FROM radni_dani rd JOIN zaposleni z ON rd.id_zaposlenog = z.id');
                return radni_dani.map(radni_dan => ({
                    id: radni_dan.id,
                    zaposleni_id: radni_dan.zaposleni_id,
                    datum: radni_dan.datum,
                    sati: parseFloat(radni_dan.sati),
                    kreirano: radni_dan.kreirano.toISOString()
                }));
            } catch (error) {
                console.error('Greska pri upitu', error);
                return [];
            }
        }
    },

    Mutation: {
        dodajRadnik: async (_, { ime, koeficijent, }) => {
            const kreirano = new Date();
            const [rezultat] = await pool.query("INSERT INTO zaposleni (ime,koeficijent, kreirano) VALUES (?, ?, ?)", [ime, koeficijent, kreirano]);
            return {
                id: rezultat.insertId,
                ime,
                koeficijent,
                kreirano: kreirano.toISOString(),
            }
        },

        unesiEvidenciju: async (_, { zaposleni_id, datum, sati }) => {
            const kreirano = new Date();
            const [evidentirano] = await pool.query('INSERT INTO radni_dani (zaposleni_id, datum, sati, kreirano) VALUES (?,?,?,?)', [zaposleni_id, datum, sati, kreirano]);
            return {
                id: evidentirano.insertId,
                zaposleni_id,
                datum,
                sati: parseFloat(sati),
                kreirano: kreirano.toISOString()
            }
        }
    }
}

