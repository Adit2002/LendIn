import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
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
import './Components/css/App.css'
function App() {
  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
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
          <Route path="/:id/See_Ticket" element={<See_Ticket />} />
          <Route path="/:id/Open_Ticket" element={<Open_Ticket />} />
          <Route path="/:id/Transaction_init" element={<Transaction_init />} />
        </Routes>
      </Router>
    </>
  )
}
export default App
