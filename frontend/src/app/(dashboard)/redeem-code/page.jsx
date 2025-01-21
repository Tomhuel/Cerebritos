"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "../../../../components/ui/Loading/loading";
import apiUrl from "../../../../utils/apiConfig";
import { KidMiddleware } from "../../../../components/Middlewares";

export default function RedeemCodePage() {

    const [formSubmit, setFormSubmit] = useState(false);
    const [response, setResponse] = useState(['', false]);
    const { data: session, status, update } = useSession();
    const [code, setCode] = useState('');

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
            fetch(`${apiUrl}/api/achievement/redeem-code`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.user.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code: code
                })
            }).then(res => {
                return res.json();
            }).then(res => {
                if (res.message === 'Code redeemed succesfully') {
                    setResponse(['Código canjeado!', true, true]);
                    updateUser();
                }
                if (res.message === 'This code has been already redeemed') {
                    setResponse(['Este código ya ha sido canjeado!', false, true]);
                }
                if (res.message === 'Error redeeming your code') {
                    setResponse(['Hubo un error con tu código', false, true]);
                }
                setFormSubmit(false);
            });
        }
    }, [formSubmit]);

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

    if (status === 'loading') {
        return (
            <>
                <Loading></Loading>
            </>
        )
    }

    return (
        <KidMiddleware>
            <div className="d-flex justify-content-center align-items-center pb-5 h-100">
                <div className="d-flex flex-column justify-content-around align-items-center mt-4 gap-5">
                    <form onSubmit={handleFormSubmit} className="user border rounded shadow-lg p-5 pt-3">
                        <h1 className="text-center">Canjear Código</h1>
                        <div className="row gap-2">
                            <input type="text" className="col-md-3 form-control form-control-user" id="codes"
                                placeholder="Código" value={code} onChange={(e) => setCode(e.target.value)} required />
                            <button className="btn btn-primary col-12">Canjear</button>
                        </div>
                    </form>
                    {response[2] ? (
                        response[1] ? (
                            <div className="alert alert-success border shadow-lg border-success" role="alert">
                                <div className="d-flex flex-column gap-2 justify-content-center">
                                    <span className="fs-3">{response[0]}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="alert alert-danger border shadow-lg border-danger" role="alert">
                                <div className="d-flex flex-column gap-2 justify-content-center">
                                    <span className="fs-3">{response[0]}</span>
                                </div>
                            </div>
                        )) : (
                        ''
                    )}
                </div>
            </div>
        </KidMiddleware>
    );
}