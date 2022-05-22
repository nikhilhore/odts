import React from 'react'
import axios from 'axios'

function Logout() {

    React.useEffect(() => {
        const logoutBtn = document.getElementById('logout-btn');
        logoutBtn.addEventListener('click', async () => {
            const response = await axios.get('/logout');
            if (response.data.status === 'failed') {
                const errorBox = document.getElementById('error-box');
                errorBox.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${response.data.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            } else window.location.href = '/';
        });

    }, []);

    return <>
        <div className="mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body bg-light">
                    <div className="form-group m-1" id="error-box"></div>
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