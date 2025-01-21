"use client"
import { useSearchParams } from "next/navigation";
import { AdminMiddleware } from "../../../../../components/Middlewares";
import Loading from "../../../../../components/ui/Loading/loading";
import apiUrl from "../../../../../utils/apiConfig";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PaginationClient from "../../../../../components/ui/Pagination/Pagination.client";

export default function SetRolesPage() {
    const { data: session, status } = useSession();
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [fetched, setFetched] = useState(false);
    const [rolesFetched, setRolesFetched] = useState(false);
    const [page, setPage] = useState(useSearchParams().get('page') ?? 1);

    async function getUsers() {
        const res = await fetch(`${apiUrl}/api/user/all?page=${page}`);
        const usersData = await res.json();
        setUsers(usersData.data);
        setFilteredUsers(usersData.data);
        setFetched(true);
    }

    async function changeRole(event, user) {
        const newRoleId = event.target.value;
        user.role_id = newRoleId;
        const res = await fetch(`${apiUrl}/api/user/role/set`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.user.token}`
            },
            body: JSON.stringify({
                role_id: newRoleId,
                user_id: user.id
            })
        });
        const response = await res.json();

        if (response.message !== 'Role succesfully changed') {
            window.location.reload();
        }

        setFilteredUsers([...filteredUsers]);
    }

    async function getRoles() {
        const res = await fetch(`${apiUrl}/api/roles`, {
            headers: {
                'Authorization': `Bearer ${session.user.token}`
            }
        });
        const rolesData = await res.json();
        setRoles(rolesData.data);
        setRolesFetched(true);
    }

    async function filterUsers(event) {
        setEmail(event.target.value);
        setFilteredUsers(users.filter(user => user.email.includes(event.target.value)));
    }

    const setPagination = (page) => {
        setPage(page);
        setFetched(false);
    }

    useEffect(() => {
        if (status === 'authenticated' && !rolesFetched) {
            getRoles();
        }
        if (status === 'authenticated' && !fetched) {
            getUsers();
        }
    }, [status, filterUsers, page]);

    if (status === 'loading') {
        return (
            <AdminMiddleware>
                <Loading></Loading>
            </AdminMiddleware>
        )
    }

    return (
        <AdminMiddleware>
            <div className='p-3'>
                <div className='container-fluid'>
                    <div className="card o-hidden border-0 p-3">
                        <div className="card-body p-0">
                            <div className="row align-items-center gap-2 gap-xl-0 justify-content-center">
                                <div className="col-12 col-xl-4">
                                    <h1 className='mb-3'>Usuarios</h1>
                                </div>
                                <div className="d-none d-xl-block col-md-5">
                                </div>
                                <div className="col-12 col-xl-3">
                                    <input type="text" className="col-12 col-md-9 form-control form-control-user" id="kidCode" placeholder="Email de usuario" value={email} onChange={(e) => filterUsers(e)} required />
                                </div>
                            </div>


                            <div className="row d-none d-xl-flex">
                                <div className='col-12 col-md-3'>
                                    <span className='fw-bold'>Nombre</span>
                                </div>
                                <div className='col-12 col-md-7'>
                                    <span className='fw-bold'>Email</span>
                                </div>
                                <div className='col-12 col-md-2'>
                                    <span className='fw-bold'>Rol</span>
                                </div>
                            </div>
                            <hr></hr>
                            {
                                filteredUsers.map((user) => {
                                    return user.id === session?.user.user.id ? (
                                        ''
                                    ) : (
                                        <div key={user.id}>
                                            <div className="row my-2 d-none d-xl-flex">
                                                <div className='col-12 col-md-3'>
                                                    {user.username ? `${user.name} (${user.username})` : `${user.name}`}
                                                </div>
                                                <div className='col-12 col-md-7'>
                                                    <a href={`mailto:${user.email}`} target="_blank">{user.email}</a>
                                                </div>
                                                <div className='col-12 col-md-2'>
                                                    <select className="form-select" onChange={(e) => changeRole(e, user)} aria-label="A" value={user.role_id}>
                                                        {roles.map((role) => (
                                                            <option key={`${user.id}-${role.id}`} value={role.id}>{role.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="d-flex d-xl-none justify-content-between align-items-center">
                                                <div className="d-flex flex-column gap-2">
                                                    <span className="fw-bold">Nombre: <span>{user.name}</span></span>
                                                    <span className="fw-bold">Email: <span>{user.email}</span></span>
                                                    <span className="fw-bold">Rol</span>
                                                    <div className='col-12 col-md-2'>
                                                        <select className="form-select" onChange={(e) => changeRole(e, user)} aria-label="A" value={user.role_id}>
                                                            {roles.map((role) => (
                                                                <option key={`${user.id}-${role.id}`} value={role.id}>{role.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr></hr>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='row'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <PaginationClient setPage={setPagination} page={page} className='my-2' />
                        </div>
                    </div>
                </div>
            </div>
        </AdminMiddleware >

    );
}

