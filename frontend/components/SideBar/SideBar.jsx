"use client"
import { useSession } from "next-auth/react";
import { AdminDisplay, AdminMonitorDisplay, AuthenticatedDisplay, FatherDisplay, KidDisplay } from "../Middlewares/Displays";
import SideBarAccordion from "./AccordionSideBar";
import AccordionSideBarLink from "./AccordionSideBarLink";
import ButtonSideBar from "./ButtonSideBar";
import SectionTitle from "./SectionTitle";
import apiUrl from "../../utils/apiConfig";
import { useEffect } from "react";

export default function Sidebar() {

    const { data: session, update } = useSession();

    async function updateStatus() {
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

    useEffect(() => {
        const intervalId = setInterval(updateStatus, 5 * 60 * 1000); // 5 minutos en milisegundos

        // Limpiar el intervalo al desmontar el componente para evitar fugas de memoria
        return () => clearInterval(intervalId);
    }, [session]);

    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <KidDisplay>
                            <div className="nav-link d-md-none">
                                {session?.user.user.points} puntos
                            </div>
                        </KidDisplay>
                        <ButtonSideBar icon={(
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M6 22.8787C4.34315 22.8787 3 21.5355 3 19.8787V9.87866C3 9.84477 3.00169 9.81126 3.00498 9.77823H3C3 9.20227 3.2288 8.64989 3.63607 8.24262L9.87868 2.00002C11.0502 0.828445 12.9497 0.828445 14.1213 2.00002L20.3639 8.24264C20.7712 8.6499 21 9.20227 21 9.77823H20.995C20.9983 9.81126 21 9.84477 21 9.87866V19.8787C21 21.5355 19.6569 22.8787 18 22.8787H6ZM12.7071 3.41423L19 9.70713V19.8787C19 20.4309 18.5523 20.8787 18 20.8787H15V15.8787C15 14.2218 13.6569 12.8787 12 12.8787C10.3431 12.8787 9 14.2218 9 15.8787V20.8787H6C5.44772 20.8787 5 20.4309 5 19.8787V9.7072L11.2929 3.41423C11.6834 3.02371 12.3166 3.02371 12.7071 3.41423Z" fill="currentColor" /></svg>
                        )}>Inicio</ButtonSideBar>

                        {/* Family Section */}
                        <FatherDisplay>
                            <ButtonSideBar
                                href='/family'
                                icon={(
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                                    </svg>
                                )}
                            >Familia</ButtonSideBar>
                        </FatherDisplay>

                        {/* Admin Section */}
                        <AdminDisplay>
                            <SectionTitle>Administración</SectionTitle>
                            <SideBarAccordion
                                name='Administración'
                                icon={(
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tools" viewBox="0 0 16 16">
                                        <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" />
                                    </svg>
                                )}
                            >
                                <AccordionSideBarLink href='/admin/logs'>Registros</AccordionSideBarLink>
                                <AccordionSideBarLink href='/admin/set-roles'>Cambiar roles</AccordionSideBarLink>
                                <AccordionSideBarLink href='/admin/orders'>Pedidos</AccordionSideBarLink>
                            </SideBarAccordion>
                        </AdminDisplay>

                        {/* Achievements Section */}
                        <SectionTitle>Logros</SectionTitle>
                        <SideBarAccordion
                            name='Logros'
                            icon={(
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trophy" viewBox="0 0 16 16">
                                    <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z" />
                                </svg>
                            )}>
                            <AccordionSideBarLink href='/achievements'>Todos los Logros</AccordionSideBarLink>
                            <KidDisplay>
                                <AccordionSideBarLink href='/achievements/own'>Mis Logros</AccordionSideBarLink>
                            </KidDisplay>
                            <AdminDisplay>
                                <AccordionSideBarLink href='/achievements/new'>Nuevo Logro</AccordionSideBarLink>
                            </AdminDisplay>
                        </SideBarAccordion>

                        <SectionTitle>Productos</SectionTitle>
                        <SideBarAccordion
                            name='Productos'
                            icon={(
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box" viewBox="0 0 16 16">
                                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
                                </svg>
                            )}
                        >
                            <AccordionSideBarLink href='/products'>Todos los productos</AccordionSideBarLink>
                            <AdminDisplay>
                                <AccordionSideBarLink href='/products/new'>Nuevo Producto</AccordionSideBarLink>
                            </AdminDisplay>
                        </SideBarAccordion>

                        <SectionTitle>Perfiles</SectionTitle>
                        <SideBarAccordion
                            name='Perfiles'
                            icon={(
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                                </svg>
                            )}>
                            <AccordionSideBarLink href='/profiles'>Todos los perfiles</AccordionSideBarLink>
                            <KidDisplay>
                                <AccordionSideBarLink href={`/profiles/${session?.user.user.id}`}>Mi Perfil</AccordionSideBarLink>
                            </KidDisplay>
                        </SideBarAccordion>

                        {/*}
                        <SectionTitle>Clubs</SectionTitle>
                        <SideBarAccordion
                            name='Clubs'
                            icon={(
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trophy" viewBox="0 0 16 16">
                                    <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z" />
                                </svg>
                            )}>
                            <AccordionSideBarLink>Todos los clubs</AccordionSideBarLink>
                        </SideBarAccordion>
                            */}


                        <AuthenticatedDisplay>
                            <KidDisplay>
                                <SectionTitle>Códigos</SectionTitle>
                            </KidDisplay>
                            <AdminMonitorDisplay>
                                <ButtonSideBar
                                    href='/generate-code'
                                    icon={(
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-qr-code" viewBox="0 0 16 16">
                                            <path d="M2 2h2v2H2z" />
                                            <path d="M6 0v6H0V0zM5 1H1v4h4zM4 12H2v2h2z" />
                                            <path d="M6 10v6H0v-6zm-5 1v4h4v-4zm11-9h2v2h-2z" />
                                            <path d="M10 0v6h6V0zm5 1v4h-4V1zM8 1V0h1v2H8v2H7V1zm0 5V4h1v2zM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8zm0 0v1H2V8H1v1H0V7h3v1zm10 1h-1V7h1zm-1 0h-1v2h2v-1h-1zm-4 0h2v1h-1v1h-1zm2 3v-1h-1v1h-1v1H9v1h3v-2zm0 0h3v1h-2v1h-1zm-4-1v1h1v-2H7v1z" />
                                            <path d="M7 12h1v3h4v1H7zm9 2v2h-3v-1h2v-1z" />
                                        </svg>
                                    )}
                                >Generar código</ButtonSideBar>
                            </AdminMonitorDisplay>
                            <KidDisplay>
                                <ButtonSideBar
                                    href='/redeem-code'
                                    icon={(
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upc-scan" viewBox="0 0 16 16">
                                            <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0z" />
                                        </svg>
                                    )}
                                >Canjear código</ButtonSideBar>
                            </KidDisplay>
                        </AuthenticatedDisplay>
                    </div>
                </div>
                <div className="sb-sidenav-footer py-4">
                    <div className="small text-primary fs-6 mb-2">¿Quiénes Somos?</div>
                    <div className="small text-primary text-decoration-underline">Términos y Condiciones</div>
                </div>
            </nav>
        </div>
    );
};