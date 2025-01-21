"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function Custom404() {

    const router = useRouter();

    useEffect(() => {
        window.location.href = '/';
    }, []);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <h1 className="">Página no encontrada</h1>
            <h2 className="">Redirigiendo a la página principal...</h2>
        </div>
    )
}