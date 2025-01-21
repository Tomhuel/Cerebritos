"use client"
import FatherMiddleware from "../../../../components/Middlewares/Father";
import Loading from "../../../../components/ui/Loading/loading";
import apiUrl from "../../../../utils/apiConfig";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function FamilyPage() {

    const { data: session, status } = useSession();
    const [changeKids, setChangeKids] = useState(false);
    const [errorAdding, setErrorAdding] = useState('');
    const [kids, setKids] = useState([]);
    const [kidCode, setKidCode] = useState('');

    async function deleteKid(kidId) {
        const res = await fetch(`${apiUrl}/api/family/delete-kid/${kidId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${session?.user.token}`,
                'Content-Type': `application/json`,
                'Accept': 'application/json'
            }
        });
        const deleteRes = await res.json();
        if (deleteRes.message === 'Kid removed succesfully!') {
            setChangeKids(!changeKids);
        }
    }

    async function fetchKids() {
        const res = await fetch(`${apiUrl}/api/family/kids`,
            {
                headers: {
                    'Authorization': `Bearer ${session?.user.token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
        const kidsData = await res.json();
        setKids(kidsData.data);
    }

    async function addKid() {
        event.preventDefault();
        setErrorAdding('');
        const res = await fetch(`${apiUrl}/api/family/add-kid`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session?.user.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                kidUUID: kidCode
            })
        });

        const response = await res.json();
        if (response.message === 'The user must be a father') {
            setErrorAdding('Debes ser un padre para añadir niños a tu unidad familiar.');
            return;
        }
        if (response.message === 'The UUID must be from a Kid') {
            setErrorAdding('Código inválido');
            return;
        }
        if (response.message === 'Kid added succesfully!') {
            setChangeKids(!changeKids);
            return;
        }
        setErrorAdding('Error procesando el código');

    }

    useEffect(() => {
        if (status === 'authenticated') {
            fetchKids();
        }
    }, [status, changeKids]);

    if (status === 'loading') {
        return (
            <FatherMiddleware>
                <Loading></Loading>
            </FatherMiddleware>
        )
    }

    return (
        <FatherMiddleware>
            <div className='p-0 p-md-3'>
                <div className='container-fluid'>
                    <div className="card o-hidden border-0 p-3">
                        <div className="card-body p-0">
                            <form onSubmit={addKid}>
                                <div className="row align-items-center gap-2 gap-xl-0 justify-content-center">
                                    <div className="col-12 col-xl-3">
                                        <h1 className='mb-3'>Unidad familiar</h1>
                                    </div>
                                    <div className="d-none d-xl-block col-md-5">
                                    </div>
                                    <div className="col-12 col-xl-3">
                                        <span className="text-danger">{errorAdding}</span>
                                        <input type="text" className="col-12 col-md-9 form-control form-control-user" id="kidCode" placeholder="Código de hijo" value={kidCode} onChange={(e) => setKidCode(e.target.value)} required />
                                    </div>
                                    <div className="col-12 col-xl-1">
                                        <button type='submit' className="btn btn-primary col-12 col-md-3 w-100">Añadir hijo</button>
                                    </div>
                                </div>
                            </form>


                            <div className="row d-none d-xl-flex">
                                <div className='col-12 col-md-2'>
                                    <span className='fw-bold'>Nombre</span>
                                </div>
                                <div className='col-12 col-md-7'>
                                    <span className='fw-bold'>Código</span>
                                </div>
                                <div className='col-12 col-md-1'>
                                    <span className='fw-bold'>Edad</span>
                                </div>
                                <div className='col-12 col-md-1'>
                                    <span className='fw-bold'>Eliminar</span>
                                </div>
                            </div>
                            <hr></hr>
                            {
                                kids.map((kid) => (
                                    <div key={kid.id}>
                                        <div className="row my-2 d-none d-xl-flex">
                                            <div className='col-12 col-md-2'>
                                                {kid.name}
                                            </div>
                                            <div className='col-12 col-md-7'>
                                                {kid.uuid}
                                            </div>
                                            <div className='col-12 col-md-1'>
                                                {kid.age}
                                            </div>
                                            <div className='col-12 col-md-1 d-flex align-items-center justify-content-center'>
                                                <button type="button" className="btn btn-danger d-flex justify-content-center align-items-center p-2" data-bs-toggle="modal" data-bs-target={`#staticBackdrop-${kid.id}-1`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                                    </svg>
                                                </button>

                                                <div className="modal fade" id={`staticBackdrop-${kid.id}-1`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`staticBackdropLabel-${kid.id}-1`} aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id={`#staticBackdropLabel-${kid.id}-2`}>Eliminar a {kid.name} de la Unidad familiar</h5>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body" data-bs-dismiss="modal">
                                                                <span>A continuación vas a eliminar a {kid.name} de la unidad familiar. ¿Confimar?</span>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                                                <button type="button" onClick={() => deleteKid(kid.id)} className="btn btn-danger" data-bs-dismiss="modal">Confirmar</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex d-xl-none justify-content-between align-items-center">
                                            <div className="d-flex flex-column">
                                                <span className="fw-bold">Nombre: <span>{kid.name}</span></span>
                                                <span className="fw-bold">Código: <span>{kid.uuid}</span></span>
                                                <span className="fw-bold">Edad: <span>{kid.name}</span></span>
                                            </div>
                                            <div>
                                                <button type="button" className="btn btn-danger d-flex justify-content-center align-items-center p-2" data-bs-toggle="modal" data-bs-target={`#staticBackdrop-${kid.id}-2`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                                    </svg>
                                                </button>

                                                <div className="modal fade" id={`staticBackdrop-${kid.id}-2`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`staticBackdropLabel-${kid.id}-2`} aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id={`#staticBackdropLabel-${kid.id}-2`}>Eliminar a {kid.name} de la Unidad familiar</h5>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body" data-bs-dismiss="modal">
                                                                <span>A continuación vas a eliminar a {kid.name} de la unidad familiar. ¿Confimar?</span>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                                                <button type="button" onClick={() => deleteKid(kid.id)} className="btn btn-danger" data-bs-dismiss="modal">Confirmar</button>
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
            </div>
        </FatherMiddleware>

    );
}

