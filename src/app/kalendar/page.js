"use client";
import "react-calendar/dist/Calendar.css";
import styles from "@/styles/kalendar.module.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { graphqlRequest } from "@/lib/graphqlClient";
import { getRadnike } from "@/lib/getRadnike";

// Lazy load Calendar, samo na klijentu
const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

const Kalendar = () => {
    const [radnici, setRadnici] = useState([]);
    const [zaposleni_id, setZaposleni_id] = useState(null);
    const [datum, setDatum] = useState();
    const [sati, setSati] = useState(0);
    const [danas, setDanas] = useState();

    // useEffect(() => {
    //     const dns = new Date().toISOString().split('T')[0];
    //     setDanas(dns);
    //     console.log(dns)
    // }, []);


    useEffect(() => {
        const fetchRadnike = async () => {
            const fetchedRadnike = await getRadnike();
            setRadnici(fetchedRadnike);
        };
        fetchRadnike();
    }, []);

    const evidencijaDana = async (e) => {
        e.preventDefault();


        try {
            const data = await graphqlRequest(`
                mutation($zaposleni_id: ID!, $datum: String!, $sati: Float!){
                unesiEvidenciju(zaposleni_id: $zaposleni_id, datum:$datum, sati:$sati){
                    zaposleni_id
                    datum
                    sati
                }
            }
        `,
                { zaposleni_id, datum, sati: parseFloat(sati) }
            );
            console.log(data, "evidencija dana");
            setZaposleni_id("");
            setSati(0);

        } catch (error) {
            console.error("Greka pri evidenciji radnih sati", error.message);
        }
    };

    return (
        <>
            <div className={styles.mainCalendar}>
                {" "}
                <div className={styles.customCalendar}>
                    <Calendar onClickDay={(value) => setDatum(value)} maxDate={new Date()} />
                </div>
                <div className={styles.evidentionDays}>
                    <form onSubmit={evidencijaDana}>
                        <div>EVIDENCIJA RADNIH SATI</div>{" "}
                        {datum && (
                            <div style={{ marginTop: "1rem" }}>
                                Izabrani datum :{" "}
                                <strong>{datum.toLocaleDateString("sr-Latn")}</strong>
                            </div>
                        )}
                        <select
                            value={zaposleni_id || ""}
                            onChange={(e) => setZaposleni_id(e.target.value)}
                        >
                            <option value="">-- Izaberi radnika --</option>
                            {radnici.map((radnik) => (
                                <option key={radnik.id} value={radnik.id}>
                                    {radnik.ime}
                                </option>
                            ))}
                        </select>
                        <input
                            onChange={(e) => setSati(parseFloat(e.target.value))}
                            type="number"
                            min="0.0"
                            step="0.1"
                            max={8}
                        />
                        <button type="submit">Unesi radne sate</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Kalendar;
