import adminapi from "../api/adminapi";
const statedata={
    "AR":"Arunachal Pradesh",
    "AS":"Assam",
    "MN":"Manipur",
    "ML":"Meghalaya",
    "MZ":"Mizoram",
    "NL":"Nagaland",
    "SK":"Sikkim",
    "bhutan":"Bhutan",
    "nepal":"Nepal"
}
const optionskeys = Object.entries(statedata).map((data , key)=>data[0]);
const optionsvalues = Object.entries(statedata).map((data , key)=>data[1]);
export const stateoptions=optionskeys.map((dd , key)=>{return {value:dd,label:optionsvalues[key]}});
//get constant data
export const getConstantinclusions = async ()=>{
let output = [];
try{
 const response = await adminapi.get("/constants");
 if(response.data.length > 0){
response.data.map((data)=>{

output = [...output ,{value:(data.inclusions).toString(),label:(data.inclusions).toString()} ];

});
return output;
 }   
}catch(e){
    console.log(e);
}


}
export const getConstantexclusions = async (data)=>{
let output = [];
try{
 const response = await adminapi.get("/constants");
 if(response.data.length > 0){
response.data.map((data)=>{

output = [...output ,{value:(data.exclusions).toString(),label:(data.exclusions).toString()} ];

});
return output;
 }   
}catch(e){
    console.log(e);
}


}






export const optionsm=[
               {value:"january", label:"January"},
               {value:"february", label:"February"},
               {value:"march", label:"March"},
               {value:"april", label:"April"},
               {value:"may", label:"May"},
               {value:"june", label:"June"},
               {value:"july", label:"July"},
               {value:"aug", label:"August"},
               {value:"september", label:"September"},
               {value:"october", label:"October"},
               {value:"november", label:"November"},
               {value:"december", label:"December"},
               ]
export const optexclusions=[
               {value:"january", label:"January"},
               {value:"february", label:"February"},
               {value:"march", label:"March"},
               {value:"april", label:"April"},
               {value:"may", label:"May"},
               {value:"june", label:"June"},
               {value:"july", label:"July"},
               {value:"aug", label:"August"},
               {value:"september", label:"September"},
               {value:"october", label:"October"},
               {value:"november", label:"November"},
               {value:"december", label:"December"},
               ]
export const optinclusions=[
               {value:"january", label:"January"},
               {value:"february", label:"February"},
               {value:"march", label:"March"},
               {value:"april", label:"April"},
               {value:"may", label:"May"},
               {value:"june", label:"June"},
               {value:"july", label:"July"},
               {value:"aug", label:"August"},
               {value:"september", label:"September"},
               {value:"october", label:"October"},
               {value:"november", label:"November"},
               {value:"december", label:"December"},
               ]


export default statedata