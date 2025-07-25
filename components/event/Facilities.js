import Image from "next/image";

const Facilities=({facilities , AOS})=>{
 const styles = {
    circle: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      margin: "0 auto",
      cursor: "pointer",
      cursor: "pointer",
      padding: "3px",
    },
  };

return (
	  <>
	  {
	   facilities && facilities.length > 0 ?

	   <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div
              className="print__content"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
            >
              <h4>Facilities</h4>
              <div className="container" style={{ width: "100%" }}>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {facilities.map((faci,key)=>{
                        return (
                                 <div key={key} className="text-center simulate">

                                       <div style={styles.circle}>
                                            <Image
                                              alt={faci}
                                              src={`/assets/facilities/${faci}.png`}
                                              layout="responsive"
                                              width={80}
                                              height={80}
                                            />
                                       </div>
                                        <div>
                                          <div className="my-3 text-xs">{faci.replace(/_/g, ' ')}</div>
                                        </div>
                                 </div>
                               )
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> : ''
      }
      </>
	   )

}
export default Facilities;