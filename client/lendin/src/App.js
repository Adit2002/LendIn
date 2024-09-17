import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { Suspense } from 'react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from './Components/Home'
import Register_Investor from './Components/Register_Investor.js'
import Register_Borrower from './Components/Register_Borrower.js'
import Login from './Components/Login.js'
import Dashboard_Investor from './Components/Dashboard_Investor.js'
import Dashboard_Borrower from './Components/Dashboard_Borrower.js'
import Create_Ticket from './Components/Create_Ticket.js'
import See_Ticket from './Components/See_Ticket.js'
import Open_Ticket from './Components/Open_Ticket.js'
import Transaction_init from './Components/Transaction_init.js'
import Borrower_addtnl_info from './Components/Borrower_addtnl_info.js'
import Navbar from './Components/Navbar.js'
import './Components/css/App.css';
import PreReg from './Components/PreReg.js';
import MetaMask from './Components/MetaMask.js'
import Real from './Components/Real.js';
import About from './Components/About.js';
import Fallback from './Components/Fallback.js';
function App() {
  return (
    <>
    <Suspense fallback={Fallback}>
    <GoogleOAuthProvider clientId="101828583772-7p3kgl83jtlcfp80eqg1u4m50sqr7g7m.apps.googleusercontent.com">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Real" element={<Real />} />
          <Route path="/register_inv" element={<Register_Investor />} />
          <Route path="/register_brw" element={<Register_Borrower />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/:id/DsbInv" element={<Dashboard_Investor />} />
          <Route path="/:id/DsbBrw" element={<Dashboard_Borrower />} />
          <Route path="/:id/CreateTicket" element={<Create_Ticket />} />
          <Route
            path="/:id/Brw_addtnl_info"
            element={<Borrower_addtnl_info />}
          />
          <Route
           path="/PreReg"
           element={<PreReg/>}/>
          <Route path="/:id/See_Ticket" element={<See_Ticket />} />
          <Route path="/:id/Open_Ticket" element={<Open_Ticket />} />
          <Route path="/:id/Transaction_init" element={<Transaction_init />} />
          <Route path="/metamask" element={<MetaMask/>}/>
        </Routes>
      </Router>
      </GoogleOAuthProvider>
      </Suspense>
    </>
  )
}
export default App
