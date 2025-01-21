import Link from 'next/link';

export default function ButtonSideBar({ children, icon, href }) {
    if (href === undefined) {
        href = '/';
    }
    if (icon === undefined) {
        icon = '';
    }

    return (
        <Link className="nav-link" href={href}>
            <div className="sb-nav-link-icon d-flex align-items-center">
                {icon}
            </div>
            <span>{ children }</span>
        </Link>
    );
}