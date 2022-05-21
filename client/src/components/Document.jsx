import React from "react";
import axios from 'axios';

function Document(props) {
    const { userDocument } = props;
    React.useEffect(async () => {
        document.getElementById(userDocument.documentId).addEventListener('click', async () => {
            await axios.post('/downloadDocument', { documentId: userDocument.documentId, userId: userDocument.userId });
        });
    }, []);
    return <>
        <li>
            <h5>{userDocument.name}</h5>
            <br />
            <button id={userDocument.documentId} className="btn">
                <i className="fa fa-download"></i>
                Download
            </button>
        </li>
    </>
}

export default Document;