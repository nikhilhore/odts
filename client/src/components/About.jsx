import React from "react";

function About() {
    return <>
        <div className="mt-5">
            <div className="col-md-6 m-auto">
                <div className="card card-body bg-light">
                    <h3 className="mt-3">Abstract</h3>
                    <p className="m-1">
                        Web-Based solution to track the status of document/file going through approval process in any
                        department. All the Departments under the Ministry are using some common file/document
                        movement and approval procedures. The physical movement of such files/documents has many
                        disadvantages. When a document file is under process of approval, the location of the file
                        document where it has been delayed on the way while moving from table to table, is very difficult
                        to trace.
                        ODTS is a web-based integrated platform for creation, forwarding, rejection/approval of
                        documents/files in electronic format. Customization facility to define the file movement procedure
                        and nomination of designated Officers/sections. User creation and user rights management
                        Development of user-friendly web-based platforms for managing files under different categories
                        viz. Note sheets for obtaining approvals, leave applications, interoffice notes, Circulars, P&A
                        Office orders etc.
                    </p>
                </div>
            </div>
        </div>
    </>
}

export default About;