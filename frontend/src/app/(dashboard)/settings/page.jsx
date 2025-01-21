"use client"

import { useEffect, useState } from "react"
import Loading from "../../../../components/ui/Loading/loading";
import apiUrl from "../../../../utils/apiConfig";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {

    const { data: session, status } = useSession();
    const [username, setUsername] = useState('');
    const [age, setAge] = useState(1);
    const [imageUrl, setImageUrl] = useState('');
    const [image, setImage] = useState(null);
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [error, setError] = useState('');

    async function getProfile() {
        const res = await fetch(`${apiUrl}/api/user/me`, {
            headers: {
                'Authorization': `Bearer ${session.user.token}`
            }
        });
        const profileData = await res.json();
        const profile = profileData.data;

        setUsername(profile.username);
        setImageUrl(profile.image);
        setAge(profile.age);
        setLoading(false);
        setFetched(true);
    }

    async function updateProfile() {
        event.preventDefault();

        const formData = new FormData();
        if (image !== null) {
            formData.append('image', image);
        }
        formData.append('username', username);
        formData.append('age', age);

        const res = await fetch(`${apiUrl}/api/user/update`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session?.user.token}`
                },
                body: formData
            });
        const response = await res.json();
        if (response.message === 'User updated succesfully') {
            router.push(`/profiles/${session.user.user.id}`);
        } else {
            setError('Hubo un error actualizando el perfil.');
        }
    }

    const handleImageUpdate = (event) => {
        setImage(event.target.files[0]);
    }

    useEffect(() => {
        if (status === 'authenticated') {
            getProfile();
        }
    }, [fetched, status])

    if (loading) {
        return (
            <Loading></Loading>
        )
    }

    return (
        <div className="m-md-5 m-0">
            <div className="card shadow-lg py-5">
                <form className="container-fluid" onSubmit={updateProfile}>
                    <div className="row justify-content-center mb-2">
                        <img src={imageUrl !== null ? imageUrl : '/svg/user.svg'} className="border border-dark ratio-1 rounded-circle w-25 p-0" alt="Achievement Image"></img>
                    </div>
                    <div className="row">
                        <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                            <div className="col px-3 text-center">
                                <h1>Actualizar perfil</h1>
                            </div>
                            <div className="col px-3 text-center">
                                <label htmlFor="username" className="form-label fw-bold">Nombre de usuario (público)</label>
                                <input type="text" onChange={(e) => { setUsername(e.target.value) }} className="form-control" id="username" placeholder={username === null ? 'No hay nombre puesto' : username}></input>
                            </div>
                            <div className="col px-3 text-center">
                                <label htmlFor="age" className="form-label fw-bold">Edad</label>
                                <input type="number" onChange={(e) => { setAge(e.target.value) }} className="form-control" id="age" placeholder={age}></input>
                            </div>
                            <div className="col px-3 text-center">
                                <label htmlFor="formFile" className="form-label fw-bold">Imagen</label>
                                <input className="form-control" onChange={handleImageUpdate} type="file" id="formFile"></input>
                            </div>
                            <div className="col px-3 text-center">
                                <button type="submit" className="btn btn-success">Actualizar</button>
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
    )
}