const Addons=({name,addons})=>{

return (
	     <>
    {
     addons && addons.length > 0 && addons.some(addon=>addon.tag ==='activity' && addon.id !== "" && addon.price !=="") ?
      (
	   <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div
              className="print__content"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
            >
              <h4 className="mt-5">
                Personalize Your Stay with Extra Activities
              </h4>
              <p style={{ color: "var(--bs-body-color)" }}>
                Enrich your stay at <strong>{name}</strong> with curated
                activities that allow you to explore the location in depth. <br />
                <br />
                You can add these to your camping package on the booking screen.
              </p>
              <div className="flex justify-center">
                <table className="border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2">
                        Activity
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                   {
                   	 addons && addons.length > 0 && addons.map((addon,key)=>{
                     if(addon.tag === 'activity' && addon.id !== ""){
                         return (
                                     <tr key={key}>
                                       <td className="border border-gray-300 px-4 py-2">
                                         {addon.name && addon.name}
                                       </td>
                                       <td className="border border-gray-300 px-4 py-2">
                                        {`Rs. ${addon.price}/${addon.unit === 'perperson' ? 'person' : addon.unit}`}
                                       </td>
                                     </tr>

                                )
                     }  
                   })}
                                   
                  
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
       ):''}
       {
      addons && addons.length > 0 && addons.some(addon=>addon.tag ==='addon' && addon.id !== "" && addon.price !=="") ?
      (
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div
              className="print__content"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
            >
              <h4>Add-On Services</h4>
              <p style={{ color: "var(--bs-body-color)" }}>
                You can add these to your stay on the booking screen.
              </p>
              <div className="flex justify-center">
                <table className="border-collapse border border-gray-300">
                  <tbody>
                    {
                   	 addons && addons.length > 0 && addons.map((addon,key)=>{
                     if(addon.tag === 'addon'  && addon.id !== ""){
                         return (
                                     <tr key={key}>
                                       <td className="border border-gray-300 px-4 py-2">
                                         {addon.name && addon.name}
                                       </td>
                                       <td className="border border-gray-300 px-4 py-2">
                                        {`Rs. ${addon.price}/${addon.unit}`}
                                       </td>
                                     </tr>

                                )
                     }  
                   })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
     ):''}
	     </>
	   )

}
export default Addons;