import React from "react";
import axios from 'axios';

function VerifyOfficers(props) {

    const { user } = props;
    React.useEffect(async () => {
        const response = await axios.post('/pendingofficers', { userId: user.userId });
        if (response.data.status === 'failed') {
            const errorBox = document.getElementById('error-box');
            errorBox.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${response.data.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
        }
        else {
            const { data } = response;
            const pendingofficers = data.officers;

            const officersList = document.getElementById('officers-list');
            officersList.innerHTML = '';

            pendingofficers.forEach(officer => {
                const listItem = document.createElement('li');

                const description = document.createElement('p');
                description.innerText = `Name: ${officer.firstName} ${officer.lastName}\nEmail: ${officer.email}\nPhone: ${officer.phone}`;

                const viewBtn = document.createElement('button');
                viewBtn.type = 'button';
                viewBtn.classList.add('btn', 'btn-primary');
                viewBtn.innerText = 'View';
                viewBtn.style.margin = '5px';
                viewBtn.addEventListener('click', () => {
                    window.open(officer.publicUrl);
                });

                const verifyBtn = document.createElement('button');
                verifyBtn.type = 'button';
                verifyBtn.classList.add('btn', 'btn-success');
                verifyBtn.innerText = 'Verify';
                verifyBtn.style.margin = '5px';
                verifyBtn.addEventListener('click', async () => {
                    const status = await axios.post('/verifyofficer', { userId: user.userId, officerId: officer.userId });
                    if (status.data === 'success') window.location.href = '/verifyofficers';
                });

                const rejectBtn = document.createElement('button');
                rejectBtn.type = 'button';
                rejectBtn.classList.add('btn', 'btn-danger');
                rejectBtn.innerText = 'Reject';
                rejectBtn.style.margin = '5px';
                rejectBtn.addEventListener('click', async () => {
                    const status = await axios.post('/rejectofficer', { userId: user.userId, officerId: officer.userId });
                    if (status.data === 'success') window.location.href = '/verifyofficers';
                });

                listItem.append(description, viewBtn, verifyBtn, rejectBtn);

                listItem.style.margin = '5px';
                listItem.style.border = '1px solid black';
                listItem.style.width = '100%';
                listItem.style.borderRadius = '5px';

                officersList.append(listItem);
            });
        }
    }, []);

    return <>
        <div className="mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body text-center bg-light">
                    <h1 className="mt-3">Verify Officers</h1>
                    <div className="form-group m-1" id="error-box"></div>
                    <ul className="me-auto mb-2 mb-lg-0" id="officers-list">
                    </ul>
                </div>
            </div>
        </div>
    </>
}

export default VerifyOfficers;