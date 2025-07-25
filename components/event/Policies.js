const Policies=({policies , AOS})=>{


return (
	<>
	{policies && policies !== "" ? 
	   <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div
              className="print__content"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
            >
              <h4>Cancellation Policy</h4>
              <div className="container px-1" dangerouslySetInnerHTML={{ __html: policies ? policies :'' }}>
                   
              </div>
            </div>
          </div>
        </div>
      </div>
       : ''}
       </>
	   )

}
export default Policies;