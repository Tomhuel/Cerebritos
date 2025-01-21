"use client"
import Link from 'next/link'
import { signIn, useSession } from "next-auth/react"
import apiUrl from "../../../utils/apiConfig";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UnauthenticatedDisplay from "../../../components/Middlewares/Displays/Unauthenticated";
import { AuthenticatedDisplay } from "../../../components/Middlewares/Displays";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [role, setRole] = useState({});
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  useEffect(() => {
    if (status !== 'loading') {
      if (status === 'authenticated') {
        router.replace("/");
        fetch(`${apiUrl}/api/user/role`, {
          headers: {
            "Authorization": `Bearer ${session?.user.token}`
          }
        })
          .then((roleFetch) => roleFetch.json())
          .then((role) => setRole(role))
          .catch((error) => { console.error("Error fetching role:", error) });
      } else {
        if (token !== null) {
          (async () => {
            const loginResponse = await signIn('jwt', { token });
            if (loginResponse.error) {
              router.push('/signin');
            }
          })();
        }
      }
    }
  }, [status]); // Se ejecutará solo cuando el estado 'status' cambie

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="m-5">
        <UnauthenticatedDisplay>
          <div className='row mb-3'>
            <h1>Bienvenido Cerebrito!</h1>
          </div>

          <div className='row mb-3'>
            <Link href={'/signin'} className='text-decoration-none'>
              <div className="alert alert-primary pb-0 border border-primary" role="alert">
                <h4>¡Estamos viendo que no tienes ninguna sesión iniciada!</h4>
                <p className='fs-5'>¿Qué te parece si nos creamos una cuenta?</p>
              </div>
            </Link>
          </div>
        </UnauthenticatedDisplay>
        <AuthenticatedDisplay>
          <div className='row mb-3'>
            <h1>Bienvenido {session?.user.user.username ? session?.user.user.username : session?.user.user.name}!</h1>
          </div>

          <div className='row mb-3'>
            <div className="alert alert-light pb-0 border border-dark" role="alert">
              <h4>Noticias</h4>
              <p className='fs-5'>No hay nada nuevo...</p>
            </div>
          </div>
        </AuthenticatedDisplay>
        <div className='row mb-3'>
          <h2 className='text-center'>Actividades</h2>
        </div>
        <div className='row justify-content-around'>
          <div className='col-lg-4 col-12'>
            <div className="alert alert-success border border-success d-flex flex-column justify-content-between" role="alert">
              <div>
                <h3>Perfiles</h3>
                <p className='fs-5'>¡Todos los usuarios de <span className='fw-bold'>Cerebritos</span> tienen un perfil público, donde otros usuarios podrán ver todos los logros que han conseguido!</p>
              </div>
              <div>
                <Link href={'/profiles'} className='btn btn-success expand'>Ver Perfiles</Link>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-12'>
            <div className="alert alert-warning border border-warning d-flex flex-column justify-content-between" role="alert">
              <div>
                <h3>Logros</h3>
                <p className='fs-5'>¡A los <span className='fw-bold'>Cerebritos</span> nos gustan los retos! ¡Y por ello tenemos una sección solamente dedicada a todos los retos y logros que tenemos aquí!</p>
              </div>
              <div>
                <Link href={'/achievements'} className='btn btn-warning expand'>Ver Logros</Link>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-12'>
            <div className="alert alert-danger border border-danger d-flex flex-column justify-content-between" role="alert">
              <div>
                <h3>Productos</h3>
                <p className='fs-5'>¡Que en <span className='fw-bold'>Cerebritos</span> no solo completamos logros y retos por nuestras ganas de aprender! ¡Con los logros puedes ganar puntos con los que cons</p>
              </div>
              <div>
                <Link href={'/products'} className='btn btn-danger expand'>Ver Productos</Link>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <AuthenticatedDisplay>
            <Link href={'/redeem-code'} className='text-decoration-none'>
              <div className="alert alert-info p-3 d-flex flex-column justify-content-center align-items-center border border-info" role="alert">
                <h4>¿Quieres canjear códigos?</h4>
                <h4>Canjear códigos</h4>
              </div>
            </Link>
          </AuthenticatedDisplay>
          <UnauthenticatedDisplay>
            <Link href={'/redeem-code'} className='text-decoration-none'>
              <div className="alert alert-info p-3 d-flex flex-column justify-content-center align-items-center border border-info" role="alert">
                <h4>¿Quieres canjear códigos?</h4>
                <h4>Iniciar sesión</h4>
              </div>
            </Link>
          </UnauthenticatedDisplay>
        </div>
      </div>
    </>
  );
}
