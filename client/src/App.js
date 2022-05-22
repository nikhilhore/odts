import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AppHeader from './components/AppHeader';
import CreateDocument from './components/CreateDocument';
import MyDocuments from './components/MyDocuments';
import AllDocuments from './components/AllDocuments';
import Logout from './components/Logout';
import './App.css';
import SubmitDocument from './components/SubmitDocument';
import TrackDocument from './components/TrackDocument';
import GenerateCode from './components/GenerateCode';
import VerifyOfficers from './components/VerifyOfficers';
import EditProfile from './components/EditProfile';
import ChangePassword from './components/ChangePassword';
import EditOfficer from './components/EditOfficer';

function App(props) {
  const role = props.user.role;
  if (role === 'officer') {
    return (
      <div id="app">
        <BrowserRouter>
          <AppHeader role='officer' />
          <Routes>
            <Route exact path="/" element={<Dashboard user={props.user} />} />
            <Route exact path="/alldocuments" element={<AllDocuments user={props.user} />} />
            <Route exact path="/editprofile" element={<EditOfficer user={props.user} />} />
            <Route exact path="/changepassword" element={<ChangePassword user={props.user} />} />
            <Route exact path="/logout" element={<Logout />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else if (role === 'admin') {
    return (
      <div id="app">
        <BrowserRouter>
          <AppHeader role='admin' />
          <Routes>
            <Route exact path="/" element={<Dashboard user={props.user} />} />
            <Route exact path="/verifyofficers" element={<VerifyOfficers user={props.user} />} />
            <Route exact path="/generatecode" element={<GenerateCode user={props.user} />} />
            <Route exact path="/editprofile" element={<EditProfile user={props.user} />} />
            <Route exact path="/changepassword" element={<ChangePassword user={props.user} />} />
            <Route exact path="/logout" element={<Logout />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
  return (
    <div id="app">
      <BrowserRouter>
        <AppHeader role='customer' />
        <Routes>
          <Route exact path="/" element={<Dashboard user={props.user} />} />
          <Route exact path="/createdocument" element={<CreateDocument user={props.user} />} />
          <Route exact path="/mydocuments" element={<MyDocuments user={props.user} />} />
          <Route exact path="/submitdocument" element={<SubmitDocument user={props.user} />} />
          <Route exact path="/trackdocument/:documentId" element={<TrackDocument user={props.user} />} />
          <Route exact path="/editprofile" element={<EditProfile user={props.user} />} />
          <Route exact path="/changepassword" element={<ChangePassword user={props.user} />} />
          <Route exact path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;