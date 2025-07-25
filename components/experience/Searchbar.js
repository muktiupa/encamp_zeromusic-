import {useState,useEffect} from "react";
import { useRouter } from 'next/router'

const Searchbar=(props)=>{

const {AOS,searchData , setSearchData , filteredDatas , subfilter, setSubfilter , setSearchByState , setSearchByActivity,searchByState,searchByActivity,sortData,setSortData,searchByType,setSearchByType,datacsr,loadinitial} = props;
const router = useRouter();
const page = ["itinerary","locations","events"];
const typeofiten = ["group","private"];


useEffect(()=>{
if(router.query.destination && router.query.destination !==""){
setSearchByState(router.query.destination);
}
if(router.query.page && page.includes(router.query.page)){
    setSubfilter(router.query.page);
}
if(router.query.type && typeofiten.includes(router.query.type)){
    setSearchByType(router.query.type);
 }

},[router]);

const onChangeHandler=(e)=>{
setSearchData({...searchData,[e.target.name] : e.target.value})}


const states = [{label:'Assam',value:'Assam'},{label:'Meghalaya',value:'Meghalaya'},{label:'Nagaland',value:'Nagaland'},{label:'Arunachal Pradesh',value:'Arunachal Pradesh'},{label:'Mizoram',value:'Mizoram'},{label:'Manipur',value:'Manipur'},{label:'Sikkim',value:'Sikkim'},{label:'Bhutan',value:'Bhutan'},{label:'Nepal',value:'Nepal'}];

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();}, [AOS]);

const loadmanualsearch=(search,subfilter)=>{
if(search !==""){
datacsr(search,subfilter);
}else{

 loadinitial();    
} 
}

const onChangeurlHandlerState=(value)=>{
if(value === ""){
    let qq = router.query;
    if(qq.destination){
        delete qq.destination;
        router.push({
            pathname: '/experience',
            query: qq
          });
    }

}
else{
    router.push({
                 pathname: '/experience',
                 query: {
                    ...router.query,
                    destination:value
                  },

               });
}

}


const seturlbypage=(value)=>{
    if(value === ""){
        let qq = router.query;
        if(qq.page){
            delete qq.page;
            router.push({
                pathname: '/experience',
                query: qq
              });
        }    
    }
    else{
        router.push({
                     pathname: '/experience',
                     query: {
                        ...router.query,
                        page:value
                      },
    
                   });
    }
    
    }

const seturlbyTypex=(value)=>{
    setSearchByType(value);
}

return ( 
	    <>
	        <div className="row">
                    <div className="col-lg-12">
                        <div className="experience__topbar" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                            <div className="experience__title">
                                <h2>Encamp Experience</h2>
                            </div>
                                <div className="experience__topbar__wrap">
                                    
                                <div className="experience__state">
                                    <span><i className="fas fa-map-marker-alt"></i></span>
                                    <select className="form-select" aria-label="Default select example" value={searchByState}   onChange={(e)=>onChangeurlHandlerState(e.target.value)}>
                                        <option value="">All Destination</option>
                                        {states.map((state,key)=>{
                                            return ( 
                                                  <option key={key} value={state.value} >{state.label}</option>
                                                   )
                                        })}
                                        
                                    </select>
                                </div>
                                {subfilter === 'itinerary' ? <div className="experience__activity experience__state">
                                    <span><i className="fas fa-car"></i></span>
                                    <select style={{paddingLeft:'2rem'}} className="form-select" aria-label="Default select example" value={searchByType}   onChange={(e)=>seturlbyTypex(e.target.value)}>
                                        <option value="">All Trips</option>
                                        <option value="private">Private Trips</option>
                                        <option value="group">Group Trips</option>
                            
                                    </select>
                                </div> : ''}
                                    <div className="experience__search">
                                            <input type="text" placeholder="Type the name of a place or activity" id="search" name="search" onChange={(e)=>onChangeHandler(e)} value={searchData.search || ""}/>
                                            <button 
                                                 style={{position:'absolute',height:'inherit',right:'0',width:'40px',border:'none',top:'0px',borderRadius:'5px',backgroundColor:'#34cc9c'}}
                                                 onClick={()=>loadmanualsearch(searchData.search,subfilter)}
                                                 >
                                                 <span>
                                                  <i className="fas fa-search"></i>
                                                 </span>
                                                 </button>
                                    </div>
                             
                             
                            </div>
                        </div>
                    </div>
                </div>
            
             <div className="row">
                    <div className="col-lg-12">
                        <div className="experience__wrap">
                            <div className="experience__main__top">
                                <div className="experience__tab__btn" data-aos="zoom-in" data-aos-delay="50"
                                    data-aos-duration="1000">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className={(subfilter === 'itinerary') ? "nav-link active" : "nav-link"} id="home-tab" onClick={()=>seturlbypage('itinerary')}>Itineraries</button>
                                        </li>
                   
                                        <li className="nav-item" role="presentation">
                                            <button className={(subfilter === 'locations') ? "nav-link active" : "nav-link"} id="contact-tab2" onClick={()=>seturlbypage('locations')}>Accommodations</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className={(subfilter === 'events') ? "nav-link active" : "nav-link"} id="profile-tab" onClick={()=>seturlbypage('events')}>Events</button>
                                        </li>
                                    </ul>
                                </div>
                                <div className="experience__main__count">
                                    <span>{filteredDatas && filteredDatas.length} {subfilter === 'locations' ? 'Accommodations' : subfilter === 'events' ? 'Upcoming Events' : 'itineraries'} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

	    </>
	    )
}
export default Searchbar