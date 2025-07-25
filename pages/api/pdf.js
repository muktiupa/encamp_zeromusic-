const fs = require('fs');
const puppeteer = require('puppeteer');



export default async function handler(req, res) {

function base64Encode(file) {
  return fs.readFileSync(file, {encoding: 'base64'});
}

const imageUrlToBase64 = async url => {
  const response = await fetch(url);
  const blob = await response.blob();
  let buffer = Buffer.from(await blob.text());
  return "data:" + blob.type + ';base64,' + buffer.toString('base64');
};

const logox = await imageUrlToBase64(process.env.BASEURL + '/assets/img/logo.svg');


function logo() {
  return '<img height="30" width="80"  src="' + logox + '"/>';
}

  if (req.method === "POST") {
 const {order_id,payment_id,contact,email,checkindate,amount,nameofproduct,ordertotal,isadvance,name,iten,nooftravellers} = req.body;
const headerTemplate = `
  <div style="display:flex;width:90%;font-size: 10px;padding: 5px 0;margin:auto;border-bottom: 0.5px solid black;">
    <div style="width:25%">${logo()}</div>
    <div style="width:50%;text-align:center"></div>
    <div style="width:25%;text-align:right"></div>
  </div>`;

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
console.log(`${baseurl}/ipdf?iten=${iten}&order_id=${order_id}&payment_id=${payment_id}&contact=${contact}&email=${email}&checkindate=${checkindate}&amount=${amount}&nameofproduct=${nameofproduct}&ordertotal=${ordertotal}&isadvance=${isadvance}&name=${name}`)
await page.goto(`${baseurl}/ipdf?iten=${iten}&order_id=${order_id}&payment_id=${payment_id}&contact=${contact}&email=${email}&checkindate=${checkindate}&amount=${amount}&nameofproduct=${nameofproduct}&ordertotal=${ordertotal}&isadvance=${isadvance}&name=${name}&nooftravellers=${nooftravellers}`,{ 
            waitUntil: ['domcontentloaded', 'load', "networkidle0"]
        })
await page.setDefaultNavigationTimeout(0);
const sd = await page.pdf({
	path:'public/details.pdf',
	displayHeaderFooter: true,
	headerTemplate:headerTemplate,
	format:'A4',
	scale:0.67,
	margin:{
		    top:'35mm',
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