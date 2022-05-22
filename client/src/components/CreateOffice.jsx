import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

function CreateOffice(props) {

    const { user } = props;
    React.useEffect(async () => {
        const stateList = document.querySelector('#state');
        const districtList = document.querySelector('#district');
        const subDistrictList = document.querySelector('#sub-district');

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

                subDistricts.forEach(subDistrict => {
                    const option = document.createElement('option');
                    option.innerText = subDistrict;
                    subDistrictList.appendChild(option);
                });
            }
        }

        stateList.addEventListener('change', getDistricts);
        districtList.addEventListener('change', getSubDistricts);

        const submitBtn = document.getElementById('submit-btn');

        submitBtn.addEventListener('click', async () => {
            const state = stateList.value;
            const district = districtList.value;
            const subDistrict = subDistrictList.value;
            const officeName = document.getElementById('office').value;
            const officeId = document.getElementById('officeId').value;
            const response = await axios.post('/createoffice', { officeId, state, district, subDistrict, name: officeName });
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
                    <h1 className="text-center m-2"><i className="fas fa-sign-in-alt"></i> Create Office</h1>
                    <div className="form-group m-1" id="error-box"></div>
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
                        <label htmlFor="office">Office Name</label>
                        <input type="text" className="form-control" name="office" id="office" placeholder="Enter office Name" />
                    </div>
                    <div className="form-group m-1">
                        <label htmlFor="officeId">Office Id</label>
                        <input type="text" className="form-control" name="officeId" id="officeId" placeholder="Enter office Id" />
                    </div>
                    <div className="m-2">
                        <div className="text-center d-flex justify-content-between m-1 mt-2">
                            <button type="submit" id="submit-btn" className="btn btn-primary btn-block">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CreateOffice;