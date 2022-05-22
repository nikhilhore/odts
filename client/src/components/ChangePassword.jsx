import React from "react";
import axios from 'axios';

function ChangePassword(props) {

    const { user } = props;
    React.useEffect(() => {
        const confirmBtn = document.getElementById('confirm-btn');

        confirmBtn.addEventListener('click', async () => {
            const email = document.getElementById('email').value;
            const oldpassword = document.getElementById('oldpassword').value;
            const password = document.getElementById('password').value;
            const cpassword = document.getElementById('cpassword').value;

            const response = await axios.post('/changepassword', { email, oldpassword, password, cpassword });
            
            if (response.data.status === 'failed') {
                const errorBox = document.getElementById('error-box');
                errorBox.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${response.data.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            }
            else window.location.href = '/';
        });

    }, []);

    return <>
        <div className="mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body bg-light">
                    <h1 className="text-center m-2">
                        <i className="fas fa-user-plus"></i> Edit Profile
                    </h1>
                    <div className="m-2">
                        <div className="form-group m-1" id="error-box"></div>
                        <div className="form-group m-1">
                            <label htmlFor="email">Email</label>
                            <input disabled value={user.email} type="email" id="email" name="email" className="form-control" placeholder="Enter Email" />
                        </div>
                        <div className="form-group m-1">
                            <label htmlFor="oldpassword">Old Password</label>
                            <input type="password" id="oldpassword" name="oldpassword" className="form-control"
                                placeholder="Enter old password" />
                        </div>
                        <div className="form-group m-1">
                            <label htmlFor="password">New Password</label>
                            <input type="password" id="password" name="password" className="form-control"
                                placeholder="Create Password" />
                        </div>
                        <div className="form-group m-1">
                            <label htmlFor="cpassword">Confirm New Password</label>
                            <input type="password" id="cpassword" name="cpassword" className="form-control"
                                placeholder="Confirm Password" />
                        </div>
                        <div className="text-center d-flex justify-content-between m-1 mt-2">
                            <button type="submit" id="confirm-btn" className="btn btn-primary btn-block">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ChangePassword;