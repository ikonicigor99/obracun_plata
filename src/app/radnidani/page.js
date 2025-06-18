"use client";
import { getRadniDani } from "@/lib/getRadniDani";
import Table from "@/components/table";
import { useEffect, useState } from "react";

const RadniDani = () => {
    const [radniDani, setRadniDani] = useState([]);

    useEffect(() => {
        const fetchRadniDani = async () => {
            const fetchedRadniDani = await getRadniDani();
            setRadniDani(fetchedRadniDani);
        };
        fetchRadniDani();
    }, []);


    return (
        <div>
            <div>
                <Table data={radniDani} />
                {/* {radniDani.map((radni_dani) => (
                    <div key={radni_dani.id}>
                        <div>{radni_dani.zaposleni_id}</div>
                        <div>{radni_dani.datum}</div>
                        <div>{radni_dani.sati}</div>
                        <div>{radni_dani.zaposleni_id}</div>
                    </div>
                ))} */}
            </div>
        </div>
    );
};

export default RadniDani;
