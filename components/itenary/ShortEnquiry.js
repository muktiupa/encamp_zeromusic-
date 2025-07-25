import React, { useState } from "react";
import styled from "styled-components";
import {DataSubmittedtoapi} from '../../function/enquiry';
import { useRouter } from 'next/router';

// Styled components
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 400px;
  position: relative;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  color: #888;
  cursor: pointer;

  &:hover {
    color: #ff0000;
  }
`;

const Header = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 20px;
  margin-top:20px;
`;
const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.6rem;
  margin-top: 5px;
  display: block;
`;

const SubmitButton = styled.button`
  background-color: #34cc9c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ShortEnquiry = ({ setShowModal , idx , setIsenquried,sendMail , setIsonceOpen}) => {
  const [formData, setFormData] = useState({ name: "", whatsapp: "" });
  const [errors, setErrors] = useState({ name: "", whatsapp: "" });
  const [loading,setLoading] = useState(false);
  const router = useRouter();

  const validateName = (name) => {
    if (name.length < 4) {
      return "Name must be at least 4 characters long";
    }
    return "";
  };

  const validateWhatsapp = (whatsapp) => {
    const regex = /^[0-9]{10}$/;
    if (!regex.test(whatsapp)) {
      return "WhatsApp number must be 10 digits";
    }
    return "";
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    const nameError = validateName(formData.name);
    const whatsappError = validateWhatsapp(formData.whatsapp);

    if (nameError || whatsappError) {
      setErrors({ name: nameError, whatsapp: whatsappError });
    } else {
      setLoading(true);
      console.log("Form submitted:", formData);
      const message = composeMessage(formData);
      const uploaddata = {name:`${formData.name}`,email:'generalenquiry@encamp.com',phone:formData.whatsapp,message:message,tag:'Enquiry',info:formData};
      let dataSubmitted = await DataSubmittedtoapi(uploaddata);
      if(dataSubmitted && dataSubmitted.success === true){
        try{
          let maildata = {subject:'Enquiry',text:message};
          let mailresponse = await sendMail(maildata);
          if(mailresponse){
              console.log('Mail has been sent');
            }else{
               console.log('Mail server error');  
            }

        }catch(e){
          console.log("Mail Sending Failed");
        }
 
        saveItineraryToStorage(idx);
        setIsenquried(true);
        setLoading(false);
        setShowModal(false); 
        setIsonceOpen(true);
      }
    }
  };
  const composeMessage=(data)=>{
    let hostname = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : '';
    let message = `${data.name} ,`;
    message += "<div>" + `Mobile Number: ${data.whatsapp}` + "</div>";
  

    message += "<p>" + `Source: ` + "<a href='" + hostname + "/" + router.asPath + "' target='_new'>" + router.asPath + "</a>" + "</p>";
    
    return message;
    }
  const saveItineraryToStorage = (id) => {
      let storedIds = JSON.parse(localStorage.getItem("itenaryIds")) || [];
  
      if (!storedIds.includes(id)) {
        storedIds.push(id);
        localStorage.setItem("itenaryIds", JSON.stringify(storedIds));
      }
    };

  return (
    <ModalBackground>
      <ModalContent>
        <CloseButton onClick={() => {setShowModal(false),setIsonceOpen(1)}} >
          &times;
        </CloseButton>
        <Header>Ready for the full adventure? Submit your details below to unlock the complete itinerary!</Header>
        <form onSubmit={handleFormSubmit}>
          <Label>
            Your Name:
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                setErrors({ ...errors, name: validateName(e.target.value) });
              }}
              required
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </Label>
          <Label>
            WhatsApp Number:
            <Input
              type="text"
              value={formData.whatsapp}
              onChange={(e) => {
                setFormData({ ...formData, whatsapp: e.target.value });
                setErrors({
                  ...errors,
                  whatsapp: validateWhatsapp(e.target.value),
                });
              }}
              required
            />
            {errors.whatsapp && (
              <ErrorMessage>{errors.whatsapp}</ErrorMessage>
            )}
          </Label>
          <SubmitButton type="submit"  disabled={loading}>{loading ? "Please wait..." : 'Submit'}</SubmitButton>
        </form>
      </ModalContent>
    </ModalBackground>
  );
};

export default ShortEnquiry;
