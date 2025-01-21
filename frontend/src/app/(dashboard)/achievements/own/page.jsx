"use client"
import apiUrl from '../../../../../utils/apiConfig';
import AchievementCard from '../../../../../components/ui/Cards/Achievements/AchievementCard';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AuthenticatedMiddleware } from '../../../../../components/Middlewares';
import Loading from '../../../../../components/ui/Loading/loading';
import PaginationClient from '../../../../../components/ui/Pagination/Pagination.client';

export default function AchievementsPage() {
    const { data: session, status } = useSession();
    const [page, setPage] = useState(useSearchParams().get('page') ?? 1);
    const [achievements, setAchievements] = useState([]);

    async function fetchAchievements() {
        const res = await fetch(`${apiUrl}/api/achievement/own?page=${page}`, {
            headers: {
                'Authorization': `Bearer ${session?.user.token}`
            }
        });
        const achievementsData = await res.json();
        setAchievements(achievementsData.data);
    }

    useEffect(() => {
        if (status === 'authenticated') {
            fetchAchievements();
        }
    }, [status]);

    if (status === 'loading') {
        return (
            <AuthenticatedMiddleware>
                <Loading></Loading>
            </AuthenticatedMiddleware>
        );
    }

    if (achievements.length === 0) {
        return (
            <>
                <h1>No hay datos</h1>
                <div className='d-flex justify-content-center align-items-center'>
                    <PaginationClient setPage={setPage} page={page} className='my-2' />
                </div>
            </>
        )
    }

    return (
        <>
            <div className='m-5'>
                <div className='mb-3'>
                    <h1>Logros Personales</h1>
                </div>
                <div className='row gap-2 gap-md-0'>
                    {
                        achievements.map((achievement) => (
                            <div className='col-12 col-md-6 col-lg-4 col-xl-3' key={achievement.id}>
                                <ul className='p-0'>
                                    <AchievementCard achievement={achievement} className={''}></AchievementCard>
                                </ul>
                            </div>
                        ))
                    }
                </div>
                <div className='row'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <PaginationClient page={page} className='my-2' />
                    </div>
                </div>
            </div>
        </>
    );
}

