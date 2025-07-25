import adminapi from "../../api/adminapi.js";
const Datafaq=async()=>{
let data = [];
try{
const response = await adminapi.get("/faqs");
data = response && response.data ? response.data : [];
return data;
}catch(error){
	console.log(error);
	return data;
}	

}

export  {Datafaq};