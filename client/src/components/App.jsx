import Home from "./Start/Home";
import About from "./Start/About"
import Contact from "./Start/Contact"
import Guide from "./Start/Guide";
import {BrowserRouter as Router,Routes,Route, Link} from "react-router-dom"
import SignUp from "./Athenticate/SignUp";
import Login from "./Athenticate/Login";
import Cards from "./Start/Cards";
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
import Election from "./Administrator/Election";
import VoterSignUp from "./Athenticate/voterSignUp";
import VoterStartingPage from "./Voters/VoterStartingPage";
import VoterDashboard from "./Voters/VoterDashboard";
import VoterLogin from "./Athenticate/voterLogin";
import VoteElectionPage from "./Voters/VoteElectionPage";
import { Button } from "@mui/material";
import AdminLogin from "./Athenticate/AdminLogin";
import AdminStartPage from "./Admin/AdminStartPage";
import AdminDashBoard from "./Admin/AdminDashBoard";
import AdminLogout from "./Admin/AdminLogout";
import AdminPricing from "./Admin/AdminPricing";
import EditElection from "./Administrator/EditElection/EditElection";
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
        
      </Route>
      <Route path="/" element={<BlankPage/>}>
        <Route path="/voter/signup" element={<VoterSignUp/>}/>
        <Route path="/voter/login" element={<VoterLogin/>}/>
      </Route> 
      <Route path="/" element={<BlankPage/>}>
        <Route path="/admin/login" element={<AdminLogin/>}/>
      </Route> 
      <Route path="" element={<VoterStartingPage/>}>
        <Route path="/voter/dashboard" element={<VoterDashboard/>}/>
        <Route path="/voter/vote/election/:electionid" element={<VoteElectionPage/>}/>

      </Route>
      <Route path="" element={<AdminStartPage/>}>
        <Route path="/admin/dashboard" element={<AdminDashBoard/>}/>
        <Route path="/admin/logout" element={<AdminLogout/>}/>
        <Route path="/admin/pricing" element={<AdminPricing/>}/>

      </Route>

      <Route path="" element={<AdminstratorStartPage/>}>
      <Route path="/dashboard" element={<AdminstratorDashboard/>}/>
      <Route path="/profile" element={<Myprofile/>}/>
      <Route path="/organization" element={<Organization/>}/>
      <Route path="/billing" element={<Billing/>}/>
      <Route path="/logout" element={<Logout/>} />   
      <Route path="/electioncreate" element={<ElectionCreate/>} />     
      <Route path="/election/:electionid" element={<Election/>} />   
      <Route path="/editelection/:electionid" element={<EditElection/>} />   
      </Route>
      <Route path="*" element={<>page not found <Link to=""><Button variant={"contained"}>Click here to goto Home page</Button></Link></>}/>
      </Routes>
      <ToastContainer/>   
    </Router>
 </>
  );
}

export default App;
