import { NavLink } from 'react-router-dom';

const header = {
    sticky: { position: 'sticky', top: '0', zIndex: '10' },
    brand: { fontWeight: "600", fontSize: "25px" }
}

function AppHeader(props) {
    const { role } = props;
    if (role === 'officer') {
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
                                <NavLink className="nav-link" to="/verifydocuments">Verify Documents</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More</div>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <NavLink className="dropdown-item" to="/changepassword">Change Password</NavLink>
                                    <div className="dropdown-divider"></div>
                                    <NavLink className="dropdown-item" to="/deleteaccount">Delete Account</NavLink>
                                    <NavLink className="dropdown-item" to="/logout">Logout</NavLink>
                                </div>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2 bg-light" type="search" placeholder="Find by category?" aria-label="Search" />
                            <button className="btn bg-dark btn-outline-light disabled" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    } else if (role === 'admin') {
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
                                <NavLink className="nav-link" to="/generatecode">Generate Code</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/createoffice">Create Office</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/verifyofficers">Verify Officers</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More</div>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <NavLink className="dropdown-item" to="/editprofile">Edit Profile</NavLink>
                                    <NavLink className="dropdown-item" to="/changepassword">Change Password</NavLink>
                                    <div className="dropdown-divider"></div>
                                    <NavLink className="dropdown-item" to="/deleteaccount">Delete Account</NavLink>
                                    <NavLink className="dropdown-item" to="/logout">Logout</NavLink>
                                </div>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2 bg-light" type="search" placeholder="Find by category?" aria-label="Search" />
                            <button className="btn bg-dark btn-outline-light disabled" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    }
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
                            <NavLink className="nav-link" to="/mydocuments">My Documents</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/createdocument">Upload Document</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/submitdocument">Submit Document</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">More</div>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <NavLink className="dropdown-item" to="/editprofile">Edit Profile</NavLink>
                                <NavLink className="dropdown-item" to="/changepassword">Change Password</NavLink>
                                <div className="dropdown-divider"></div>
                                <NavLink className="dropdown-item" to="/deleteaccount">Delete Account</NavLink>
                                <NavLink className="dropdown-item" to="/logout">Logout</NavLink>
                            </div>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2 bg-light" type="search" placeholder="Find by category?" aria-label="Search" />
                        <button className="btn bg-dark btn-outline-light disabled" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    </>
}

export default AppHeader;