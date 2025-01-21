import apiUrl from '../../../../utils/apiConfig';
import Pagination from '../../../../components/ui/Pagination/Pagination';
import ProductCard from '../../../../components/ui/Cards/Product/ProductCard';

async function fetchProducts(page) {
    const res = await fetch(`${apiUrl}/api/product/all?page=${page}`, { cache: 'no-cache' });
    const productsData = await res.json();
    return productsData.data;
}

export default async function ProductsPage({ searchParams }) {
    const page = searchParams.page ?? 1;
    const products = await fetchProducts(page);

    if (products.length === 0) {
        return (
            <div className='m-5'>
                <div className='mb-3'>
                    <h1>No hay datos</h1>
                </div>
                <div className='row'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <Pagination page={page} className='my-2' />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className='m-5'>
                <div className='mb-3'>
                    <h1>Productos</h1>
                </div>
                <div className='row gap-2 gap-md-0'>
                    {
                        products.map((product) => (
                            <div className='col-12 col-md-6 col-lg-4 col-xl-3'>
                                <ul className='p-0'>
                                    <ProductCard product={product} className={''}></ProductCard>
                                </ul>
                            </div>
                        ))
                    }
                </div>
                <div className='row'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <Pagination page={page} className='my-2' />
                    </div>
                </div>
            </div>
        </>
    );
}

