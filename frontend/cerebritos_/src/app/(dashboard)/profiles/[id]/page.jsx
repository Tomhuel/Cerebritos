"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import Loading from "../../../../../components/ui/Loading/loading";
import apiUrl from "../../../../../utils/apiConfig";
import Link from 'next/link';
import { AdminMonitorDisplay, OwnDisplay } from "../../../../../components/Middlewares/Displays";
import { Roles } from "../../../../../utils/roles";

export default function ProductPage(props) {

    const { data: session, status, update } = useSession();
    const [profile, setProfile] = useState({});
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true);
    const [achievements, setAchievements] = useState([]);
    const [error, setError] = useState('');
    const [reserveSuccess, setReserveSucces] = useState(false);

    async function fetchProfile() {
        const res = await fetch(`${apiUrl}/api/user/kids-profiles/${props.params.id}`);
        const profileData = await res.json();
        setProfile(profileData.data);
        setAchievements(profileData.data.achievements);
        setFetched(true);
        setLoading(false);
    }

    useEffect(() => {
        if (status !== 'loading') {
            fetchProfile();
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
                        <img src={profile.image !== null ? profile.image : '/svg/user.svg'} className="img-fluid ratio-1 border border-dark rounded-circle" alt="Profile Image"></img>
                    </div>
                </div>
                <div className="col-12 col-md-9">
                    <div className="row align-items-around justify-content-center">
                        <div className="row justify-content-between align-items-start">
                            <h1 className="fs-1 col-12 p-0 col-md-4 text-center text-md-start">{profile.username}</h1>
                            <OwnDisplay id={props.params.id}>
                                <Link href={`/settings`} className="btn btn-success d-none d-md-block col-12 col-md-4 col-xl-2">Actualizar Perfil</Link>
                            </OwnDisplay>
                        </div>
                        <p className="fs-4 text-md-start text-center">{`${achievements.length} logros`}</p>
                        <AdminMonitorDisplay>
                            <p className="fs-5 text-md-start text-center">{`Nombre: ${profile.name}`}</p>
                            <p className="fs-5 text-md-start text-center">{`Correo electrónico: ${profile.email}`}</p>
                            <p className="fs-5 text-md-start text-center">{`Edad: ${profile.age} años`}</p>
                            <p className="fs-5 text-md-start text-center">{`Código: ${profile.uuid}`}</p>
                        </AdminMonitorDisplay>
                        <OwnDisplay id={props.params.id}>
                            {session?.user.user.role_id === Roles.admin ? '' :
                                <p className="fs-5 text-md-start text-center">{`Código: ${profile.uuid}`}</p>
                            }
                        </OwnDisplay>
                    </div>
                </div>
            </div>
            <OwnDisplay id={props.params.id}>
                <div className="row">
                    <Link href={`/settings`} className="btn btn-success d-md-none col-12 col-md-4 col-xl-2">Actualizar Perfil</Link>
                </div>
            </OwnDisplay>
            {
                achievements.length > 0 ? (
                    <>
                        <h2 className="mt-2 mt-md-0">Logros obtenidos</h2>
                        <div className="d-none d-md-flex gap-2">
                            {achievements.map((achievement) => (
                                <Link href={`/achievements/${achievement.id}`} key={achievement.id} className="d-block">
                                    <img src={achievement.image} className="ratio-1 complement-md-image rounded rounded-circle border border-dark" title={achievement.name}></img>
                                </Link>
                            ))}
                        </div>
                        <div className="row d-md-none gap-2">
                            {achievements.slice(0, 10).map((achievement) => (
                                <Link href={`/achievements/${achievement.id}`} key={achievement.id} className="col-12">
                                    <img src={achievement.image} className="ratio-1 rounded rounded-circle border border-dark w-100" title={achievement.name}></img>
                                </Link>
                            ))}
                        </div>
                    </>
                ) : ''
            }
        </div >
    </>
}