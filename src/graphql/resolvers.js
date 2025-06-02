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
            const [evidentirano] = pool.query('INSERT INTO radni_sati (zaposleni_id, datum, sati, kreirano) VALUES (?,?,?,?)', [zaposleni_id, datum, sati, kreirano]
            );
            return {
                id: evidentirano.insertId,
                zaposleni_id,
                datum,
                sati,
                kreirano: new Date().toISOString()
            }
        }
    },
};
