import React from "react";
import axios from 'axios';

function EditOfficer() {

    React.useEffect(async () => {
        const userId = window.location.pathname.substring(13,);
        const response = await axios.post('/getuser', { userId });

        if (response.data.status === 'failed') {
            const errorBox = document.getElementById('error-box');
            errorBox.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${response.data.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
        } else {
            const { user } = response.data;
            document.getElementById('firstName').value = user.firstName;
            document.getElementById('lastName').value = user.lastName;
            document.getElementById('email').value = user.email;
            document.getElementById('phone').value = user.phone;
        }

        const confirmBtn = document.getElementById('confirm-btn');

        confirmBtn.addEventListener('click', async () => {
            const role = 'officer';
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const file = document.getElementById('document-file').files[0];

            const formData = new FormData();
            formData.append('userId', userId);
            formData.append('file', file);
            formData.append('role', role);
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('password', password);

            const response = await axios.post('/editofficer', formData);
            if (response.data.status === 'failed') {
                const errorBox = document.getElementById('error-box');
                errorBox.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${response.data.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            }
            else window.location.href = '/login';
        });

    }, []);

    return <>
        <div className="mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body bg-light">
                    <h1 className="text-center m-2">
                        <i className="fas fa-user-plus"></i> SignUp
                    </h1>
                    <div className="m-2">
                        <div className="form-group m-1" id="error-box"></div>
                        <div className="form-group m-1 d-flex justify-content-between">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input type="name" id="firstName" name="firstName" className="form-control"
                                    placeholder="Enter first name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="name" id="lastName" name="lastName" className="form-control"
                                    placeholder="Enter last name" />
                            </div>
                        </div>
                        <div className="form-group m-1">
                            <label htmlFor="email">Email</label>
                            <input disabled type="email" id="email" name="email" className="form-control" placeholder="Enter Email" />
                        </div>
                        <div className="form-group m-1">
                            <label htmlFor="phone">Phone</label>
                            <input type="phone" id="phone" name="phone" className="form-control" placeholder="Enter phone number" />
                        </div>
                        <div className="form-group m-1">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" className="form-control"
                                placeholder="Enter password to edit details" />
                        </div>
                        <div className="form-group m-1">
                            <label htmlFor="document-file">Upload office Identity card(max. size 10MB)</label>
                            <input type="file" id="document-file" name="document-file" className="form-control" />
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

export default EditOfficer;