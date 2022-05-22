import React from "react";
import axios from 'axios';

function VerifyDocuments(props) {

    const { user } = props;
    React.useEffect(async () => {
        const response = await axios.post('/pendingdocuments', { userId: user.userId, officeId: user.officeId });
        if (response.data.status === 'failed') {
            const errorBox = document.getElementById('error-box');
            errorBox.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${response.data.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
        }
        else {
            const { data } = response;
            const userDocuments = data.documents;
            const documentsList = document.getElementById('documents-list');
            documentsList.innerHTML = '';
            userDocuments.forEach(userDocument => {
                const listItem = document.createElement('li');

                const description = document.createElement('p');
                description.innerText = `Name: ${userDocument.name}`;

                const div = document.createElement('div');
                div.classList.add('form-group', 'm-1');
                const label = document.createElement('label');
                label.innerText = 'Remark';
                label.htmlFor = 'remark';
                const remarkInput = document.createElement('input');
                remarkInput.id = 'remark';
                remarkInput.name = 'remark';
                remarkInput.type = 'text';
                remarkInput.placeholder = 'Enter some remark';
                remarkInput.classList.add('form-control');
                div.append(label, remarkInput);

                const viewBtn = document.createElement('button');
                viewBtn.type = 'button';
                viewBtn.classList.add('btn', 'btn-primary');
                viewBtn.innerText = 'View';
                viewBtn.style.margin = '5px';
                viewBtn.addEventListener('click', () => {
                    window.open(userDocument.publicUrl);
                });

                const verifyBtn = document.createElement('button');
                verifyBtn.type = 'button';
                verifyBtn.classList.add('btn', 'btn-success');
                verifyBtn.innerText = 'Verify';
                verifyBtn.style.margin = '5px';
                verifyBtn.addEventListener('click', async () => {
                    const remark = remarkInput.value;
                    const status = await axios.post('/verifydocument', { userId: user.userId, documentId: userDocument.documentId, remark });
                    if (status.data === 'success') window.location.href = '/verifydocuments';
                });

                const rejectBtn = document.createElement('button');
                rejectBtn.type = 'button';
                rejectBtn.classList.add('btn', 'btn-danger');
                rejectBtn.innerText = 'Reject';
                rejectBtn.style.margin = '5px';
                rejectBtn.addEventListener('click', async () => {
                    const remark = remarkInput.value;
                    const status = await axios.post('/rejectdocument', { userId: user.userId, documentId: userDocument.documentId, remark });
                    if (status.data === 'success') window.location.href = '/verifydocuments';
                });

                const sendBtn = document.createElement('button');
                sendBtn.type = 'button';
                sendBtn.classList.add('btn', 'btn-warning');
                sendBtn.innerText = 'Send';
                sendBtn.style.margin = '5px';
                sendBtn.addEventListener('click', async () => {
                    window.location.href = `/senddocument/${userDocument.documentId}`;
                });

                listItem.append(description, div, viewBtn, verifyBtn, rejectBtn, sendBtn);

                listItem.style.margin = '5px';
                listItem.style.border = '1px solid black';
                listItem.style.width = '100%';
                listItem.style.borderRadius = '5px';

                documentsList.append(listItem);
            });
        }
    }, []);

    return <>
        <div className="mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body text-center bg-light">
                    <h1 className="mt-3">Verify Documents</h1>
                    <div className="form-group m-1" id="error-box"></div>
                    <ul className="me-auto mb-2 mb-lg-0" id="documents-list">
                    </ul>
                </div>
            </div>
        </div>
    </>
}

export default VerifyDocuments;