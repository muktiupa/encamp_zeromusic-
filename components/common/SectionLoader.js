import { Skeleton } from 'react-skeleton-screen';
import 'react-skeleton-screen/build/skeleton.css';

const SectionLoader=()=>{

return (
            <div className="row" style={{width:'100%'}}>
              <div className="col-6 col-sm-6 col-md-4 col-lg-3">
              <Skeleton width="98%" height= '10rem' marginLeft="2%" marginTop='10%' />
            </div>
             <div className="col-6 col-sm-6 col-md-4 col-lg-3">
              <Skeleton width="98%" height= '10rem' marginLeft="2%" marginTop='10%' />
            </div>
             <div className="col-6 col-sm-6 col-md-4 col-lg-3">
              <Skeleton width="98%" height= '10rem' marginLeft="2%" marginTop='10%' />
            </div>
             <div className="col-6 col-sm-6 col-md-4 col-lg-3">
              <Skeleton width="98%" height= '10rem' marginLeft="2%" marginTop='10%' />
            </div>
         </div>
	    )

}
export default SectionLoader;