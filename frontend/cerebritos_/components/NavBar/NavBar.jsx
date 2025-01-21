"use client"
import UserIcon from "./UserIcon";
import NavBarLogo from './NavBarLogo';
import { KidDisplay } from "../Middlewares/Displays";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import apiUrl from "../../utils/apiConfig";

const NavBar = ({ onSidebarToggle }) => {
    const { data: session, update } = useSession();
    const [points, setPoints] = useState(session?.user.user.points);

    useEffect(() => {
        setPoints(session?.user.user.points);
    }, [session]);

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-light bg-light bg-raro">
            <NavBarLogo />
            <div className="d-block w-100 d-md-none"></div>
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" onClick={onSidebarToggle}>
                <svg className="svg-inline--fa fa-bars" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
                    <path fill="currentColor" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"></path>
                </svg>
            </button>
            {/* Navbar Search */}
            <div className="d-none d-md-inline-block ms-auto me-0 me-md-3 my-2 my-md-0" />
            <div className="d-flex gap-2 justify-content-center align-items-center">
                <KidDisplay>
                    <span className="d-none d-md-block">{points} puntos</span>
                </KidDisplay>
                {/* Navbar */}
                <UserIcon />
            </div>
        </nav>
    );
};

export default NavBar