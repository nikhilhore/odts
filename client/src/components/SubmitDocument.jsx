import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

function SubmitDocument(props) {

    const { user } = props;
    React.useEffect(async () => {
        const documentList = document.querySelector('#select-document');
        const stateList = document.querySelector('#state');
        const districtList = document.querySelector('#district');
        const subDistrictList = document.querySelector('#sub-district');
        const officeList = document.querySelector('#office');

        (async function getDocuments() {
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

                documentList.innerHTML = '<option>Select a document</option>';

                userDocuments.forEach(userDocument => {
                    const option = document.createElement('option');
                    option.innerText = userDocument.name;
                    option.value = userDocument.documentId;
                    documentList.appendChild(option);
                });
            }
        }());

        (async function getStates() {
            const response = await axios.get('/states');

            if (response.data.status === 'failed') {
                const errorBox = document.getElementById('error-box');
                errorBox.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${response.data.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            }
            else {
                const states = response.data;

                stateList.innerHTML = '<option>Select a state</option>';

                states.forEach(state => {
                    const option = document.createElement('option');
                    option.innerText = state;
                    stateList.appendChild(option);
                });
            }
        }());

        async function getDistricts() {
            const payload = { state: stateList.value };
            const response = await axios.post('/districts', payload);

            if (response.data.status === 'failed') {
                const errorBox = document.getElementById('error-box');
                errorBox.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${response.data.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            }
            else {

                const districts = response.data;

                districtList.innerHTML = '<option>Select a district</option>';
                subDistrictList.innerHTML = '<option>Select a sub-district</option>';
                officeList.innerHTML = '<option>Select a office</option>';

                districts.forEach(district => {
                    const option = document.createElement('option');
                    option.innerText = district;
                    districtList.appendChild(option);
                });
            }
        }

        async function getSubDistricts() {
            const payload = { state: stateList.value, district: districtList.value };
            const response = await axios.post('/subDistricts', payload);
            if (response.data.status === 'failed') {
                const errorBox = document.getElementById('error-box');
                errorBox.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${response.data.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            }
            else {
                const subDistricts = response.data;

                subDistrictList.innerHTML = '<option>Select a sub-district</option>';
                officeList.innerHTML = '<option>Select a office</option>';

                subDistricts.forEach(subDistrict => {
                    const option = document.createElement('option');
                    option.innerText = subDistrict;
                    subDistrictList.appendChild(option);
                });
            }
        }

        async function getOffices() {
            const payload = { state: stateList.value, district: districtList.value, subDistrict: subDistrictList.value };
            const response = await axios.post('/offices', payload);

            if (response.data.status === 'failed') {
                const errorBox = document.getElementById('error-box');
                errorBox.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${response.data.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            }
            else {
                const offices = response.data;

                officeList.innerHTML = '<option>Select a office</option>';

                offices.forEach(office => {
                    const option = document.createElement('option');
                    option.innerText = office.name;
                    option.value = office.officeId;
                    officeList.appendChild(option);
                });
            }
        }

        stateList.addEventListener('change', getDistricts);
        districtList.addEventListener('change', getSubDistricts);
        subDistrictList.addEventListener('change', getOffices);

        const submitBtn = document.getElementById('submit-btn');

        submitBtn.addEventListener('click', async () => {
            const documentId = document.getElementById('select-document').value;
            const officeId = document.getElementById('office').value;
            const response = await axios.post('/submitdocument', { officeId, documentId });
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
                    <h1 className="text-center m-2"><i className="fas fa-sign-in-alt"></i> Submit Document</h1>
                    <div className="form-group m-1" id="error-box"></div>
                    <div className="form-group m-1">
                        <label htmlFor="select-document">Document</label>
                        <select className="form-select" name="select-document" id="select-document">
                        </select>
                    </div>
                    <div className="form-group m-1">
                        <label htmlFor="state">State</label>
                        <select className="form-select" name="state" id="state">
                        </select>
                    </div>
                    <div className="form-group m-1">
                        <label htmlFor="district">District</label>
                        <select className="form-select" name="district" id="district">
                        </select>
                    </div>
                    <div className="form-group m-1">
                        <label htmlFor="sub-district">Sub District</label>
                        <select className="form-select" name="sub-district" id="sub-district">
                        </select>
                    </div>
                    <div className="form-group m-1">
                        <label htmlFor="office">Office</label>
                        <select className="form-select" name="office" id="office">
                        </select>
                    </div>
                    <div className="m-2">
                        <div className="text-center d-flex justify-content-between m-1 mt-2">
                            <button type="submit" id="submit-btn" className="btn btn-primary btn-block">Submit</button>
                            <p className="lead m-1">
                                Don't have a document? <Link to="/createdocument">Create Document</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default SubmitDocument;