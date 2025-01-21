import Link from 'next/link';

export default function Pagination({ page, className }) {

    const actualPage = Number(page) ?? 1;

    const previousPage = () => {
        if (actualPage <= 1) {
            return 1;
        }
        return actualPage - 1;
    }

    return (
        <nav className={className}>
            <ul className="pagination">
                {actualPage !== 1 ? (<li className="page-item"><Link className="page-link" href={`?page=${previousPage()}`}>Anterior</Link></li>) : ('')}
                <li className="page-item"><span className="page-link">{actualPage}</span></li>
                <li className="page-item"><Link className="page-link" href={`?page=${Number(page) + 1}`}>Siguiente</Link></li>
            </ul>
        </nav>
    )
}