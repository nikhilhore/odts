import React from "react";
import axios from 'axios';

function CreateDocument(props) {

    const { user } = props;
    React.useEffect(() => {
        const createBtn = document.getElementById('create-btn');

        createBtn.addEventListener('click', async () => {
            const visibility = document.getElementById('visibility').value;
            const name = document.getElementById('document-name').value;
            const file = document.getElementById('document-file').files[0];

            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', user.userId);
            formData.append('email', user.email);
            formData.append('name', name);
            formData.append('visibility', visibility);

            const response = await axios.post('/createDocument', formData);
            if (response.data.status === 'failed') {
                const errorBox = document.getElementById('error-box');
                errorBox.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${response.data.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            }
            else window.location.href = '/mydocuments';
        });

    }, []);

    return <>
        <div className="mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body bg-light">
                    <h1 className="text-center m-2">
                        <i className="fas fa-user-plus"></i> Upload Document
                    </h1>
                    <div className="m-2">
                        <div className="form-group m-1" id="error-box"></div>
                        <div className="form-group m-1">
                            <label htmlFor="visibility">Document Type</label>
                            <select className="form-select" name="visibility" id="visibility">
                                <option value="private">Private</option>
                                <option value="public">Public</option>
                            </select>
                        </div>
                        <div className="form-group m-1">
                            <label htmlFor="document-name">Name</label>
                            <input type="text" id="document-name" name="document-name" className="form-control" placeholder="Enter document name/description" />
                        </div>
                        <div className="form-group m-1">
                            <label htmlFor="document-file">Upload Document(max. size 10MB)</label>
                            <input type="file" id="document-file" name="document-file" className="form-control" />
                        </div>
                        <div className="text-center d-flex justify-content-between m-1 mt-2">
                            <button type="submit" id="create-btn" className="btn btn-primary btn-block">
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CreateDocument;