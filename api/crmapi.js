import axios from "axios";
export default axios.create({
	//baseURL:"https://fakestoreapi.com",
	baseURL:'https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Capture?accessKey=u$r51fe755ecf61345f7e8284aca50f7763&secretKey=319292c4129f433f5354e9199b31eeae2f3a750d',
      headers: {
            'Content-Type': 'application/json',

}
})

