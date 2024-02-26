import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TicketCard from './TicketCard'

const See_Ticket = () => {
  const navigate = useNavigate()
  const [ticketDataArray, setTicketDataArray] = useState([])

  useEffect(() => {
    const funcheck = async () => {
      try {
        const checkToken = await axios.get('http://localhost:3001/checktoken', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })

        if (!checkToken.data.is_true) {
          navigate('/Home')
        } else {
          console.log('Token is valid')
          handleData()
        }
      } catch (error) {
        console.error('Error checking token:', error)
        navigate('/Home')
      }
    }

    funcheck()
  }, []) // Empty dependency array means this effect runs only once after the initial render

  const handleData = async () => {
    try {
      const serverResponse = await axios.get('http://localhost:3001/SeeTicket')
      if (serverResponse.data.is_true === true) {
        console.log('Data fetched')
        setTicketDataArray(serverResponse.data.JsonData)
      } else {
        console.log('Data UnFetched')
      }
    } catch (err) {
      console.log(err)
    }
  }
  const HandleClick = (ticket_details) => {
    localStorage.setItem("TID", ticket_details.Ticket_id);
    navigate(`/${localStorage.getItem('Email')}/Open_Ticket`);
  };
  
  return (
    <div className="page">
      <div className="section">
        {ticketDataArray.length > 0 &&
          ticketDataArray.map((ticket, index) => (
            <div key={index}>
              <TicketCard ticket={ticket} />
              <button onClick={() => HandleClick(ticket)}>Open</button>
            </div>
          ))}
      </div>
    </div>
  );  
}

export default See_Ticket
