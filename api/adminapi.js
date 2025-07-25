import axios from "axios";
export default axios.create({
	baseURL:process.env.NEXT_PUBLIC_APIURL,
      headers: {
            'Accept-Encoding': 'compress',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_WEBSITE}`,
             }
             
})
