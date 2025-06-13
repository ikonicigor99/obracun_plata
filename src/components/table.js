"useclient";

const Table = ({ th = [], td = [] }) => {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        {th.map((ths, index) => (
                            <th key={index}>{ths}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {td.length === 0 ? (
                        <tr>
                            <td colSpan={th.length}>Nema podataka</td>
                        </tr>
                    ) : (
                        td.map((row, rowIndex) => (
                            <tr key={rowIndex}>{row.map((cell, cellIndex) => ({ cell }))}</tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
};

export default Table;
