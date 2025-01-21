"use client"

import { useEffect, useState } from "react"
import Loading from "../../../../../../components/ui/Loading/loading";
import apiUrl from "../../../../../../utils/apiConfig";
import { AdminMiddleware } from "../../../../../../components/Middlewares";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UpdateAchievementPage(props) {

    const { data: session, status } = useSession();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [points, setPoints] = useState('');
    const [image, setImage] = useState(null);
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [error, setError] = useState('');

    async function getAchievement() {
        const res = await fetch(`${apiUrl}/api/achievement/${props.params.id}`);
        const achievementData = await res.json();
        const achievement = achievementData.data;
        setName(achievement.name);
        setImageUrl(achievement.image);
        setDescription(achievement.description);
        setPoints(achievement.points);
        setLoading(false);
        setFetched(true);
    }

    async function deleteAchievement() {
        const res = await fetch(`${apiUrl}/api/achievement/delete/${props.params.id}`, {
            headers: {
                'Authorization': `Bearer ${session?.user.token}`,
            },
            method: 'DELETE',
        });
        const response = await res.json();
        if (response.message === 'Achievement Deleted Succesfully') {
            window.location.href = '/achievements';
        }
        setError('Hubo un problema borrando el logro');
    }

    async function updateAchievement() {
        event.preventDefault();
        const formData = new FormData();
        if (image !== null) {
            formData.append('image', image);
        }
        formData.append('name', name);
        formData.append('description', description);
        formData.append('points', points);

        const res = await fetch(`${apiUrl}/api/achievement/update/${props.params.id}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session?.user.token}`
                },
                body: formData
            });
        const response = await res.json();
        if (response.message === 'Achievement updated succesfully') {
            router.push(`/achievements/${props.params.id}`);
        } else {
            setError('Hubo un error actualizando el logro');
        }
    }

    const handleImageUpdate = (event) => {
        setImage(event.target.files[0]);
    }

    useEffect(() => {
        getAchievement();
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
                <form onSubmit={updateAchievement}>
                    <div className="row justify-content-center mb-2">
                        <img src={imageUrl} className="border border-dark ratio-1 rounded-circle w-25 p-0" alt="Achievement Image"></img>
                    </div>
                    <div className="row">
                        <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                            <div className="col px-3 text-center">
                                <label htmlFor="formFile" className="form-label fw-bold">Imagen</label>
                                <input className="form-control" onChange={handleImageUpdate} type="file" id="formFile"></input>
                            </div>
                            <div className="col px-3 text-center">
                                <label htmlFor="achievementName" className="form-label fw-bold">Nombre del Logro</label>
                                <input type="text" onChange={(e) => { setName(e.target.value) }} className="form-control" id="achievementName" placeholder={name}></input>
                            </div>
                            <div className="col px-3 text-center">
                                <label htmlFor="achievementDescription" className="form-label fw-bold">Descripción del Logro</label>
                                <textarea type="text" className="form-control" onChange={(e) => { setDescription(e.target.value) }} id="achievementDescription" placeholder={description}></textarea>
                            </div>
                            <div className="col px-3 text-center">
                                <label htmlFor="achievementPoints" className="form-label fw-bold">Puntos del Logro</label>
                                <input type="number" className="form-control" onChange={(e) => { setPoints(Number(e.target.value)) }} id="achievementPoints" placeholder={points}></input>
                            </div>
                            <div className="col px-3 text-center">
                                <button type="submit" className="btn btn-success">Actualizar</button>
                            </div>
                            <div className="col px-3 text-center">
                                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Borrar Logro
                                </button>

                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Borrar Logro</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                ¿Estás seguro que quieres borrar el logro: "{name}"?
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                                <button type="button" onClick={deleteAchievement} data-bs-dismiss="modal" className="btn btn-danger">Borrar</button>
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