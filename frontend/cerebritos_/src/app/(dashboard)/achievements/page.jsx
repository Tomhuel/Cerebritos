import apiUrl from '../../../../utils/apiConfig';
import Pagination from '../../../../components/ui/Pagination/Pagination';
import AchievementCard from '../../../../components/ui/Cards/Achievements/AchievementCard';

async function fetchAchievements(page) {
    const res = await fetch(`${apiUrl}/api/achievement/all?page=${page}`, { cache: 'no-cache' });
    const achievementsData = await res.json();
    return achievementsData.data;
}

export default async function AchievementsPage({ searchParams }) {
    const page = searchParams.page ?? 1;
    const achievements = await fetchAchievements(page);

    if (achievements.length === 0) {
        return (
            <div className='m-5'>
                <div className='mb-3'>
                    <h1>No hay datos</h1>
                </div>
                <div className='row'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <Pagination page={page} className='my-2' />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className='m-5'>
                <div className='mb-3'>
                    <h1>Logros</h1>
                </div>
                <div className='row gap-2 gap-md-0'>
                    {
                        achievements.map((achievement) => (
                            <div className='col-12 col-md-6 col-lg-4 col-xl-3'>
                                <ul className='p-0'>
                                    <AchievementCard achievement={achievement} className={''}></AchievementCard>
                                </ul>
                            </div>
                        ))
                    }
                </div>
                <div className='row'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <Pagination page={page} className='my-2' />
                    </div>
                </div>
            </div>
        </>
    );
}

