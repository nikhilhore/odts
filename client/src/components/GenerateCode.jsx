import React from "react";
import axios from 'axios';

function GenerateCode() {

    React.useEffect(() => {
        const specialCodeInput = document.getElementById('special-code');
        const generateBtn = document.getElementById('generate-btn');
        const copyBtn = document.getElementById('copy-btn');

        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(specialCodeInput.value);
            copyBtn.innerText = 'Copied!';
            setTimeout(() => {
                copyBtn.innerText = 'Copy';
            }, 3000);
        });

        generateBtn.addEventListener('click', async () => {
            const email = document.getElementById('email').value;
            const response = await axios.post('/generatecode', { email });
            if (response.data.status === 'failed') {
                const errorBox = document.getElementById('error-box');
                errorBox.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${response.data.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            }
            else {
                const { specialCode } = response.data;
                specialCodeInput.value = specialCode;
            }
        });
    }, []);

    return <>
        <div className="mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body bg-light">
                    <h1 className="text-center m-2"><i className="fas fa-sign-in-alt"></i>Generate Special Code</h1>
                    <div className="m-2">
                        <div className="form-group m-1" id="error-box"></div>
                        <div className="form-group m-1">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" className="form-control" placeholder="Enter Email" />
                        </div>
                        <div className="text-center d-flex justify-content-between m-1 mt-2">
                            <button type="submit" id="generate-btn" className="btn btn-primary btn-block">Generate</button>
                        </div>
                        <div className="card card-body text-center bg-secondary">
                            <div className="form-group">
                                <label className="lead text-dark font-weight-bold">Copy the special code below</label>
                                <div className="input-group">
                                    <input id="special-code" type="text" placeholder="Enter email and click on generate button to get special code" className="form-control" />
                                    <button id="copy-btn" className="btn btn-primary btn-block">Copy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default GenerateCode;