import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import About from './components/About';
import Login from './components/Login';
import CustomerSignup from './components/CustomerSignup';
import OfficerSignup from './components/OfficerSignup';
import AdminSignup from './components/AdminSignup';
import HomeHeader from './components/HomeHeader';
import './Home.css';
import EditOfficer from './components/EditOfficer';

function Home() {
  return (
    <div id="home">
      <BrowserRouter>
        <HomeHeader />
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/customer-signup" element={<CustomerSignup />} />
          <Route exact path="/officer-signup" element={<OfficerSignup />} />
          <Route exact path="/admin-signup" element={<AdminSignup />} />
          <Route exact path="/editofficer/:userId" element={<EditOfficer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Home;