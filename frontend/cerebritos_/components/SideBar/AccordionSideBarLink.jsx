import Link from 'next/link';

export default function AccordionSideBarLink({ children, href }) {
    if (href === undefined) {
        href = '/';
    }

    return (
        <Link className="nav-link" href={href}>{children}</Link>
    );
}