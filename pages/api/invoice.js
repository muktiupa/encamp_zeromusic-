const fs = require('fs');
const puppeteer = require('puppeteer');



export default async function handler(req, res) {

  if (req.method === "POST") {
 const {order_id,payment_id,contact,email,checkindate,amount,nameofproduct,ordertotal,isadvance,name,iten,nooftravellers,invoicedate,subtotal,cf,gst,addontotal,addons,total,rate,tripindays,selectedaddondata,producttotal} = req.body;

let gstsetting = req.body.gstsetting ? req.body.gstsetting : 'exclusive';
let othercharges = req.body.othercharges ? req.body.othercharges : '';
let cfcharges = req.body.cfcharges ? req.body.cfcharges : true;
let selectedaddonstring = selectedaddondata && selectedaddondata.length > 0 
  ? selectedaddondata.map(addon => `${addon.name}(${addon.id}) Price: ${addon.price}`).join(", ")
  : '';


if(order_id && payment_id){
const baseurl = process.env.BASEURL;
 const browser = await puppeteer.launch({
	headless: true,
	args:[
		  '--no-sandbox',
		  '--disable-setuid-sandbox',
		  '--font-render-hinting=none',
		 ],
})
const page = await browser.newPage()
const pages = await browser.pages();
if (pages.length > 1) {
    await pages[0].close();
} 

if(iten){
	 await page.goto(`${baseurl}/invoicetemplate?iten=${iten}&order_id=${order_id}&payment_id=${payment_id}&contact=${contact}&email=${email}&checkindate=${checkindate}&amount=${amount}&nameofproduct=${nameofproduct}&ordertotal=${ordertotal}&isadvance=${isadvance}&name=${name}&travellers=${nooftravellers}&invoicedate=${invoicedate}&subtotal=${subtotal}&gst=${gst}&cf=${cf}&gstsetting=${gstsetting}&othercharges=${othercharges}&cfcharges=${cfcharges}&selectedaddonstring=${selectedaddonstring}`,{ 
            waitUntil: 'networkidle2',timeout:60000
        }) 
	   console.log("itineary invoice" , `${baseurl}/invoicetemplate?iten=${iten}&order_id=${order_id}&payment_id=${payment_id}&contact=${contact}&email=${email}&checkindate=${checkindate}&amount=${amount}&nameofproduct=${nameofproduct}&ordertotal=${ordertotal}&isadvance=${isadvance}&name=${name}&travellers=${nooftravellers}&invoicedate=${invoicedate}&subtotal=${subtotal}&gst=${gst}&cf=${cf}&gstsetting=${gstsetting}&othercharges=${othercharges}&cfcharges=${cfcharges}&selectedaddonstring=${selectedaddonstring}`);
	 }else{
	 console.log(`${baseurl}/invoicetemplate?order_id=${order_id}&payment_id=${payment_id}&contact=${contact}&email=${email}&checkindate=${checkindate}&amount=${amount}&nameofproduct=${nameofproduct}&ordertotal=${ordertotal}&isadvance=${isadvance}&name=${name}&travellers=${nooftravellers}&invoicedate=${invoicedate}&subtotal=${subtotal}&gst=${gst}&cf=${cf}&gstsetting=${gstsetting}&othercharges=${othercharges}&cfcharges=${cfcharges}&addontotal=${addontotal || 0}&addons=${addons || ''}&total=${total || 0}&rate=${rate || 0}&noofdays=${tripindays || 'no'}&selectedaddonstring=${selectedaddonstring}&producttotal=${producttotal}`);
await page.goto(`${baseurl}/invoicetemplate?order_id=${order_id}&payment_id=${payment_id}&contact=${contact}&email=${email}&checkindate=${checkindate}&amount=${amount}&nameofproduct=${nameofproduct}&ordertotal=${ordertotal}&isadvance=${isadvance}&name=${name}&travellers=${nooftravellers}&invoicedate=${invoicedate}&subtotal=${subtotal}&gst=${gst}&cf=${cf}&gstsetting=${gstsetting}&othercharges=${othercharges}&cfcharges=${cfcharges}&addontotal=${addontotal || 0}&addons=${addons || ''}&total=${total || 0}&rate=${rate || 0}&noofdays=${tripindays || 'no'}&selectedaddonstring=${selectedaddonstring}&producttotal=${producttotal}`,{ 
            waitUntil: 'networkidle2',timeout:60000
        })	 
	 }

 await page.setDefaultNavigationTimeout(0);
const sd = await page.pdf({
	path:'public/invoice.pdf',
	format:'A4',
	scale:0.67,
	margin:{
		    top:'20mm',
		    left:'3mm',
		    right:'3mm',
		    bottom:'10mm',

	       }
})
await browser.close();
if(sd){
res.status(200).json('success');	
}else{
res.status(400).json('error');	
}	
}else{
res.status(400).json('error');	
}
}else{
res.status(400).json('error');	
}

}