import axios from "axios";
import { useNavigate } from "react-router-dom";
const Open_Ticket=()=>{
    const navigate=useNavigate();
    const Handle_Card=async()=>{
        try{
            const serverresponse=await axios.get('http://localhost:3001/Open_Ticket',{
                tid: localStorage.getItem('tid')
            });
            console.log(serverresponse);
        }catch(err){
            console.log(err);
        }
      )
    } catch (err) {
      console.log(err)
    }
  }
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
  funcheck()
  Handle_Card()
  return (
    <div className="page">
      <div className="section">
        <h1 className="header">YO BRO</h1>
      </div>
    </div>
  )
}
export default Open_Ticket
