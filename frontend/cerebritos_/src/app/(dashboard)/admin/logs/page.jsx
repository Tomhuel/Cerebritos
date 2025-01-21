"use client"
import apiUrl from '../../../../../utils/apiConfig';
import { AdminMiddleware } from '../../../../../components/Middlewares';
import { useSession } from 'next-auth/react';
import Loading from '../../../../../components/ui/Loading/loading';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PaginationClient from '../../../../../components/ui/Pagination/Pagination.client';

function formatDate(date) {
    const newDate = new Date(date);
    let output = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} - ${newDate.getHours()}:${newDate.getMinutes().toString().padStart(2, '0')}`;
    return output;
}

export default function LogsPage() {
    const { data: session, status } = useSession();
    const [page, setPage] = useState(useSearchParams().get('page') ?? 1);
    const [loading, setLoading] = useState(true);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        if (session?.user.token !== undefined) {
            fetch(`${apiUrl}/api/logs?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${session?.user.token}`,
                }
            })
                .then((res) => res.json())
                .then(logs => {
                    setLogs(logs.data);
                    setLoading(false);
                });
        }
    }, [status, page]);

    if (loading) {
        return (
            <AdminMiddleware>
                <Loading></Loading>
            </AdminMiddleware>
        )
    }

    if (logs.length === 0) {
        return (
            <AdminMiddleware>
                <div className='m-5'>
                <div className='container-fluid'>
                    <div className="card o-hidden border-0 shadow-lg my-5 p-3">
                        <h1 className='mb-3 text-center'>Registros</h1>
                        <div className="card-body p-0">
                            <div className="row">
                                <div className='col-12 col-md-1'>
                                    <span className='fw-bold'>#ID</span>
                                </div>
                                <div className='col-12 col-md-7'>
                                    <span className='fw-bold'>Mensaje</span>
                                </div>
                                <div className='col-12 col-md-2'>
                                    <span className='fw-bold'>Tipo de Registro</span>
                                </div>
                                <div className='col-12 col-md-2'>
                                    <span className='fw-bold'>Fecha</span>
                                </div>
                            </div>
                            <hr></hr>
                            
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
        )
    }

    return (
        <AdminMiddleware>
            <div className='m-0 m-md-3 mt-0 mt-md-5'>
                <div className='container-fluid'>
                    <div className="card o-hidden border-0 shadow-lg p-3 p-3">
                        <h1 className='mb-3 text-center'>Registros</h1>
                        <div className="card-body p-0">
                            <div className="row">
                                <div className='col-12 col-md-1'>
                                    <span className='fw-bold'>#ID</span>
                                </div>
                                <div className='col-12 col-md-7'>
                                    <span className='fw-bold'>Mensaje</span>
                                </div>
                                <div className='col-12 col-md-2'>
                                    <span className='fw-bold'>Tipo de Registro</span>
                                </div>
                                <div className='col-12 col-md-2'>
                                    <span className='fw-bold'>Fecha</span>
                                </div>
                            </div>
                            <hr></hr>
                            {
                                logs.map((log) => (
                                    <div key={log.id}>
                                        <div className="row my-2">
                                            <div className='col-12 col-md-1'>
                                                {log.id}
                                            </div>
                                            <div className='col-12 col-md-7'>
                                                {log.message}
                                            </div>
                                            <div className='col-12 col-md-2'>
                                                {log.logType}
                                            </div>
                                            <div className='col-12 col-md-2'>
                                                {formatDate(log.created_at)}
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