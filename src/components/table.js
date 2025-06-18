"use client";
import styles from '@/styles/table.module.css';

const Table = ({ data = [] }) => {

    if (!data || data.length === 0) {
        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th>Nema podataka!</th>
                        </tr>
                    </thead>
                </table>
            </>
        );
    }

    const headers = Object.keys(data[0] || {});


    return (
        <div className={styles.headerTable}>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr className={styles.tr}>
                        {headers.map((header) => (
                            <th key={header}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {headers.map((key) => (
                                <td className={styles.td}>{row[key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
