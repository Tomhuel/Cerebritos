"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import Loading from "../../../../../components/ui/Loading/loading";
import apiUrl from "../../../../../utils/apiConfig";
import Link from 'next/link';
import { AdminDisplay, AdminMonitorDisplay } from "../../../../../components/Middlewares/Displays";

export default function AchievementPage(props) {

    const { data: session, status } = useSession();
    const [achievement, setAchievement] = useState({});
    const [fetched, setFetched] = useState(false);
    const [loading, setLoading] = useState(true);
    const [code, setCode] = useState('');
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
    }

    async function fetchAchievementCode() {
        const res = await fetch(`${apiUrl}/api/achievement/generate-code`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session?.user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                achievementId: props.params.id
            })
        });
        const newCode = await res.json();
        setCode(newCode.code.code);
        setFetched(!fetched);
    }

    async function fetchAchievement() {
        const res = await fetch(`${apiUrl}/api/achievement/${props.params.id}`);
        const achievement = await res.json();
        setAchievement(achievement.data);
        setFetched(true);
        setLoading(false);
    }

    useEffect(() => {
        if (status !== 'loading') {
            fetchAchievement();
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
                        <img src={achievement.image} className="img-fluid ratio-1 border border-dark rounded-circle" alt="Achievement Image"></img>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <AdminMonitorDisplay>
                            <button onClick={fetchAchievementCode} className="btn btn-primary">Generar código</button>
                        </AdminMonitorDisplay>
                    </div>
                </div>
                <div className="col-12 col-md-9">
                    <div className="row align-items-around justify-content-center">
                        <div className="row justify-content-between align-items-start">
                            <h1 className="fs-1 col-12 p-0 col-md-4 text-center text-md-start">{achievement.name}</h1>
                            <AdminDisplay>
                                <Link href={`/achievements/${achievement.id}/update`} className="btn btn-success d-none d-md-block col-12 col-md-4 col-xl-2">Actualizar Logro</Link>
                            </AdminDisplay>
                        </div>
                        <p className="fs-4">{achievement.description}</p>
                        <p className="fs-5">{`${achievement.points} puntos`}</p>
                    </div>
                </div>
            </div>
            <AdminMonitorDisplay>
                {code !== '' ? (
                    <div className="row mb-3">
                        <div className="alert alert-success pb-0 border border-dark" role="alert">
                            <p className='fs-5'>{code}</p>
                        </div>
                        <button onClick={copyToClipboard} className="btn btn-success">{copied ? 'Copiado!' : 'Copiar al portapapeles'}</button>
                    </div>
                ) : (
                    ''
                )}
            </AdminMonitorDisplay>
            <AdminMonitorDisplay>
                <div className="row">
                    <button className="btn btn-success d-md-none col-12 col-md-4 col-xl-2">Actualizar Logro</button>
                </div>
            </AdminMonitorDisplay>
        </div>
    </>
}