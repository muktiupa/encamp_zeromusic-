import ProgressBar from 'react-bootstrap/ProgressBar';

const Progressbarz=(props)=>{
const {travellers,alreadybooked} = props;
const now = 20;
let slots = travellers ? travellers - alreadybooked : '';

return (
	    <>
	    <div className="mb-3 mt-4" style={{fontWeight: '600',fontSize:'0.8rem'}}>Booking Status: {slots} / {travellers} slots available </div>
        <ProgressBar now={now} label={`${now}%`} variant="success" />
        </>
        )

}
export default Progressbarz;