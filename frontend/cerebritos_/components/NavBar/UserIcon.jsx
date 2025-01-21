"use client"

import Link from 'next/link';
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import apiUrl from '../../utils/apiConfig';
import { AuthenticatedDisplay, UnauthenticatedDisplay } from '../Middlewares/Displays';

export default function UserIcon() {

    const { data: session, status } = useSession();

    const closeSession = async () => {
        const res = await fetch(`${apiUrl}/api/auth/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session.user.token}`
            }
        });

        signOut();
    }

    return (
        <>
            <AuthenticatedDisplay>
                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg className="svg-inline--fa fa-user fa-fw" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                                <path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path>
                            </svg>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href={`/profiles/${session?.user.user.id}`}>Tu Perfil</a></li>
                            <li><a className="dropdown-item" href="/settings">Ajustes</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" onClick={closeSession}>Cerrar sesión</button></li>
                        </ul>
                    </li>
                </ul>
            </AuthenticatedDisplay>
            <UnauthenticatedDisplay>
                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg className="svg-inline--fa fa-user fa-fw" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                                <path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path>
                            </svg>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><Link className="dropdown-item" href="/login">Iniciar Sesión</Link></li>
                            <li><a className="dropdown-item" href="/signin">Registrarse</a></li>
                        </ul>
                    </li>
                </ul>
            </UnauthenticatedDisplay>
        </>
    );
}