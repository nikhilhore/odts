import React from "react";
import axios from 'axios';

function MyDocuments(props) {

    const { user } = props;
    React.useEffect(async () => {
        const response = await axios.post('/mydocuments', { userId: user.userId });
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
            const myDocuments = document.getElementById('my-documents');
            myDocuments.innerHTML = '';

            userDocuments.forEach(userDocument => {
                const listItem = document.createElement('li');

                const description = document.createElement('p');
                description.innerText = `${userDocument.name}`;

                const viewBtn = document.createElement('button');
                viewBtn.type = 'button';
                viewBtn.classList.add('btn', 'btn-primary');
                viewBtn.innerText = 'View';
                viewBtn.style.margin = '5px';
                viewBtn.addEventListener('click', () => {
                    window.open(userDocument.publicUrl);
                });

                const trackBtn = document.createElement('button');
                trackBtn.type = 'button';
                trackBtn.classList.add('btn', 'btn-dark');
                trackBtn.innerText = 'Track';
                trackBtn.style.margin = '5px';
                trackBtn.addEventListener('click', () => {
                    window.open(`/trackdocument/${userDocument.documentId}`);
                });

                listItem.append(description);
                listItem.append(viewBtn);
                listItem.append(trackBtn);

                listItem.style.margin = '5px';
                listItem.style.border = '1px solid black';
                listItem.style.width = '100%';
                listItem.style.borderRadius = '5px';

                myDocuments.append(listItem);
            });

        }
    }, []);

    return <>
        <div className="mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body text-center bg-light">
                    <h1 className="mt-3">My Documents</h1>
                    <div className="form-group m-1" id="error-box"></div>
                    <ul className="me-auto mb-2 mb-lg-0" id="my-documents">
                    </ul>
                </div>
            </div>
        </div>
    </>
}

export default MyDocuments;