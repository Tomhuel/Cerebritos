import Link from 'next/link'

const AchievementCard = ({ achievement, className }) => {

    const {id, name, description, image, points} = achievement;

    const maxDescriptionLength = 35;

    const trimmedDescription = description.length > maxDescriptionLength
        ? `${description.substring(0, maxDescriptionLength)}...`
        : description;

    return (
        <Link href={`/achievements/${id}`} className={`card h-100 text-decoration-none text-dark ${className}`}>
            <img src={`${image}`} className="card-img-top ratio-1 image-card" alt="..."></img>
            <div className="card-body border-top">
                <div className='d-flex justify-content-between align-items-start'>
                    <h5 className="card-title fs-3 text-dark text-truncate">{name}</h5>
                    <p className='card-text text-truncate'>{points} puntos</p>
                </div>
                <p className='card-text'>{trimmedDescription}</p>
            </div>
        </Link>
    );
};

export default AchievementCard;
