import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AppHeader from './components/AppHeader';
import CreateDocument from './components/CreateDocument';
import MyDocuments from './components/MyDocuments';
import AllDocuments from './components/AllDocuments';
import Logout from './components/Logout';
import './App.css';
import SubmitDocument from './components/SubmitDocument';
import TrackDocument from './components/TrackDocument';

function App(props) {
  const role = props.user.role;
  if (role === 'admin') {
    return (
      <div id="app">
        <BrowserRouter>
          <AppHeader />
          <Routes>
            <Route exact path="/" element={<Dashboard user={props.user} />} />
            <Route exact path="/alldocuments" element={<AllDocuments user={props.user} />} />
            <Route exact path="/logout" element={<Logout />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
  return (
    <div id="app">
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route exact path="/" element={<Dashboard user={props.user} />} />
          <Route exact path="/createdocument" element={<CreateDocument user={props.user} />} />
          <Route exact path="/mydocuments" element={<MyDocuments user={props.user} />} />
          <Route exact path="/submitdocument" element={<SubmitDocument user={props.user} />} />
          <Route exact path="/trackdocument/:documentId" element={<TrackDocument user={props.user} />} />
          <Route exact path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;