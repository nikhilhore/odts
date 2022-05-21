import React from "react";
import axios from "axios";

function Welcome() {

    React.useEffect(() => {
        const trackBtn = document.getElementById('track-btn');

        trackBtn.addEventListener('click', async () => {
            const trackingId = document.getElementById('tracking-id').value;
            const trackedDocument = await axios.post('/track', { trackingId });
        });

    }, []);

    return <>
        <div className="mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body text-center bg-light">
                    <h2>Welcome to ODTS</h2>
                    <div className="text-center m-1"><img src="favicon.ico" alt="ODTS-logo" width={150} height={150} /></div>
                    <br />
                    <h3>Manage and Track your official documents and get latest updates on each step</h3>
                    <div className="card card-body text-center bg-secondary">
                        <div className="form-group">
                            <label className="lead text-dark font-weight-bold">Already have a document tracking ID?</label>
                            <div className="input-group">
                                <input id="tracking-id" type="text" placeholder="Enter tracking ID" className="form-control" />
                                <button id="track-btn" className="btn btn-primary btn-block">Track</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        </div>
    </>
}

export default Welcome;