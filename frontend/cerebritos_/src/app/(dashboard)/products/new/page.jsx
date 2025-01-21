"use client"

import { useEffect, useState } from "react"
import Loading from "../../../../../components/ui/Loading/loading";
import apiUrl from "../../../../../utils/apiConfig";
import { AdminMiddleware } from "../../../../../components/Middlewares";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreateProductPage(props) {

    const { data: session, status } = useSession();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [points_price, setPoints] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const router = useRouter();
    const [error, setError] = useState('');

    async function createProduct() {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('points_price', points_price);
        formData.append('price', price);

        const res = await fetch(`${apiUrl}/api/product/new`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session?.user.token}`
                },
                body: formData
            });
        const response = await res.json();
        if (response.message === 'Product created succesfully') {
            router.push(`/products`);
        } else {
            setError('Hubo un error creando el producto');
        }
    }

    const handleImageUpdate = (event) => {
        setImage(event.target.files[0]);
    }

    return <AdminMiddleware>
        <div className="m-md-5 m-0">
            <div className="card shadow-lg py-5">
                <form onSubmit={createProduct}>
                    <div className="row">
                        <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                            <div className="col px-3 text-center">
                                <h1>Crear Producto</h1>
                            </div>
                            <div className="col px-3 text-center">
                                <label htmlFor="productName" className="form-label fw-bold">Nombre del Producto</label>
                                <input type="text" onChange={(e) => { setName(e.target.value) }} className="form-control" id="productName" placeholder={name} required></input>
                            </div>
                            <div className="col px-3 text-center">
                                <label htmlFor="productDescription" className="form-label fw-bold">Descripción del Producto</label>
                                <textarea type="text" className="form-control" onChange={(e) => { setDescription(e.target.value) }} id="productDescription" placeholder={description} required></textarea>
                            </div>
                            <div className="col px-3 text-center">
                                <label htmlFor="productPoints" className="form-label fw-bold">Puntos del Producto</label>
                                <input type="number" className="form-control" onChange={(e) => { setPoints(Number(e.target.value)) }} id="productPoints" placeholder={points_price} required></input>
                            </div>
                            <div className="col px-3 text-center">
                                <label htmlFor="productPrice" className="form-label fw-bold">Precio del Producto</label>
                                <input type="number" className="form-control" step="0.01" onChange={(e) => { setPrice(Number(e.target.value)) }} id="productPrice" placeholder={price} required></input>
                            </div>
                            <div className="col px-3 text-center">
                                <label htmlFor="formFile" className="form-label fw-bold">Imagen</label>
                                <input className="form-control" onChange={handleImageUpdate} type="file" id="formFile" required></input>
                            </div>
                            <div className="col px-3 text-center">
                                <button type="submit" className="btn btn-success">Crear Producto</button>
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