export const getCalculates=(tempObj,persons,commision,type,custom,addonprice)=>{


let gdays=0; let gcf=0; let gat=0; let gprice=0; let gpricecf=0;
let requirement = [];
let noofperson = 0;
let subtotal = {accomtotal:0,activitytotal:0,vehicletotal:0,foodtotal:0,total:0};
let accomtotal = 0;
let activitytotal=0;
let vehicletotal=0;
let foodtotal=0;
let total=0;
let tcomission = commision ? commision : 30;

let subtotalcf = {accomtotalcf:0,activitytotalcf:0,vehicletotalcf:0,totalcf:0};
let accomtotalcf = 0;
let activitytotalcf=0;
let vehicletotalcf=0;
let totalcf=0;

tempObj && tempObj.length > 0 && tempObj.map((df)=>{

let acocf = df && df.accomodationdata && df.accomodationdata.accomodation && df.accomodationdata.accomodation.map((rasa)=>{
return rasa?.carbonval ?? 0;

})

if(isNaN(acocf)){
 acocf = 1; 
}

let accomodationcapacity = df?.accomodationdata?.defaultacapacity ?? df?.accomodationdata?.selectedroom?.capacity ?? 2;
let vehiclecapacity = df?.vehicledata?.defaultvehiclecapacity ?? null;
if(!vehiclecapacity){
 vehiclecapacity = df?.defaultvehiclecapacity ?? 3; 
}


let defaultnoofpeople = 0;
if(df.noofperson && df.noofperson !==""){
defaultnoofpeople = (df.noofperson && (Number(persons) > Number(df.noofperson))) ? Number(persons) : Number(df.noofperson);	
}else{
defaultnoofpeople = (df.defaultnoofpeople && (Number(persons) > Number(df.defaultnoofpeople))) ? Number(persons) : Number(df.defaultnoofpeople);	
}
noofperson=defaultnoofpeople ? defaultnoofpeople : 1; 

let noofroomrequired = accomodationcapacity === 0 ? 0 : Math.ceil(defaultnoofpeople/accomodationcapacity);

let noofvehiclerequired = vehiclecapacity === 0 ? 0 : Math.ceil(defaultnoofpeople/vehiclecapacity);

requirement = [...requirement,{noofroomrequired,noofvehiclerequired}];
let acomprice = (+df?.accomodationdata?.selectedroom?.price ?? 0) * (+noofroomrequired || 0);


let activityprice = +df.activityprice ? Number(+df.activityprice) *  +defaultnoofpeople : 0;


let totalfood = +df.totalfoodprice || 0;
totalfood = 0;
let vehicleprice = (df?.totalvehicleprice ?? 0) * noofvehiclerequired || 0;
let vehicleprint = (df?.vehicledata?.carbonval ?? 1) * noofvehiclerequired || 0;
if(isNaN(acomprice)){
 acomprice = 0;
}

accomtotal = +accomtotal + +acomprice;


activitytotal = +activitytotal + +activityprice;
vehicletotal=+vehicletotal + +vehicleprice;
foodtotal=foodtotal + totalfood;
foodtotal = 0;
accomtotalcf = +accomtotalcf + (+acocf * +noofroomrequired);
activitytotalcf = +activitytotalcf + (+df.carbonfootprint * +defaultnoofpeople);
vehicletotalcf=+vehicletotalcf + +vehicleprint;



if(isNaN(activitytotal)){
  activitytotal = 0;
}
if(isNaN(vehicleprint)){
  vehicleprint = 0;
}

gdays = df.noofdays;
gcf = gcf + (df?.carbonfootprint ?? 1) * defaultnoofpeople  + (+acocf * +noofroomrequired) + vehicleprint;
gat = gat + (df?.activitytiming ?? 1);
gprice = gprice + activityprice + acomprice + totalfood  + vehicleprice;

gpricecf = gpricecf + (df?.carbonfootprint ?? 1) * defaultnoofpeople + +acocf * +noofroomrequired + vehicleprint;

});



subtotal = {...subtotal,accomtotal,activitytotal,vehicletotal,foodtotal,total:gprice};
subtotalcf = {...subtotalcf,accomtotalcf,activitytotalcf,vehicletotalcf,total:gpricecf};
//gprice = gprice;
if(addonprice){
 gprice = +addonprice + +gprice;
}
gprice =(gprice * tcomission/100) + gprice;

let carboncarge = gprice * 2.5/100;
let taxat5percent = (gprice + carboncarge) * 5/100;
let gtotal = +gprice + +carboncarge + +taxat5percent;
gtotal = Math.floor(gtotal) + 1;
if(type && type === 'group'){
 gtotal = custom * +persons;
 gprice = Math.ceil(+gtotal / 1.05);
 taxat5percent = gtotal-gprice;
 carboncarge = gprice * 0.025;
}

if(!isNaN(gat)){
gat = Math.floor(gat);
}else{
  gat = 0;
}

return [gdays,gcf,gat,gtotal,requirement,noofperson,subtotal,subtotalcf,{subtotal:gprice,cfcharge:carboncarge,tax:taxat5percent}];

}