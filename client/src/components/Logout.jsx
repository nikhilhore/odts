import React from 'react'
import axios from 'axios'

function Logout() {

    React.useEffect(() => {
        const logoutBtn = document.getElementById('logout-btn');
        logoutBtn.addEventListener('click', async () => {
            await axios.get('/logout');
            window.location.href = '/';
        });

    }, []);

    return <>
        <div className="mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body bg-light">
                    <div className="text-center d-flex justify-content-center">
                        <p className='lead'>Are you sure you want to logout?</p>
                    </div>
                    <div className="text-center d-flex justify-content-center">
                        <button type="submit" id="logout-btn" className="btn btn-primary btn-block">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Logout;