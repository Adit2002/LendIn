import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Create_Ticket = () => {
  function generateRandomString(length) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }
  const navigate = useNavigate()
  const email = localStorage.getItem('Email')
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
      }
    } catch (error) {
      console.error('Error checking token:', error)
      navigate('/Home')
    }
  }

  const HandleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(e)
      const currentDate = new Date()
      const currentDateTimeString = currentDate.toISOString()
      const tid = generateRandomString(10)
      const serverresponse = await axios.post(
        'http://localhost:3001/CreateTicket',
        {
          id: tid,
          mail: email,
          amount: e.target.amount.value,
          duration: e.target.duration.value,
          type: e.target.type.value,
          Description: e.target.Description.value,
          Date: currentDateTimeString,
        }
      )
      if (serverresponse.data.is_true === true) {
        console.log('Successfully Created')
        Give_Score()
      } else {
        console.log('Error')
      }
    } catch (err) {
      console.log(err)
    }
}
    const check_if_data_present=async()=>{
        const serverres=await axios.post('http://localhost:3001/Checking_for_data',{
            email : localStorage.getItem('Email')
        });
        if(serverres.data.is_true===false){
            navigate(`/${localStorage.getItem('Email')}/Brw_addtnl_info`);
        }
    }
    funcheck();
    check_if_data_present();
  const Give_Score = async () => {
    try {
      const serverresponse = await axios.get(
        'http://localhost:3001//GiveScoreToTicket',
        {}
      )
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="page">
      <div className="section">
        <h1>Add Ticket Details</h1>
        <form className="info-form" onSubmit={HandleSubmit}>
          <label for="amount">Loan Amount</label>
          <input type="text" id="amount" name="amount" />
          <br />
          <label for="duration">Duration (In Months)</label>
          <input type="text" id="duration" name="duration" />
          <br />
          <label for="type">Loan Type</label>
          <input type="text" id="type" name="type" />
          <br />
          <label for="Description">Description:</label>
          <input type="text" id="Description" name="Description" />
          <br />
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Create_Ticket;
