import React from "react";
import axios from "axios";

function Welcome() {
    return <>
        <div className="mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body text-center bg-light">
                    <h2>Welcome to ODTS</h2>
                    <div className="text-center m-1"><img src="favicon.ico" alt="ODTS-logo" width={150} height={150} /></div>
                    <br />
                    <h3>Manage and Track your official documents and get latest updates on each step</h3>
                </div>
                <br />
            </div>
        </div>
    </>
}

export default Welcome;