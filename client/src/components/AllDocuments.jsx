import React from "react";
import axios from 'axios';

function AllDocuments(props) {

    const { user } = props;
    React.useEffect(async () => {
        const response = await axios.post('/alldocuments', { userId: user.userId });
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
            const allDocuments = document.getElementById('all-documents');
            allDocuments.innerHTML = '';
            userDocuments.forEach(userDocument => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<a href="${userDocument.publicUrl}" target="_blank">${userDocument.name}</a>`;
                allDocuments.append(listItem);
            });
        }
    }, []);

    return <>
        <div className="mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body text-center bg-light">
                    <h1 className="mt-3">All Documents</h1>
                    <div className="form-group m-1" id="error-box"></div>
                    <ul className="me-auto mb-2 mb-lg-0" id="all-documents">
                    </ul>
                </div>
            </div>
        </div>
    </>
}

export default AllDocuments;