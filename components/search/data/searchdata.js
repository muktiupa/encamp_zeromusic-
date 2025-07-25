import adminapi from "../../../api/adminapi.js";

const searchDatafromweb=async (asa)=>{
//get activity
let consolidateData = [];

try{
const response = await adminapi.get("/locations");
if(response.data.length > 0){
let count = 0;
let newobj = [];
response.data.map((acc)=>{

if(acc.availability === 1){
newobj = [...newobj,acc];
consolidateData = {...consolidateData,locations : newobj} 
count = count + 1;	
}

})

}
}catch(e){
	console.log(e);
}

try{
const response = await adminapi.get("/activities");
if(response.data.length > 0){
let count = 0;
let newobj = [];
response.data.map((acc)=>{

if(acc.availability === 1){
newobj = [...newobj,acc];
consolidateData = {...consolidateData,activity : newobj} 
count = count + 1;	
}

})
}
}catch(e){
	console.log(e);
}
try{
const response = await adminapi.get("/itinerary");

if(response.data.length > 0){
let newobj = [];

response.data.map((ite)=>{
if(ite.itineraryindex[0].position === 'published'){

newobj = [...newobj,ite];
}
})
newobj.map((as)=>{
	as.tempObj.map((bs)=>{
		bs.vehicledata = "";
	})
})
consolidateData = {...consolidateData,itenary : newobj} 
}
}catch(e){
	console.log(e);
}

return consolidateData;
}
export {searchDatafromweb}