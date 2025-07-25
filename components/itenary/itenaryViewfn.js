import {useState,useEffect} from "react";
import {getCalculates} from "./calculateitenary";
const GetCalculationtable = (props)=>{
const {itenaryobj} = props;
const [toggle,setToggle] = useState(false);
const [total,setTotal] = useState({accomtotal:0,activitytotal:0,vehicletotal:0,foodtotal:0,total:0});
const [totalcf,setTotalcf] = useState({accomtotalcf:0,activitytotalcf:0,vehicletotalcf:0,total:0});

useEffect(()=>{
if(itenaryobj.length > 0 && toggle){
let customprice = itenaryobj[0].grandtotal.hasOwnProperty('customprice') ? itenaryobj[0].grandtotal.customprice : "";
let typeoftrip = itenaryobj[0].itineraryindex[0].hasOwnProperty('typeoftrip') ? itenaryobj[0].itineraryindex[0].typeoftrip : "";
let calculation = getCalculates(itenaryobj[0].tempObj,'','',typeoftrip,customprice);
setTotal(calculation[6]);
setTotalcf(calculation[7]);
}

},[toggle])




return (
<div className="container mt-3 mb-3" >
<button className="btn btn-info mt-2 mb-2" onClick={()=>setToggle(!toggle)}>View Calculations</button>
{toggle ? <div className="container p-3">
<h5 className="h5 text-success mt-2 mb-3">View Day wise Calculation Break-up</h5>
{itenaryobj && itenaryobj.length > 0 ? <h5 className="h5 text-success mt-2 mb-3">Number of Person: {itenaryobj[0].grandtotal[0].noofperson} Px</h5>:""}
<div className="row">
 <div className="col-lg-6 col-md-6 col-sm-12 p-4">
<table className="table table-bordered table-hovered table-responsive" style={{fontSize:'0.9rem'}}>
	<thead>
	  <tr className="text-center">
		<th>Day</th>
		<th>Accomodation</th>
		<th>Activities</th>
		<th>Vehicle</th>
		<th>Food</th>
		<th>Total</th>
	  </tr>
	</thead>
	<tbody>
	 {
	 	itenaryobj && itenaryobj.length > 0 ? itenaryobj[0].tempObj.map((data,key)=>{
           return (
                   <tr className="text-center" key ={"dfdf" + key}>
		             <td>{data.daywiseitenary}</td>
		             <td>{data.accomodationdata.selectedroom.price * itenaryobj[0].grandtotal[0].requirement[key].noofroomrequired}</td>
		             <td>{data.activityprice * itenaryobj[0].grandtotal[0].noofperson}</td>
		             <td>{data.totalvehicleprice * itenaryobj[0].grandtotal[0].requirement[key].noofvehiclerequired}</td>
		             <td>{data.totalfoodprice}</td>
		             <td>{+data.accomodationdata.selectedroom.price * itenaryobj[0].grandtotal[0].requirement[key].noofroomrequired + +data.totalfoodprice * itenaryobj[0].grandtotal[0].noofperson + +data.activityprice * itenaryobj[0].grandtotal[0].noofperson + +data.totalvehicleprice * itenaryobj[0].grandtotal[0].requirement[key].noofvehiclerequired}</td>
	              </tr>
	              )
	 	}) 

	 :""}
	 <tr className="text-center">
	 	<th>GrandTotal: </th>
	 	<th>{total.accomtotal}</th>
	 	<th>{total.activitytotal}</th>
	 	<th>{total.vehicletotal}</th>
	 	<th>{total.foodtotal}</th>
	 	<th>{total.total}</th>
	 </tr>
   </tbody>
</table>
</div>
{/*carbon footprint*/}

 <div className="col-lg-6 col-md-6 col-sm-12 p-4">
<table className="table table-bordered table-hovered table-responsive" style={{fontSize:'0.9rem'}}>
	<thead>
	  <tr className="text-center">
		<th>Day</th>
		<th>Accomodation</th>
		<th>Activities</th>
		<th>Vehicle</th>
		<th>Total</th>
	  </tr>
	</thead>
	<tbody>
	 {
	 	itenaryobj && itenaryobj.length > 0 ? itenaryobj[0].tempObj.map((data,key)=>{
           return (
                   <tr className="text-center" key ={"dfdf" + key}>
		             <td>{data.daywiseitenary}</td>
		             <td>{data.accomodationdata.accomodation[0].carbonval * itenaryobj[0].grandtotal[0].requirement[key].noofroomrequired}</td>
		             <td>{data.carbonfootprint * itenaryobj[0].grandtotal[0].noofperson}</td>
		             <td>{data.vehicledata.carbonval * itenaryobj[0].grandtotal[0].requirement[key].noofvehiclerequired}</td>
		             <td>{+data.accomodationdata.accomodation[0].carbonval * itenaryobj[0].grandtotal[0].requirement[key].noofroomrequired + +data.carbonfootprint * itenaryobj[0].grandtotal[0].noofperson + +data.vehicledata.carbonval * itenaryobj[0].grandtotal[0].requirement[key].noofvehiclerequired}</td>
	              </tr>
	              )
	 	}) 

	 :""}
	 <tr className="text-center">
	 	<th>GrandTotal: </th>
	 	<th>{totalcf.accomtotalcf}</th>
	 	<th>{totalcf.activitytotalcf}</th>
	 	<th>{totalcf.vehicletotalcf}</th>
	 	<th>{totalcf.total}</th>
	 </tr>
   </tbody>
</table>
</div>
</div>
</div>:""}
</div>
)

}

export default GetCalculationtable;




export const getActivityroadmap=(items,typeofiten)=>{
let textofitenaryfirstday = [{activityname:"Meet At Guwahati Railway Station / Airport / ISBT.",activitytime:"",activitystart:'',activityimage:''},{activityname:"Journey Starts with Enroute visit",activitytime:"3 Hours",activitystart:'yes',activityimage:''}];
let daybegin =[];
let dayend =[];
let lastday = [{activityname:"Drop At Guwahati Railway Station / Airport / ISBT.",activitytime:"",activitystart:'',activityimage:''}];
let daybegindes =["","",""];
let textdes = ["",""];
let dayenddes =[""];
let lastdaydes = [''];
let normalday =[];
let newarr = [];
let des = [];

let istrek = typeofiten && typeofiten ==='trek' ? true : false;  

items.length > 0 && items.map((data)=>{

if(data.tempObj.map((sd ,key)=>{

let accomodationtype = sd?.accomodationdata?.accomodation?.[0]?.locationtype ?? "";
let checkinathotel = sd?.checkintime ?? 0;
checkinathotel = +checkinathotel/3600;
checkinathotel = convertDecimalTo12HourFormat(checkinathotel);
if(istrek){
dayend = [];
}else{
dayend = [{activityname:`Check-in to ${accomodationtype} for overnight stay. `,activitytime:`${checkinathotel}`,activitystart:'',activityimage:''}];
}

if(sd.checkintime && sd.daywiseitenary !== "Day1" && sd.isonrootincluded !== true){

let checkoutfromhotel = sd.checkouttime / 3600;
checkoutfromhotel = convertDecimalTo12HourFormat(checkoutfromhotel);
daybegin = [{activityname:"Breakfast at property.",activitytime:"",activitystart:'',activityimage:''},{activityname:`Check out from the Property.`,activitytime : `${checkoutfromhotel}.`,activitystart:'',activityimage:''},{activityname:"Enroute visit.",activitytime:"",activitystart:'yes',activityimage:''}];
daybegindes =["","",""];
}


if(sd.hasOwnProperty('pickupData')){

if(sd.pickupData.pickuplocation !== ""){
textofitenaryfirstday = [{activityname:`Meet At ${sd.pickupData.pickuplocation}.`,activitytime:"",activitystart:'',activityimage:''},{activityname:"Journey starts with enroute visit",activitytime:`${sd.pickupData.durationtravel} Hours`,activitystart:'yes',activityimage:''}];


if(key === data.tempObj.length -1 && sd.daywiseitenary === `Day${data.tempObj.length}`){
lastday = [{activityname:`Drop At ${sd.pickupData.droplocation}`,activitytime:"",activitystart:'',activityimage:''}];	
}else{
lastday = [{activityname:`Drop At ${sd.pickupData.pickuplocation}`,activitytime:"",activitystart:'',activityimage:''}];		
}
}

}


let iten = sd.activitynames || [];
let actdes = sd.activitydescriptions || "";
let actimf = sd?.activityimage ?? null;

let dsdd = actimf ? actimf.map((sd)=>{
 return sd?.[0] ?? ''
}):[];	


let timed = sd.activityduration || [];
let newitentime = iten.map((ss,mm)=>{
  return ({activityname:ss,activitytime:timed[mm],activitystart:'',ischild:true,activityimage:dsdd[mm]});
})


if(sd.daywiseitenary === "Day1" && sd.isonrootincluded === true){
newitentime = [...textofitenaryfirstday,...newitentime,...dayend];
actdes = [...textdes,...actdes,...dayenddes];
}else if(sd.daywiseitenary === `Day${data.tempObj.length}` && sd.isonrootincluded === true){
newitentime = [...daybegin,...newitentime,...lastday];
actdes = [...daybegindes,...actdes,...lastdaydes];
}else if(sd.daywiseitenary === `Day${data.tempObj.length}` && sd.pickupData.droplocation && sd.pickupData.droplocation !==""){
newitentime = [...daybegin,...newitentime,...lastday];
actdes = [...daybegindes,...actdes,...lastdaydes];
}else{
newitentime = [...daybegin,...newitentime,...dayend];
actdes = [...daybegindes,...actdes,...dayenddes];
}

newarr = [...newarr,newitentime];
des = [...des,actdes]
}));


});

return [newarr , des];


}
function convertDecimalTo12HourFormat(decimalTime) {

    var hours = Math.floor(decimalTime);
    var minutes = Math.round((decimalTime - hours) * 60);

    var ampm = hours < 12 ? 'AM' : 'PM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    var hoursStr = hours < 10 ? '0' + hours : hours;
    var minutesStr = minutes < 10 ? '0' + minutes : minutes;

    return hoursStr + ':' + minutesStr + ' ' + ampm;
}



