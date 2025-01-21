"use client"

export default function PaginationClient({ page, setPage, className }) {

    const previousPage = () => {
        if (page <= 1) {
            return 1;
        }
        return page - 1;
    }

    const handlePreviousPage = () => {
        setPage(previousPage());
    }

    const handleNextPage = () => {
        setPage(Number(page) + 1);
    }

    return (
        <nav className={className}>
            <ul className="pagination">
                {page !== 1 ? (<li className="page-item"><button onClick={handlePreviousPage} className="page-link">Anterior</button></li>) : ('')}
                <li className="page-item"><span className="page-link">{page}</span></li>
                <li className="page-item"><button onClick={handleNextPage} className="page-link">Siguiente</button></li>
            </ul>
        </nav>
    )
}