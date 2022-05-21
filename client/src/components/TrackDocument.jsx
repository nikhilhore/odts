import React from "react";
import axios from 'axios';

function TrackDocument(props) {
    const { user } = props;
    React.useEffect(async () => {
        const documentId = window.location.pathname.substring(15,);
        const response = await axios.post('/trackdocument', { documentId, userId: user.userId });
        if (response.data.status === 'failed') {
            const errorBox = document.getElementById('error-box');
            errorBox.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${response.data.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
        }
        else {
            const { data } = response;
            const userDocument = data.document;
            document.getElementById('document-name').innerText = userDocument.name;
            document.querySelector('#view-button').addEventListener('click', () => {
                window.open(userDocument.publicUrl);
            });
            const ul = document.getElementById('document-status');
            userDocument.offices.forEach(office => {
                const li = document.createElement('li');
                let status = 'pending';
                if (office.status==true) status = 'approved';
                else if (office.status==false) status = 'rejected';
                li.innerText = office.officeId + " " + status;
                ul.append(li);
            });
            
        }
    }, []);
    return <>
        <div className="mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body text-center bg-light">
                    <h1 className="mt-3">Track Document</h1>
                    <div className="form-group m-1" id="error-box"></div>
                    <h3 className="mt-3" id="document-name">Document Name</h3>
                    <button className="btn btn-light" id="view-button">View</button>
                    <ul className="me-auto mb-2 mb-lg-0 mt-3" id="document-status">
                    </ul>
                </div>
            </div>
        </div>
    </>
}

export default TrackDocument;