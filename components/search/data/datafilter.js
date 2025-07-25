const DataFilter=(rawdata)=>{
let newobj = [];

if(rawdata.length > 0){

rawdata.map((acc)=>{

if(acc.hasOwnProperty('availability') && acc.availability === 1){
newobj = [...newobj,acc];

}

if(acc.hasOwnProperty('itineraryindex') && acc.itineraryindex[0].position === 'published'){
newobj = [...newobj,acc];
}


});

newobj.map((as)=>{
	as.hasOwnProperty('tempObj') && as.tempObj.map((bs)=>{
		bs.vehicledata = "";
	})
})



return newobj;
}
}
export {DataFilter}