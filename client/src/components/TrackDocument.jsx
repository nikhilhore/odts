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
            const tbody = document.getElementById('table-body');
            let cnt = 1;
            userDocument.offices.forEach(async (office) => {
                const trow = document.createElement('tr');

                let status = 'pending';
                if (office.status == true) status = 'approved';
                else if (office.status == false) status = 'rejected';

                const officeName = (await axios.post('/getoffice', { officeId: office.officeId })).data.name;

                const th = document.createElement('th');
                th.scope = "row";
                th.innerText = cnt;
                cnt = cnt + 1;

                const td1 = document.createElement('td');
                td1.innerText = officeName;
                const td2 = document.createElement('td');
                td2.innerText = status;
                const td3 = document.createElement('td');
                td3.innerText = "";

                trow.append(th, td1, td2, td3);
                tbody.append(trow);
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
                    <button className="btn btn-primary" id="view-button">View</button>
                    <table className="table me-auto mb-2 mb-lg-0 mt-3">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Office Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Remark</th>
                            </tr>
                        </thead>
                        <tbody id="table-body">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}

export default TrackDocument;