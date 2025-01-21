'use client'
import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import '../../styles.css';
import apiUrl from '../../../../utils/apiConfig';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function SignIn() {

    const [name, setName] = useState('');
    const [lastname, setLastame] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rol, setRole] = useState(false);
    const [age, setAge] = useState('');
    const [error, setError] = useState([]);
    const [formSubmit, setFormSubmit] = useState(false);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            if (formSubmit) {
                const role = rol ? 3 : 4;

                if (error.length === 0) {
                    const res = await fetch(`${apiUrl}/api/auth/register`,
                        {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json"
                            },
                            body: JSON.stringify({
                                name: `${name} ${lastname}`,
                                email,
                                password,
                                age,
                                role_id: role
                            })
                        });

                    if (res.status === 409) {
                        setError(prevErrors => [...prevErrors, 'El usuario ya existe']);
                        return;
                    } else if (!res.ok) {
                        setError(prevErrors => [...prevErrors, 'Hubo un error en el registro. Por favor, inténtalo de nuevo más tarde.']);
                        return;
                    }

                    const tokenRes = await res.json();
                    const token = tokenRes.token;
                    const loginResponse = await signIn('jwt', { token, redirect: false });
                    if (loginResponse.error) {
                        return;
                    }
                    router.push("/");
                }
            }

        })();
    }, [error, formSubmit]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError([]);

        const patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        setEmail(email.trim());
        if (!(patron.test(email))) {
            setError(prevErrors => [...prevErrors, 'Correo no válido']);
        }
        if (age < 0 || age > 100) {
            setError(prevErrors => [...prevErrors, 'Edad no válida']);
        }

        if (password !== confirmPassword) {
            setError(prevErrors => [...prevErrors, 'Contraseñas no coincidentes']);
        }

        setFormSubmit(true);
    }


    return (
        <React.StrictMode>
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className='col-lg-5 d-none d-lg-block mh-100 bg-signin-image'></div>
                        <div className="col-lg-7">
                            <div className="p-5 pb-4">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Crear Cuenta</h1>
                                </div>
                                <form className="user" onSubmit={handleSubmit}>
                                    <div className="form-group row mb-3">
                                        <div className="col-sm-6 mb-sm-0  mb-3">
                                            <input type="text" className="form-control form-control-user" value={name} id="name"
                                                placeholder="Nombre" onChange={(e) => setName(e.target.value)} required />
                                            <span className='text-danger' id='nameError'></span>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="text" className="form-control form-control-user" value={lastname} id="lastname"
                                                placeholder="Apellidos" onChange={(e) => setLastame(e.target.value)} required />
                                            <span className='text-danger' id='lastnameError'></span>
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="email" className="form-control form-control-user" id="email"
                                            placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                        <span className='text-danger' id='emailError'></span>
                                    </div>
                                    <div className="form-group row mb-3">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="password" className="form-control form-control-user"
                                                id="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                            <span className='text-danger' id='passwordError'></span>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="password" className="form-control form-control-user"
                                                id="repeatPassword" placeholder="Repetir Contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                            <span className='text-danger' id='confirmPasswordError'></span>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-3">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="number" className="form-control form-control-user"
                                                id="age" placeholder="Edad" value={age} onChange={(e) => setAge(e.target.value)} />
                                            <span className='text-danger' id='ageError'></span>
                                        </div>
                                        <div className="col-sm-6 d-flex align-items-center justify-content-center">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input p-2" type="checkbox" role="switch" id="role" onChange={(e) => setRole(!rol)} />
                                                <label className="form-check-label" value={rol} htmlFor="role">Soy Padre/Madre</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-3 d-flex justify-content-around gap-2">
                                        <button href="/signin" className="btn btn-primary btn-user col-sm-12 col-md-5 d-flex align-items-center justify-content-center" type='submit'>
                                            Crear Cuenta
                                        </button>
                                        <a className="btn btn-google btn-user btn-block col-sm-12 col-md-5 btn-outline-dark" href={`${apiUrl}/api/google-auth/redirect`}>
                                            <div className="d-flex justify-content-center align-items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 120 120">
                                                    <path d="M107.145,55H100H87.569H60v18h27.569c-1.852,5.677-5.408,10.585-10.063,14.118 C72.642,90.809,66.578,93,60,93c-12.574,0-23.278-8.002-27.299-19.191C31.6,70.745,31,67.443,31,64 c0-3.839,0.746-7.505,2.101-10.858C37.399,42.505,47.823,35,60,35c7.365,0,14.083,2.75,19.198,7.273l13.699-13.21 C84.305,20.969,72.736,16,60,16c-18.422,0-34.419,10.377-42.466,25.605C14,48.291,12,55.912,12,64c0,7.882,1.9,15.32,5.267,21.882 C25.223,101.389,41.372,112,60,112c12.382,0,23.668-4.688,32.182-12.386C101.896,90.831,108,78.128,108,64 C108,60.922,107.699,57.917,107.145,55z" opacity=".35"></path><path fill="#44bf00" d="M17.267,81.882C25.223,97.389,41.372,108,60,108c12.382,0,23.668-4.688,32.182-12.386L77.506,83.118 C72.642,86.809,66.577,89,60,89c-12.574,0-23.278-8.002-27.299-19.191L17.267,81.882z"></path><path d="M77.506,83.118c-0.684,0.553-1.685,1.158-2.398,1.638l14.711,12.846 c0.807-0.641,1.6-1.298,2.363-1.988L77.506,83.118z" opacity=".35"></path><path fill="#0075ff" d="M92.182,95.614C101.896,86.83,108,74.128,108,60c0-3.078-0.301-6.083-0.855-9H100H87.569H60v18 h27.569c-1.852,5.677-5.408,10.585-10.063,14.118L92.182,95.614z"></path><path d="M32.701,69.809L17.267,81.882c0.486,0.948,1.004,1.877,1.551,2.787l15.3-11.576 C33.63,72.181,33.05,70.804,32.701,69.809z" opacity=".35"></path><path fill="#ffc400" d="M17.267,81.882C13.9,75.32,12,67.882,12,60c0-8.088,2-15.709,5.534-22.395l15.568,11.537 C31.746,52.496,31,56.161,31,60c0,3.443,0.6,6.745,1.701,9.809L17.267,81.882z"></path><path d="M17.534,37.605c-0.482,0.844-1.169,2.36-1.564,3.251l16.059,11.491 c0.299-1.095,0.653-2.167,1.072-3.205L17.534,37.605z" opacity=".35"></path><path fill="#ff1200" d="M33.101,49.142C37.399,38.505,47.823,31,60,31c7.365,0,14.083,2.75,19.198,7.273l13.699-13.21 C84.305,16.969,72.736,12,60,12c-18.422,0-34.419,10.377-42.466,25.605L33.101,49.142z"></path>
                                                </svg>
                                                <span>Registrarse con Google</span>
                                            </div>
                                        </a>
                                    </div>
                                </form>
                                {error.length !== 0 ? (
                                    <div className="alert alert-danger d-flex" role="alert">
                                        <ul className='m-0'>
                                            {error.map((message, index) => (
                                                <li key={index}>{message}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : ""}
                                <hr></hr>
                                <div className="text-center">
                                    <Link className="small" href="/login">¿Ya tienes una cuenta? Iniciar sesión</Link>
                                </div>
                                <div className="text-center">
                                    <span className='text-danger' id='generalError'></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.StrictMode>
    )
}


