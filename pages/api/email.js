
export default async function handler(req, res) {

let  nodemailer = require('nodemailer');

 if (req.method === "POST") {
const {email,subject,text,attachments,iscc}=req.body;

let transport = nodemailer.createTransport({
    host: process.env.EMAILHOST,
    port: process.env.EMAILPORT,
    auth: {
    user: process.env.EMAILUSER,
    pass: process.env.EMAILPASSWORD
    }
});
let sending = {
                html: text,
                from:process.env.EMAILFROM,
                to: email ? `${process.env.EMAILTO},${email}`:`${process.env.EMAILTO}`,
                envelope:{
                from:process.env.EMAILFROM,
                to: email ? `${process.env.EMAILTO},${email}`:`${process.env.EMAILTO}`,                  
                },
                subject: subject                 
               }

if (iscc) {
    sending.envelope.cc = `${process.env.EMAILCC}, Accounts <${process.env.EMAILCC}>`;
}
               

  let uploadfile = [];
  if(attachments){
    attachments.map((attac)=>{
    uploadfile = [...uploadfile,{...attac,path:`${process.cwd()}${attac.path}`}]
    })
    sending = {...sending,attachments:uploadfile}
  }
console.log(sending);

try{
  transport.sendMail(sending, function (err, info) {
    if(err){
       res.status(400).end(JSON.stringify({ message:"Error",error:err }));
     }
    else{
      res.status(200).end(JSON.stringify({ message:info }));
    }
  })
 }catch(error){
 res.status(400).end(JSON.stringify({ message:"Error",error:error }));
 }

 }

}