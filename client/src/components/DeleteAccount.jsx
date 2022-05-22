import React from 'react'
import axios from 'axios'

function DeleteAccount(props) {

    React.useEffect(() => {
        const { user } = props;
        const deleteBtn = document.getElementById('delete-btn');
        deleteBtn.addEventListener('click', async () => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const response = await axios.post('/deleteaccount', { userId: user.userId, email, password });
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
                    <div className="text-center d-flex justify-content-center">
                        <p className='lead'>To delete your account please enter your email and password.</p>
                    </div>
                    <div className="form-group m-1" id="error-box"></div>
                    <div className="form-group m-1">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" className="form-control" placeholder="Enter Email" />
                    </div>
                    <div className="form-group m-1">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" className="form-control"
                            placeholder="Enter Password" />
                    </div>
                    <div className="text-center d-flex justify-content-center">
                        <button type="submit" id="delete-btn" className="btn btn-danger btn-block">Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default DeleteAccount;