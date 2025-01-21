import Link from 'next/link'

export default function ProfileCard({ profile, className }) {

    const { id, name, username, achievements, image } = profile;

    return (
        <Link href={`/profiles/${id}`} className={`card h-100 text-decoration-none text-dark ${className}`}>
            <img src={image !== null ? image : '/svg/user.svg'} className="card-img-top ratio-1 image-card" alt="..."></img>
            <div className="card-body border-top">
                <div className='d-flex justify-content-between align-items-start'>
                    <h5 className="card-title fs-3 text-dark text-truncate">{username ? username : name}</h5>
                    <p className='card-text text-truncate'>{achievements} Logros</p>
                </div>
            </div>
        </Link>
    );
}