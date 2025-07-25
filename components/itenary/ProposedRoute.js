import{useState,useEffect} from "react";
import {useJsApiLoader, DirectionsRenderer,GoogleMap,Marker,dropDatalatlong} from "@react-google-maps/api";


const ProposedRoute=(props)=>{
const {AOS,base_url,activitydata,totalkm,setTotalkm,pickupDatalatlong} = props;
const center = !pickupDatalatlong ?  {lat:26.1792,lng:91.7533}:pickupDatalatlong.center.lat === "" ? {lat:26.1792,lng:91.7533} : pickupDatalatlong.center;
const drop = dropDatalatlong && dropDatalatlong !== "" ? dropDatalatlong.hasOwnProperty('drop') ? dropDatalatlong.drop : center : center;

const {isLoaded} = useJsApiLoader({
     googleMapsApiKey: 'AIzaSyBQ30om3jdY1f1X7knxn9by6eg9-2Uuv7w',
    libraries:['places','geometry'],
    version:'weekly'
});
 const [directions, setDirections] = useState(null);
const [error, setError] = useState(null);


useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();


  }, [AOS]);
useEffect(()=>{
  const routedatax = [];
  const waypoints = [];


if(activitydata.length > 0){
  activitydata.map((p)=>{
if(p.latlong !== ""){
waypoints = [...waypoints,{
      location: { lat: p.latlong !== "" ? Number(p.latlong.split(',')[0]):"", lng: p.latlong !== "" ? Number(p.latlong.split(',')[1]):"" },
      stopover: true
    }]
routedatax = [...routedatax,{ lat: p.latlong !== "" ? Number(p.latlong.split(',')[0]):"", lng: p.latlong !== "" ? Number(p.latlong.split(',')[1]):"" }];
}
  });

//both point is platan bazar
 const startingpoint = center;
 const endpoint = drop;
 if(startingpoint.lat !==""){
 routedatax = [startingpoint,...routedatax]; 
}
if(endpoint.lat !==""){
 routedatax = [...routedatax,endpoint]; 
}

//total distance and time calculation
const sumtotaldistance = 0;
const sumtotaltime = 0;
isLoaded && routedatax.map((singlepoint , key)=>{
//
if(key + 1 !== routedatax.length){
  sumtotaldistance += google.maps.geometry.spherical.computeDistanceBetween(singlepoint,routedatax[key + 1]);
//console.log(`Between (lat:${singlepoint.lat},lng:${singlepoint.lng}) and (lat:${routedatax[key + 1].lat},lng:${routedatax[key + 1].lng}): ${google.maps.geometry.spherical.computeDistanceBetween(singlepoint,routedatax[key + 1])}`);
}
});

setTotalkm(sumtotaldistance);
const directionsService = new google.maps.DirectionsService({suppressMarkers: true});
directionsService.route(
      {
        origin: center,  //hardcoded as platanbazar
        destination: (drop.lat === "") ? center : drop,//hardcoded as platanbazar
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: waypoints
      }, (result, status) => {
      
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          setError(result);
        }
      }
      )

}
},[activitydata])
 
return (
	    <section className="route__area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="itinerary__title__main" data-aos="fade-up" data-aos-delay="50"
                            data-aos-duration="1000">
                            <h2>Proposed route</h2>
                            <div className="itinerary__line__blk"></div>
                        </div>
                        <div className="route__map">
                         {isLoaded ? <GoogleMap 
                                         center={center}
                                          zoom={8}
                                          mapContainerStyle={{width: '100%',height: '60vh'}}
                                          options={{
                                                    zoomControl:false,
                                                    strretViewControl:false,
                                                    mapTypeControl:false,
                                                  }}>
                                         {directions && <DirectionsRenderer directions={directions} />}
                                    </GoogleMap>:""}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )

}
export default ProposedRoute;