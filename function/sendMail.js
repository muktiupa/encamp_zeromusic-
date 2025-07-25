import axios from "axios";
const sendMail= async (data)=>{
const header =  {
                 'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                }
try{
  const response = await axios.post('/api/email',JSON.stringify(data),{headers:header});

  if(response.status === 200){
    return true;
  }else{
    return false;
  }
}catch(e){
 console.log(e);
 return false;
}


}
export default sendMail;
