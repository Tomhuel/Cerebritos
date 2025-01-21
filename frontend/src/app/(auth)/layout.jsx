'use client'
import React from "react";
import Link from 'next/link';

export default function AuthLayout({ children }) {

    return (
        <React.StrictMode>
            <div className="container">
                <div className="row">
                    <div className="d-flex my-1">
                        <Link href="/" className="text-secondary comeback-login d-flex justify-content-start gap-1 align-items-center expand">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                            <span>Volver</span>
                        </Link>
                    </div>
                </div>
                {children}
                <div className="row d-none">
                    <div className="col">
                        <div className="d-flex justify-content-center align-items-center">
                            <a href="/" className="btn btn-light fs-4 btn-outline-dark">Volver</a>
                        </div>
                    </div>
                </div>
            </div>
            <script src="vendor/jquery/jquery.min.js"></script>
            <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
            <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
            <script src="js/sb-admin-2.min.js"></script>
        </React.StrictMode>
    );
};