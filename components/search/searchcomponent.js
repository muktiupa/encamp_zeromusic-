const SearchComponent=(props)=>{
const {searchData , setSearchData , filteredDatas , gotoDynamicpage , moredata ,loadMore} = props;

const [lastcell,length] = moredata;

const onChangeHandler=(e)=>{
setSearchData({...searchData,[e.target.name] : e.target.value})

}

return (
	<div className="container py-5 px-2">
	<div className="flex flex-col justify-center items-center">
	<div className="w-full flex md:w-1/5"></div>
     <div className="w-full flex justify-center flex-col md:w-3/5 px-3">
     <input type="search" onChange={(e)=>onChangeHandler(e)} className="bg-gray-100 h-12 text-center text-xl w-full rounded-xl" id="search" placeholder="Search anything.." name="search" autocomplete="off"/>
      {(filteredDatas && filteredDatas .length > 0) ? 
      	<div className="bg-gray-200 my-1 w-full  justify-self-center border-2 border-y-white py-2 px-3 font-medium  cursor-pointer">
            {filteredDatas.map((data,key)=> {
            	return (
            		<div onClick={()=>gotoDynamicpage(data.id || "" , filteredDatas)} className="bg-gray-200 px-3 py-1 text-grey-100 hover:bg-gray-500 text-grey-200" key ={key}>
                      {data.name || ""}
                      <div className="text-gray-400 float-right font-thin">{data.id.includes('AC') ? 'Activity' : data.id.includes('A5') ? 'Activity' : data.id.includes('MGH') ? 'Accomodation':"Accomodation"}</div>
            		</div>
            		)
            })}
        {(length >= lastcell)?<div onClick={()=>loadMore()} className="bg-gray-200 px-3 py-1 text-grey-100 hover:bg-gray-500 text-grey-200 text-center">Load more</div>:""}
      </div> : ""}
     </div>
	<div className="w-full flex md:w-1/5"></div>
	</div>
	</div>
	)


}
export default SearchComponent;