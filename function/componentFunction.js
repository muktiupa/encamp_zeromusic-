const arrLimiter=(data,start,limit)=>{
let length = data.length + 1;
let lastcell = limit + start +1;
let limiteddata = [];
data.map((obj,index)=>{

if((index+1 >= start ) && (index + 1) <= limit + start -1){

	limiteddata.push(obj);
	
}


})
return [limiteddata , lastcell , length];

}

const getDatabyid=(id , data)=>{
let filtereddata = data.filter((obj)=>obj.id === id);
let objs = filtereddata[0];
let type = objs.id.includes('AC') ? 'Activity' : objs.id.includes('A5') ? 'Activity' : objs.id.includes('MGH') ? 'Accomodation':"Accomodation";
return [type , objs];
}
function filterAndSortTrips(trips) {
  // Get today's date
  const today = new Date();

  // Calculate the date 6 months from today
  const sixMonthsFromToday = new Date();
  sixMonthsFromToday.setMonth(today.getMonth() + 12);

  // Filter trips that are between today and 6 months from today
  const filteredTrips = trips.filter((trip) => {
    const startDate = new Date(trip.startdate);
    return startDate >= today && startDate <= sixMonthsFromToday;
  });

  // Sort filtered trips based on nearest date to today
  filteredTrips.sort((a, b) => {
    const dateA = new Date(a.startdate);
    const dateB = new Date(b.startdate);
    return Math.abs(dateA - today) - Math.abs(dateB - today);
  });

  return filteredTrips;
}

export {arrLimiter,getDatabyid,filterAndSortTrips}