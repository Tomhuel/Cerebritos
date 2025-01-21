export default function SideBarAccordion({ children, name, icon }) {
    if (icon === undefined) {
        icon = '';
    }
    return (
        <>
            <a className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target={`#${name}`} aria-expanded="false" aria-controls="pagesCollapseAuth">
                <div className="sb-nav-link-icon align-items-center d-flex">
                    {icon}
                </div>
                <span>{name}</span>
                <div className="sb-sidenav-collapse-arrow">
                    <svg className="svg-inline--fa fa-angle-down" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M169.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 274.7 54.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path></svg>
                </div>
            </a>
            <div className="collapse" id={`${name}`} aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                <nav className="sb-sidenav-menu-nested nav">
                    {children}
                </nav>
            </div>
        </>
    );
}