import Home from "./Start/Home";
import About from "./Start/About"
import Contact from "./Start/Contact"
import Guide from "./Start/Guide";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import SignUp from "./Athenticate/SignUp";
import Login from "./Athenticate/Login";
import Cards from "./Start/Cards";
import Voter from "./voter/Voter";
import Vote from "./voter/Vote";
import LandingPage from "./Start/LandingPage";
import BlankPage from "./Blanks/BlankPage";
import Pricing from "./Start/Pricing";
import AdminstratorStartPage from "./Administrator/AdminstratorStartPage";
import AdminstratorDashboard from "./Administrator/AdminstratorDashboard";
import Myprofile from "./Administrator/Myprofile";
import Organization from "./Administrator/Organization";
import Billing from "./Administrator/Billing";
import Logout from "./Administrator/Logout";
import { ToastContainer } from "react-toastify";
import ElectionCreate from "./Administrator/CreateElectionForm/ElectionCreate";
function App() {
  return (
   <>
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage/>}>
        <Route index element={<Home/>}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/guide" element={<Guide />}/>
        <Route path="/pricing" element={<Pricing/> }/>
      </Route>
      <Route path="/" element={<BlankPage/>}>
        <Route path="/card" element={<Cards/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/voter" element={<Voter/>}/>
        <Route path="vote" element={<Vote/>}/>
      </Route>
      <Route path="" element={<AdminstratorStartPage/>}>
      <Route path="/dashboard" element={<AdminstratorDashboard/>}/>
      <Route path="/profile" element={<Myprofile/>}/>
      <Route path="/organization" element={<Organization/>}/>
      <Route path="/billing" element={<Billing/>}/>
      <Route path="/logout" element={<Logout/>} />   
      <Route path="/electioncreate" element={<ElectionCreate/>} />   
      </Route>
      </Routes>
      <ToastContainer/>   
    </Router>
 </>
  );
}

export default App;
