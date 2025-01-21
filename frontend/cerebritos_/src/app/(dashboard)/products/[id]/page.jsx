"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import Loading from "../../../../../components/ui/Loading/loading";
import apiUrl from "../../../../../utils/apiConfig";
import Link from 'next/link';
import { AdminDisplay, AdminMonitorDisplay, KidDisplay } from "../../../../../components/Middlewares/Displays";

export default function ProductPage(props) {

    const { data: session, status, update } = useSession();
    const [product, setProduct] = useState({});
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [reserveSuccess, setReserveSucces] = useState(false);

    async function fetchProduct() {
        const res = await fetch(`${apiUrl}/api/product/${props.params.id}`);
        const product = await res.json();
        setProduct(product.data);
        setFetched(true);
        setLoading(false);
    }

    async function reserveProduct(id) {
        setReserveSucces(false);
        setError('');
        const res = await fetch(`${apiUrl}/api/product/reserve-product/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${session?.user.token}`
            }
        });
        const response = await res.json();
        if (response.message === 'Product reserved succesfully') {
            setReserveSucces(true);
            await updateUser()
        } else if (response.message === 'Product not found') {
            setError('Este producto no existe');
        } else if (response.message === 'Not enough points') {
            setError('Puntos insuficientes');
        } else {
            setError('Error reservando el producto. Intentalo más tarde.');
        }
    }

    async function updateUser() {
        const res = await fetch(`${apiUrl}/api/user/me`,
            {
                headers: {
                    "Authorization": `Bearer ${session.user.token}`,
                    "Content-Type": "application/json",
                    "Accept": 'application/json'
                }
            });
        const userData = await res.json();
        const newUser = userData.data;
        const newSession = await update({
            ...session,
            user: {
                ...session.user,
                user: {
                    ...session.user.user,
                    ...newUser
                }
            }
        });
    }

    useEffect(() => {
        if (status !== 'loading') {
            fetchProduct();
        }
    }, [status, fetched]);

    if (status === 'loading') {
        return (
            <>
                <Loading></Loading>
            </>
        )
    }

    return <>
        <div className="m-5">
            <div className="row justify-content-between">
                <div className="col-12 mb-3 col-md-3">
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <img src={product.image} className="img-fluid ratio-1 border border-dark rounded-circle" alt="Product Image"></img>
                    </div>
                    <KidDisplay>
                        <div className="d-flex flex-column gap-2">
                            <div className="d-flex justify-content-center align-items-center">
                                {session?.user.user.points > product.points_price ? (
                                    <button className="btn btn-primary" onClick={() => reserveProduct(product.id)}>Reservar Producto</button>
                                ) : (
                                    <button className="btn btn-primary" disabled>Reservar Producto</button>
                                )}
                            </div>
                            <div className="d-flex justify-content-center align-items-center">

                                {reserveSuccess ? (
                                    <div className="alert alert-success">
                                        <span>Producto reservado exitosamente</span>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                {error !== '' ? (
                                    <div className="alert alert-danger">
                                        <span>{error}</span>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    </KidDisplay>
                </div>
                <div className="col-12 col-md-9">
                    <div className="row align-items-around justify-content-center">
                        <div className="row justify-content-between align-items-start">
                            <h1 className="fs-1 col-12 p-0 col-md-4 text-center text-md-start">{product.name}</h1>
                            <AdminDisplay>
                                <Link href={`/products/${product.id}/update`} className="btn btn-success d-none d-md-block col-12 col-md-4 col-xl-2">Actualizar Producto</Link>
                            </AdminDisplay>
                        </div>
                        <p className="fs-4">{product.description}</p>
                        <p className="fs-5">{`${product.points_price} puntos`}</p>
                    </div>
                </div>
            </div>
            <AdminMonitorDisplay>
                <div className="row">
                    <button className="btn btn-success d-md-none col-12 col-md-4 col-xl-2">Actualizar Logro</button>
                </div>
            </AdminMonitorDisplay>
        </div >
    </>
}