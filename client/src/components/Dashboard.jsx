import React from "react";

function Dashboard(props) {
    const { user } = props;
    return <>
        <div className="mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body text-center bg-light">
                    <h1 className="mt-3">Dashboard</h1>
                    <p className="lead m-3">Welcome {user.firstName}</p>
                </div>
            </div>
        </div>
    </>
}

export default Dashboard;