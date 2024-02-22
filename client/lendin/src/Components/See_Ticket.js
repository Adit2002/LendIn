import axios from "axios";
import { useNavigate } from "react-router-dom";
const See_Ticket=()=>{
    const navigate=useNavigate();
    const handle_Data=async()=>{
        try{
            const serverresponse=await axios.get('http://localhost:3001/SeeTicket');
            if(serverresponse.data.is_true===true){
                console.log('Data fetched');
                console.log(serverresponse.data.JsonData);
            }
            else{
                console.log('Data UnFetched');
            }
        }
        catch(err){
            console.log(err);
        }
    }
    // const HandleOnClick_Card=()=>{
    //     e.preventDefault();
    //     try{

    //     }
    // }
    const funcheck = async () => {
        try {
            const checkToken = await axios.get('http://localhost:3001/checktoken', {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            });
            
            if (!checkToken.data.is_true) {
                navigate('/Home');
            } else {
                console.log('Token is valid');
                handle_Data();

            }
        } catch (error) {
            console.error('Error checking token:', error);
            navigate('/Home');
        }
    };
    funcheck();
    return (
        <div>
            Yaa
        </div>
    );
}
export default See_Ticket;