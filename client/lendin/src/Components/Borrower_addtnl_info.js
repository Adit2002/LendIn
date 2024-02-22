import axios from "axios";
import { useNavigate } from "react-router-dom";
const Borrower_addtnl_info=()=>{
    const navigate=useNavigate();
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
            }
        } catch (error) {
            console.error('Error checking token:', error);
            navigate('/Home');
        }
    };
    const HandleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const serverresponse=await axios.post('http://localhost:3001/brw_adtnl_info',{
                email: localStorage.getItem('Email'),
                income: e.target.annual_income.value,
                yoj: e.target.year_of_job.value,
                val_cur_prop: e.target.value_of_curr_prop.value
            });
            if(serverresponse.data.is_true===true){
                navigate(`/${localStorage.getItem('Email')}/DsbBrw`);
            }
            else{
                console.log("Error Do it Again");
            }
        }catch(err){
            console.log(err);
        }
    }
    funcheck();
    return (
        <div>
            <form onSubmit={HandleSubmit}>
            <label for="annual_income">Enter your Annual_Income</label>
            <input type="text" id="annual_income" name="annual_income"/><br/>
            <label for="year_of_job">Years of Job Experience</label>
            <input type="text" id="year_of_job" name="year_of_job"/><br/>
            <label for="value_of_curr_prop">Enter Estimated Current Value of Property</label>
            <input type="text" id="value_of_curr_prop" name="value_of_curr_prop"/><br/>
            <button>Submit</button>
            </form>
        </div>
    )

}
export default Borrower_addtnl_info;