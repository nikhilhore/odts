import { NavLink } from 'react-router-dom';

const header = {
    sticky: { position: 'sticky', top: '0', zIndex: '10' },
    brand: { fontWeight: "600", fontSize: "25px" }
}

function HomeHeader() {
    return <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={header.sticky}>
            <div className="container-fluid">
                <a href="/"><img src="favicon.ico" alt="ODTS-logo" width={25} height={25} /></a>
                <div className="navbar-brand" style={header.brand}>Office Document Tracking System</div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Signup</div>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <NavLink className="dropdown-item" to="/customer-signup">Customer</NavLink>
                                <NavLink className="dropdown-item" to="/officer-signup">Officer</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink className="dropdown-item" to="/admin-signup">Administrator</NavLink>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
}

export default HomeHeader;