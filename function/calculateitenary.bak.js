export const getCalculates=(tempObj,persons,commision,type,custom)=>{
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

tempObj.map((df)=>{
//get accomodation data
let acocf = df.accomodationdata.accomodation.map((rasa)=>{
return rasa.carbonval;

})

let accomodationcapacity = df.accomodationdata.defaultacapacity ? df.accomodationdata.defaultacapacity : 2;
let vehiclecapacity = df.vehicledata.defaultvehiclecapacity ? df.vehicledata.defaultvehiclecapacity : 3;
let defaultnoofpeople = (df.defaultnoofpeople && (Number(persons) > Number(df.defaultnoofpeople))) ? Number(persons) : Number(df.defaultnoofpeople);
noofperson=defaultnoofpeople; 

let noofroomrequired = +accomodationcapacity === 0 ? 0 : Math.ceil(+defaultnoofpeople/+accomodationcapacity);
let noofvehiclerequired = vehiclecapacity === 0 ? 0 : Math.ceil(defaultnoofpeople/vehiclecapacity);
requirement = [...requirement,{noofroomrequired,noofvehiclerequired}];
let acomprice = +df.accomodationdata.selectedroom.price * +noofroomrequired || 0;
let activityprice = +df.activityprice ? Number(+df.activityprice) *  +defaultnoofpeople : 0;
let totalfood = +df.totalfoodprice || 0;
let vehicleprice = +df.totalvehicleprice * +noofvehiclerequired || 0;
let vehicleprint = +df.vehicledata.carbonval * +noofvehiclerequired || 0;
accomtotal = +accomtotal + +acomprice;
activitytotal = +activitytotal + +activityprice;
vehicletotal=+vehicletotal + +vehicleprice;
foodtotal=foodtotal + totalfood;

accomtotalcf = +accomtotalcf + (+acocf * +noofroomrequired);
activitytotalcf = +activitytotalcf + (+df.carbonfootprint * +defaultnoofpeople);
vehicletotalcf=+vehicletotalcf + +vehicleprint;




gdays = df.noofdays;
gcf = +gcf + +df.carbonfootprint * +defaultnoofpeople  + (+acocf * +noofroomrequired) + +vehicleprint;
gat = +gat + +df.activitytiming;
gprice = +gprice + +activityprice + +acomprice + +totalfood  + +vehicleprice;
gpricecf = +gpricecf + +df.carbonfootprint * +defaultnoofpeople + +acocf * +noofroomrequired + vehicleprint;

});

if(custom && custom !=="" && custom > 0){
	gprice = +custom;
}
if(type && type === 'group'){
	gprice = +(gprice/noofperson) * +persons;
}

subtotal = {...subtotal,accomtotal,activitytotal,vehicletotal,foodtotal,total:gprice};
subtotalcf = {...subtotalcf,accomtotalcf,activitytotalcf,vehicletotalcf,total:gpricecf};

gprice = gprice + gprice * tcomission/100;
let carboncarge = Math.floor(gprice * 2.5/100);
let taxat5percent = Math.floor((gprice + carboncarge) * 5/100);
let gtotal = +gprice + +carboncarge + +taxat5percent;
gtotal = Math.floor(gtotal);

//console.log([gdays,gcf,gat.toFixed(2),gtotal,requirement,noofperson,subtotal,subtotalcf,{subtotal:gprice,cfcharge:carboncarge,tax:taxat5percent}])

return [gdays,gcf,gat.toFixed(2),gtotal,requirement,noofperson,subtotal,subtotalcf,{subtotal:gprice,cfcharge:carboncarge,tax:taxat5percent}];

}