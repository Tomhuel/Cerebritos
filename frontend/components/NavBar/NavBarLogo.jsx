import Link from 'next/link';

export default function NavBarLogo() {
    return (
        <Link className="d-flex align-items-center justify-content-start gap-1 navbar-brand ps-3 fs-5 expand" href="/">
            <img src="/svg/black_no_letters.svg" width="30px" />
            <span className="minecraft-font ps-1">Cerebritos</span>
        </Link>
    );
}