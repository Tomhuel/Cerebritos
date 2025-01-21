"use client"

import { useEffect, useState } from "react"
import apiUrl from "../../../../../utils/apiConfig";
import { AdminMiddleware } from "../../../../../components/Middlewares";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function NewAchievementPage() {

    const { data: session, status } = useSession();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [points, setPoints] = useState('');
    const [image, setImage] = useState(null);
    const router = useRouter();
    const [error, setError] = useState('');

    async function createAchievement() {
        event.preventDefault();
        const formData = new FormData();
        if (image !== null) {
            formData.append('image', image);
        }
        formData.append('name', name);
        formData.append('description', description);
        formData.append('points', points);

        const res = await fetch(`${apiUrl}/api/achievement/new`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session?.user.token}`
                },
                body: formData
            });
        const response = await res.json();
        if (response.message === 'Achievement created succesfully') {
            router.push(`/achievements`);
        } else {
            setError('Hubo un error creando el logro');
        }
    }

    const handleImageUpdate = (event) => {
        setImage(event.target.files[0]);
    }

    return <AdminMiddleware>
        <div className="m-md-5 m-0">
            <div className="card shadow-lg py-5">
                <form onSubmit={createAchievement}>
                    <div className="row">
                        <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                            <div className="col px-3 text-center">
                                <h1>Crear Logro</h1>
                            </div>
                            <div className="col px-3 text-center">
                                <label htmlFor="achievementName" className="form-label fw-bold">Nombre del Logro</label>
                                <input type="text" onChange={(e) => { setName(e.target.value) }} className="form-control" id="achievementName" placeholder={name} required></input>
                            </div>
                            <div className="col px-3 text-center">
                                <label htmlFor="achievementDescription" className="form-label fw-bold">Descripción del Logro</label>
                                <textarea type="text" className="form-control" onChange={(e) => { setDescription(e.target.value) }} id="achievementDescription" placeholder={description} required></textarea>
                            </div>
                            <div className="col px-3 text-center">
                                <label htmlFor="achievementPoints" className="form-label fw-bold">Puntos del Logro</label>
                                <input type="number" className="form-control" onChange={(e) => { setPoints(Number(e.target.value)) }} id="achievementPoints" placeholder={points} required></input>
                            </div>
                            <div className="col px-3 text-center">
                                <label htmlFor="formFile" className="form-label fw-bold">Imagen</label>
                                <input className="form-control" onChange={handleImageUpdate} type="file" id="formFile" required></input>
                            </div>
                            <div className="col px-3 text-center">
                                <button type="submit" className="btn btn-success">Crear Nuevo Logro</button>
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