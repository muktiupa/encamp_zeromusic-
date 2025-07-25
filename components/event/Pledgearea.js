const Pledgearea=({pledge , AOS})=>{

return (
	 <>
	 {pledge && pledge !== "" ? 
	   <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div
              className="print__content"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
            >
              <h4>A Pledge to sustain</h4>
              <div className="container px-1" dangerouslySetInnerHTML={{ __html: pledge ? pledge :'' }}>
                   
              </div>
            </div>
          </div>
        </div>
       </div>
       : ''}
       </>
	   )

}
export default Pledgearea;