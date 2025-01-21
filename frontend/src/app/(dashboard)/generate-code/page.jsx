"use client"

import { useSession } from "next-auth/react";
import { AdminMonitorMiddleware } from "../../../../components/Middlewares";
import { useEffect, useState } from "react";
import Loading from "../../../../components/ui/Loading/loading";
import apiUrl from "../../../../utils/apiConfig";

export default function GenerateCodePage() {

    const [points, setPoints] = useState('');
    const [code, setCode] = useState('');
    const [formSubmit, setFormSubmit] = useState(false);
    const [copied, setCopied] = useState(false);
    const { data: session, status } = useSession();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setFormSubmit(true);
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
    }

    useEffect(() => {
        if (formSubmit) {
            fetch(`${apiUrl}/api/achievement/generate-code`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.user.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    points: points
                })
            }).then(res => {
                return res.json();
            }).then(newCode => {
                setCode(newCode.code.code);
                setFormSubmit(false);
            });
        }
    }, [formSubmit]);

    if (status === 'loading') {
        return (
            <AdminMonitorMiddleware>
                <Loading></Loading>
            </AdminMonitorMiddleware>
        )
    }

    return (
        <AdminMonitorMiddleware>
            <div className="d-flex justify-content-center align-items-center pb-5 h-100">
                <div className="d-flex flex-column justify-content-around align-items-center mt-4 gap-5">
                    <form onSubmit={handleFormSubmit} className="user border shadow-lg rounded p-5 pt-3">
                        <h1 className="text-center">Generar código</h1>
                        <div className="row gap-2">
                            <input type="number" className="col-md-3 form-control form-control-user" id="points"
                                placeholder="Puntos" value={points} onChange={(e) => setPoints(Number(e.target.value))} required />
                            <button className="btn btn-primary col-12">Generar código</button>
                        </div>
                    </form>

                    {code !== '' ? (
                        <div className="alert alert-success border border-success shadow-lg" role="alert">
                            <div className="d-flex flex-column gap-2 justify-content-center">
                                <span className="fs-3">{code}</span>
                                <button onClick={copyToClipboard} className="btn btn-success">{copied ? 'Copiado!' : 'Copiar al portapapeles'}</button>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </AdminMonitorMiddleware>
    );
}