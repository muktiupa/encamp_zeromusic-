import adminapi from "../../api/adminapi";
const foodDetails = {
  breakfast: 0,
  lunch: 0,
  dinner: 0,
}

export const apicall = async (endpoint, value) => {
  let res = await adminapi.get(`/${endpoint}/${value}`);
  if (res.data) {
    return res.data;
  }
};
const getactivitytotal = async (activities) => {
  let res = await adminapi.get(`/getactivities?id=${activities.toString()}`);
  let activityprice = 0;
  let carbonfootprint = 0;
  let activitytiming = 0;
  if (res.data && res.data.length > 0) {
    res.data.map((activity) => {
      activityprice = +activityprice + +activity.price;
      carbonfootprint = +carbonfootprint + +activity.carbonval;
      activitytiming = +activitytiming + (+activity.duration / 60);
    })
  }
  return { activityprice: activityprice, carbonfootprint: carbonfootprint }
}
const getvehicledata = async (vehicleid) => {
  if (vehicleid !== "") {
    let res = await adminapi.get(`/vehicle/${vehicleid}`);
    if (res.data && res.data.length > 0) {
      return res.data[0];
    }
  }
}
export const getCalculates = (tempObj, type, custom, commision) => {
  let gdays = 0; let gcf = 0; let gat = 0; let gprice = 0; let gpricecf = 0;
  let requirement = [];
  let noofperson = 0;
  let subtotal = { accomtotal: 0, activitytotal: 0, vehicletotal: 0, foodtotal: 0, total: 0 };
  let accomtotal = 0;
  let activitytotal = 0;
  let vehicletotal = 0;
  let foodtotal = 0;
  let total = 0;
  let tcomission = commision ? commision : 30;

  let subtotalcf = { accomtotalcf: 0, activitytotalcf: 0, vehicletotalcf: 0, totalcf: 0 };
  let accomtotalcf = 0;
  let activitytotalcf = 0;
  let vehicletotalcf = 0;
  let totalcf = 0;

  tempObj.map((df) => {
    //get accomodation data
    let acocf = df.accomodationdata && df.accomodationdata.accomodation && df.accomodationdata.accomodation.map((rasa) => {
      return rasa.carbonval;

    })

    let accomodationcapacity = df.accomodationdata.defaultacapacity && df.accomodationdata.defaultacapacity ? df.accomodationdata.defaultacapacity : 2;

    let vehiclecapacity = df?.vehicledata?.defaultvehiclecapacity ?? null;
    if (!vehiclecapacity) {
      vehiclecapacity = df?.defaultvehiclecapacity ?? 3;
    }


    let defaultnoofpeople = df.defaultnoofpeople ? df.defaultnoofpeople : 1;
    if (df.noofperson) {
      noofperson = df?.noofperson ?? 1;
    } else {
      noofperson = defaultnoofpeople;
    }


    let noofroomrequired = accomodationcapacity === 0 ? 0 : Math.ceil(defaultnoofpeople / accomodationcapacity);
    let noofvehiclerequired = vehiclecapacity === 0 ? 0 : Math.ceil(defaultnoofpeople / vehiclecapacity);
    requirement = [...requirement, { noofroomrequired, noofvehiclerequired }];
    let acomprice = df?.accomodationdata?.selectedroom?.price !== undefined ? df.accomodationdata.selectedroom.price * +noofroomrequired : 0;
    let activityprice = df.activityprice ? Number(df.activityprice) * defaultnoofpeople : 0;

    let totalfood = df?.totalfoodprice !== undefined ? df.totalfoodprice : 0;
    totalfood = totalfood * defaultnoofpeople;
    let vehicleprice = (df?.totalvehicleprice ?? 0) * noofvehiclerequired || 0;
    let vehicleprint = (df?.vehicledata?.carbonval ?? 1) * noofvehiclerequired || 0;

    accomtotal = accomtotal + acomprice;
    activitytotal = activitytotal + activityprice;
    vehicletotal = vehicletotal + vehicleprice;
    foodtotal = foodtotal + totalfood;

    accomtotalcf = accomtotalcf + (+acocf * +noofroomrequired);
    activitytotalcf = activitytotalcf + (df.carbonfootprint * defaultnoofpeople);
    vehicletotalcf = vehicletotalcf + vehicleprint;

    if (isNaN(activitytotal)) {
      activitytotal = 0;
    }


    gdays = df.noofdays;
    gcf = gcf + df.carbonfootprint * defaultnoofpeople + (+acocf * +noofroomrequired) + vehicleprint;
    gat = gat + df.activitytiming;
    gprice = gprice + activityprice + acomprice + totalfood + vehicleprice;
    gpricecf = gpricecf + df.carbonfootprint * defaultnoofpeople + +acocf * +noofroomrequired + vehicleprint;

  });


  subtotal = { ...subtotal, accomtotal, activitytotal, vehicletotal, foodtotal, total: gprice };
  subtotalcf = { ...subtotalcf, accomtotalcf, activitytotalcf, vehicletotalcf, total: gpricecf };

  gprice = Math.floor((gprice * tcomission / 100) + gprice);

  /*if(custom && custom !=="" && +custom > 0){
    gprice = +custom;
  }*/


  if (type && type === 'group') {
    gprice = +custom;
  }

  if (!isNaN(gat)) {
    gat = Math.floor(gat);
  } else {
    gat = 0;
  }

  return [gdays, gcf, gat, gprice, requirement, noofperson, subtotal, subtotalcf];
}
export const setterTemobj = async (tempObj, daywiseotherdetail, dayoption, commondetails) => {
  if (commondetails) {
    if (!Array.isArray(tempObj)) {
      tempObj = []; // Initialize tempObj as an array if it's not already
    }
    await Promise.all(
      tempObj && tempObj.map(async (tem) => {
        tem['noofperson'] = commondetails.noofperson || 2;
        tem['selectedRange'] = commondetails.groupdate ?? "";
        if (!tem['pickupData']) {
          tem['pickupData'] = {};
        }
        tem['pickupData']['droplocation'] = commondetails.droppoint && commondetails.droppoint.place ? commondetails.droppoint.place : "";
        tem['pickupData']['pickuplocation'] = commondetails.pickuppoint && commondetails.pickuppoint.place ? commondetails.pickuppoint.place : "";

        if (!tem['pickupDatalatlong']) {
          tem['pickupDatalatlong'] = {};
        }
        let splitingcord = commondetails.pickuppoint && commondetails.pickuppoint.latlong ? commondetails.pickuppoint.latlong.split(",") : [];
        tem['pickupDatalatlong']['center'] = splitingcord.length > 0 ? { lat: splitingcord[0], lng: splitingcord[1] } : { lat: '', lng: '' };
        let splitingcord2 = commondetails.droppoint && commondetails.droppoint.latlong ? commondetails.droppoint.latlong.split(",") : [];
        tem['pickupDatalatlong']['drop'] = splitingcord2.length > 0 ? { lat: splitingcord2[0], lng: splitingcord2[1] } : { lat: '', lng: '' };
        if (!tem['accomodationdata']) {
          tem['accomodationdata'] = { aid: "no-accomodation", defaultacapacity: 2, accomodation: [] };
        }
        tem['accomodationdata']['defaultacapacity'] = commondetails.noofperson || 2;

        if (commondetails['vehicleid'] && commondetails['vehicleid'] !== "") {
          let vehicledata = await getvehicledata(commondetails['vehicleid']);
          tem['vehicledata'] = vehicledata;
          tem['totalvehicleprice'] = vehicledata.cost && vehicledata.cost.length > 0 ? vehicledata.cost[0] : 0;

        } else {
          tem['totalvehicleprice'] = 0;
        }


      })
    )
  }

  if (daywiseotherdetail && daywiseotherdetail.length > 0) {
    await Promise.all(
      daywiseotherdetail.map(async (daywise, day) => {
        if (tempObj[day]) {
          if (!tempObj[day]['accomodationdata']) {
            tempObj[day]['accomodationdata'] = { aid: "no-accomodation", defaultacapacity: 2, accomodation: [], selectedroom: { price: 0, selectedroom: '' } };
          }
          tempObj[day]['accomodationdata']['aid'] = daywise.aid || '';
          if (daywise.aid && daywise.aid !== "") {
            tempObj[day]['accomodationdata']['accomodation'] = await apicall("location", daywise.aid);
            if (daywise.selectedroom && daywise.selectedroom !== "") {

              let roomdata = typeof daywise.selectedroom === "string" && daywise.selectedroom.includes("-") ? daywise.selectedroom.split("-") : null;

              if (roomdata && roomdata.length > 0) {
                let roomdetails = { price: roomdata[1], roomtype: roomdata[0], capacity: roomdata[2] }
                tempObj[day]['accomodationdata']['selectedroom'] = roomdetails;
              } else {
                if (daywise.selectedroom && daywise.selectedroom.selectedroom) {
                  tempObj[day]['accomodationdata']['selectedroom'] = { price: daywise.selectedroom.price, roomtype: daywise.selectedroom.selectedroom }
                } else {
                  tempObj[day]['accomodationdata']['selectedroom'] = {}
                }
              }
            }
          }
          let totalfoodprice = 0;
          tempObj[day]['foodData'] = daywise.foodselection || [];
          if (daywise.foodselection && daywise.foodselection.length > 0) {
            let foodarr = daywise.foodselection;
            foodarr.map((food) => {
              if (foodDetails.hasOwnProperty(food)) {
                totalfoodprice += +foodDetails[food];

              }
            })
            tempObj[day]['totalfoodprice'] = totalfoodprice;
          } else {
            tempObj[day]['totalfoodprice'] = 0;

          }
          tempObj[day]['noofdays'] = day + 1;
          if (daywise.foodselection && daywise.foodselection.length > 0) {
            tempObj[day]['isfoodincluded'] = true;
          } else {
            tempObj[day]['isfoodincluded'] = false;
          }
          if (day === 0 || day === tempObj.length - 1) {
            tempObj[day]['isonrootincluded'] = true;
          } else {
            tempObj[day]['isonrootincluded'] = false;
          }
          tempObj[day]['checkouttime'] = daywise.pickuptime ? converttosecond(daywise.pickuptime) : '00:00';
          tempObj[day]['checkintime'] = converttosecond('17:30');
        }
      })
    );
  }

  if (dayoption && dayoption.length > 0) {
    await Promise.all(
      dayoption.map(async (dayx, day) => {
        if (!tempObj[day]) {
          tempObj[day] = {};
        }

        tempObj[day]['location'] = dayx && dayx.map((loc) => loc.location);
        tempObj[day]['activitydata'] = dayx && dayx.length > 0 && dayx.map((loc) => loc.activity && loc.activity.length > 0 ? loc.activity.map((act) => act.activityname) : []).flat();
        let activitylists = tempObj[day]['activitydata'];
        if (activitylists && activitylists.length > 0) {
          let allactivitytotal = await getactivitytotal(activitylists);
          if (allactivitytotal) {
            tempObj[day]['activityprice'] = allactivitytotal.activityprice;
            tempObj[day]['carbonfootprint'] = allactivitytotal.carbonfootprint;
            tempObj[day]['activitytiming'] = allactivitytotal.activitytiming;
          }

        }

        tempObj[day]['activityduration'] = dayx && dayx.length > 0 && dayx.map((loc) => loc.activity && loc.activity.length > 0 ? loc.activity.map((act) => act.duration) : []).flat();
        let total = tempObj[day]['activityduration'].reduce((acc, val) => {
          let duration = parseFloat(val);
          if (!isNaN(duration)) {
            acc += duration;
          }
          return acc;
        }, 0);
        tempObj[day]['activitytiming'] = total;
      }));
  }



  return tempObj;
};
export const getterTemobj = (itinearyObj) => {
  let maindata = {};
  if (itinearyObj && itinearyObj.length > 0) {
    maindata = itinearyObj[0];
  } else {
    maindata = itinearyObj
  }
  let tempObj = itinearyObj.tempObj ? itinearyObj.tempObj : [];
  let commondetails = itinearyObj.itineraryindex && itinearyObj.itineraryindex.length > 0 ? itinearyObj.itineraryindex[0].commondetails : {};
  let dayoption = itinearyObj.itineraryindex && itinearyObj.itineraryindex.length > 0 ? itinearyObj.itineraryindex[0].dayoption : {};
  let daywiseotherdetail = itinearyObj.itineraryindex && itinearyObj.itineraryindex.length > 0 ? itinearyObj.itineraryindex[0].daywiseotherdetail : {};

  let output = { tempObj: tempObj, commondetails: commondetails, dayoption: dayoption, daywiseotherdetail: daywiseotherdetail }
  return output;
}
const converttosecond = (input) => {
  // Split the string into hours and minutes
  const [hours, minutes] = input.split(':');

  // Convert hours and minutes to seconds
  const seconds = (parseInt(hours) * 60 + parseInt(minutes)) * 60;
  return seconds;
}
function convertNumberToTime(value) {
  if (value && value !== '') {
    var decimalValue = value / 3600;
    var hours = Math.floor(decimalValue);
    var minutes = Math.round((decimalValue % 1) * 60);

    // Format the hours and minutes with leading zeros if necessary
    var formattedHours = String(hours).padStart(2, '0');
    var formattedMinutes = String(minutes).padStart(2, '0');

    // Combine the hours and minutes with a colon separator
    var time = formattedHours + ':' + formattedMinutes;

    return time;
  } else {
    return '0:00';
  }
}
