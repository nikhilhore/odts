import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {

    React.useEffect(() => {
        const loginBtn = document.getElementById('login-btn');

        loginBtn.addEventListener('click', async () => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const response = await axios.post('/login', { email, password });
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
                    <h1 className="text-center m-2"><i className="fas fa-sign-in-alt"></i> Login</h1>
                    <div className="m-2">
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
                        <div className="text-center d-flex justify-content-between m-1 mt-2">
                            <button type="submit" id="login-btn" className="btn btn-primary btn-block">Login</button>
                            <p className="lead m-1">
                                Don't have an account? <Link to="/customer-signup">Signup</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Login;