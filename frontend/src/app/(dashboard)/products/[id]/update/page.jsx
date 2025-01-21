"use client"

import { useEffect, useState } from "react"
import Loading from "../../../../../../components/ui/Loading/loading";
import apiUrl from "../../../../../../utils/apiConfig";
import { AdminMiddleware } from "../../../../../../components/Middlewares";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UpdateProductPage(props) {

    const { data: session, status } = useSession();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [points_price, setPoints] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [error, setError] = useState('');

    async function getProduct() {
        const res = await fetch(`${apiUrl}/api/product/${props.params.id}`);
        const productData = await res.json();
        const product = productData.data;
        setName(product.name);
        setImageUrl(product.image);
        setDescription(product.description);
        setPoints(product.points_price);
        setPrice(product.price);
        setLoading(false);
        setFetched(true);
    }

    async function deleteProduct() {
        const res = await fetch(`${apiUrl}/api/product/delete/${props.params.id}`, {
            headers: {
                'Authorization': `Bearer ${session?.user.token}`,
            },
            method: 'DELETE',
        });
        const response = await res.json();
        if (response.message === 'Product Deleted Succesfully') {
            window.location.href = '/products';
        } else {
            setError('Hubo un problema borrando el producto');
        }
    }

    async function updateProduct() {
        event.preventDefault();
        const formData = new FormData();

        if (image !== null) {
            formData.append('image', image);
        }
        formData.append('name', name);
        formData.append('description', description);
        formData.append('points_price', points_price);
        formData.append('price', price);

        const res = await fetch(`${apiUrl}/api/product/update/${props.params.id}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session?.user.token}`
                },
                body: formData
            });
        const response = await res.json();
        if (response.message === 'Product updated succesfully') {
            router.push(`/products/${props.params.id}`);
        } else {
            setError('Hubo un error actualizando el logro');
        }
    }

    const handleImageUpdate = (event) => {
        setImage(event.target.files[0]);
    }

    useEffect(() => {
        getProduct();
    }, [fetched])

    if (loading) {
        return (
            <AdminMiddleware>
                <Loading></Loading>
            </AdminMiddleware>
        )
    }

    return <AdminMiddleware>
        <div className="m-md-5 m-0">
            <div className="card shadow-lg py-5">
                <form className="container-fluid" onSubmit={updateProduct}>
                    <div className="row justify-content-center mb-2">
                        <img src={imageUrl} className="border border-dark ratio-1 rounded-circle w-25 p-0" alt="Achievement Image"></img>
                    </div>
                    <div className="row">
                        <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                            <div className="col px-3 text-center">
                                <label htmlFor="productName" className="form-label fw-bold">Nombre del Producto</label>
                                <input type="text" onChange={(e) => { setName(e.target.value) }} className="form-control" id="productName" placeholder={name}></input>
                            </div>
                            <div className="col px-3 text-center">
                                <label htmlFor="productDescription" className="form-label fw-bold">Descripción del Producto</label>
                                <textarea type="text" className="form-control" onChange={(e) => { setDescription(e.target.value) }} id="productDescription" placeholder={description}></textarea>
                            </div>
                            <div className="col px-3 text-center">
                                <label htmlFor="productPoints" className="form-label fw-bold">Puntos del Producto</label>
                                <input type="number" className="form-control" onChange={(e) => { setPoints(Number(e.target.value)) }} id="productPoints" placeholder={points_price}></input>
                            </div>
                            <div className="col px-3 text-center">
                                <label htmlFor="productPrice" className="form-label fw-bold">Precio del Producto</label>
                                <input type="number" className="form-control" step="0.01" onChange={(e) => { setPrice(Number(e.target.value)) }} id="productPrice" placeholder={price}></input>
                            </div>
                            <div className="col px-3 text-center">
                                <label htmlFor="formFile" className="form-label fw-bold">Imagen</label>
                                <input className="form-control" onChange={handleImageUpdate} type="file" id="formFile"></input>
                            </div>
                            <div className="col px-3 text-center">
                                <button type="submit" className="btn btn-success">Actualizar</button>
                            </div>
                            <div className="col px-3 text-center">
                                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Borrar Producto
                                </button>

                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Borrar Producto</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                ¿Estás seguro que quieres borrar el producto: "{name}"?
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                                <button type="button" onClick={deleteProduct} data-bs-dismiss="modal" className="btn btn-danger">Borrar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {error !== '' ? (
                                <div className="col px-3 text-center">
                                    <div className="alert alert-danger">
                                        {error}
                                    </div>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </AdminMiddleware>
}