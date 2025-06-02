"use client";
import "react-calendar/dist/Calendar.css";
import styles from "@/styles/kalendar.module.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { graphqlRequest } from "@/lib/graphqlClient";

// Lazy load Calendar, samo na klijentu
const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

const Kalendar = () => {
    const [zaposleni_id, setRadnikID] = useState();
    const [danas, setDanas] = useState();

    const evidencijaDana = async (e) => {
        e.preventDefault();

        try {
            const data = await graphqlRequest(
                `
            mutation($zaposleni_id: ID!, $datum: String!, $sati: Float!,){
                unesiEvidenciju(radnikID: $zaposleni_id, danas:$datum, sati:$sati){
                    zaposleni_id
                    datum
                    sati
                }
            }`,
                { zaposleni_id, danas, sati }
            );
        } catch (error) {
            console.error("Greka pri evidenciji radnih sati", error.message());
        }
    };
    //kada kliknem da posaljem poda
    return (
        <>
            <div className={styles.mainCalendar}>
                {" "}
                <div className={styles.customCalendar}>
                    <Calendar onClickDay={(value) => setDanas(value)} />
                </div>
                <div className={styles.evidentionDays}>
                    <form>
                        <div>EVIDENCIJA RADNIH SATI</div>{" "}
                        {danas && (
                            <div style={{ marginTop: "1rem" }}>
                                Izabrani datum :{" "}
                                <strong>{danas.toLocaleDateString("sr-Latn")}</strong>
                            </div>
                        )}

                        {/* <input type={} */}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Kalendar;
