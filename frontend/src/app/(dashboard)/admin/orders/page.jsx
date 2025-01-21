"use client"
import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import apiUrl from "../../../../../utils/apiConfig";
import Loading from '../../../../../components/ui/Loading/loading';
import { AdminMiddleware } from "../../../../../components/Middlewares";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PaginationClient from '../../../../../components/ui/Pagination/Pagination.client';

export default function OrdersPage() {

    const { data: session, status } = useSession();
    const [page, setPage] = useState(useSearchParams().get('page') ?? 1);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [fetched, setFetched] = useState(true);

    async function getOrders() {
        const res = await fetch(`${apiUrl}/api/order/all?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${session?.user.token}`
            }
        });
        const newOrders = await res.json();
        setOrders(newOrders.data);
        setLoading(false);
    }

    async function setRecieved(orderId) {
        const res = await fetch(`${apiUrl}/api/order/discard-order/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${session?.user.token}`
            },
            method: 'PUT'
        });
        const response = await res.json();
        if (response.message === 'Order discarded succesfully') {

            setFetched(!fetched);
        }
    }

    useEffect(() => {
        if (status === 'authenticated') {
            getOrders();
        }
    }, [status, page, fetched]);

    if (loading) {
        return (
            <AdminMiddleware>
                <Loading></Loading>
            </AdminMiddleware>
        )
    }

    return (
        <AdminMiddleware>
            <div className='my-2'>
                <div className='container-fluid'>
                    <div className="card o-hidden border-0 p-3">
                        <div className="card-body p-0">
                            <h1 className='mb-4'>Pedidos</h1>
                            <div className="row d-none d-xl-flex">
                                <div className='col-12 col-md-1'>
                                    <span className='fw-bold'>#ID</span>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <span className='fw-bold'>Producto</span>
                                </div>
                                <div className='col-12 col-md-4'>
                                    <span className='fw-bold'>Usuario</span>
                                </div>
                                <div className='col-12 col-md-2'>
                                    <span className='fw-bold'>Estado</span>
                                </div>
                                <div className='col-12 col-md-1'>
                                    <span className='fw-bold'>Entregar</span>
                                </div>
                            </div>
                            <hr></hr>
                            {
                                orders.map((order) => (
                                    <div key={order.id}>
                                        <div className="row my-2 d-none d-xl-flex">
                                            <div className='col-12 col-md-1'>
                                                {order.id}
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <Link href={`/products/${order.product.id}`}>{order.product.name}</Link>
                                            </div>
                                            <div className='col-12 col-md-4'>
                                                <Link href={`/profiles/${order.user.id}`}>{order.user.name}</Link>
                                            </div>
                                            <div className='col-12 col-md-2'>
                                                {order.recieved === 0 ? ('Pendiente de entregar') : ('Entregado')}
                                            </div>
                                            <div className='col-12 col-md-1 d-flex align-items-center justify-content-center'>
                                                {order.recieved === 0 ? (
                                                    <button type="button" className="btn btn-success d-flex justify-content-center align-items-center p-2" data-bs-toggle="modal" data-bs-target={`#staticBackdrop-${order.id}-1`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-all" viewBox="0 0 16 16">
                                                            <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0" />
                                                            <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708" />
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    <button type="button" className="btn btn-success d-flex justify-content-center align-items-center p-2" disabled data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-all" viewBox="0 0 16 16">
                                                            <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0" />
                                                            <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708" />
                                                        </svg>
                                                    </button>
                                                )}

                                                <div className="modal fade" id={`staticBackdrop-${order.id}-1`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`staticBackdropLabel-${order.id}-1`} aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="staticBackdropLabel">Marcar {order.product.name} de {order.user.name} como entregado</h5>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body" data-bs-dismiss="modal">
                                                                <span>A continuación vas a marcar el producto {order.product.name} pedido por el usuario {order.user.name} como entregado. ¿Confimar?</span>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                                                <button type="button" onClick={() => { setRecieved(order.id) }} className="btn btn-success" data-bs-dismiss="modal">Confirmar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex d-xl-none justify-content-between align-items-center">
                                            <div className="d-flex flex-column">
                                                <span className="fw-bold">Producto: <span>{order.product.name}</span></span>
                                                <span className="fw-bold">Usuario: <span>{order.user.name}</span></span>
                                                <span className="fw-bold">Estado: <span>{order.recieved === 0 ? ('Pendiente de entregar') : ('Entregado')}</span></span>
                                            </div>
                                            <div>
                                                {order.recieved === 0 ? (
                                                    <button type="button" className="btn btn-success d-flex justify-content-center align-items-center p-2" data-bs-toggle="modal" data-bs-target={`#staticBackdrop-${order.id}-2`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-all" viewBox="0 0 16 16">
                                                            <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0" />
                                                            <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708" />
                                                        </svg>
                                                    </button>
                                                ) : (
                                                    <button type="button" className="btn btn-success d-flex justify-content-center align-items-center p-2" disabled data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-all" viewBox="0 0 16 16">
                                                            <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0" />
                                                            <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708" />
                                                        </svg>
                                                    </button>
                                                )}
                                                <div className="modal fade" id={`staticBackdrop-${order.id}-2`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`staticBackdropLabel-${order.id}-2`} aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="staticBackdropLabel">Marcar {order.product.name} de {order.user.name} como entregado</h5>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body" data-bs-dismiss="modal">
                                                                <span>A continuación vas a marcar el producto {order.product.name} pedido por el usuario {order.user.name} como entregado. ¿Confimar?</span>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                                                <button type="button" onClick={() => { setRecieved(order.id) }} className="btn btn-success" data-bs-dismiss="modal">Confirmar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr></hr>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <PaginationClient setPage={setPage} page={page} className='my-2' />
                    </div>
                </div>
            </div>
        </AdminMiddleware>

    );
}

