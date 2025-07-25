import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';

const EnquiryComponents = ({ setToggle, toggle }) => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || '';

  const openWhatsApp = () => {
    if (!whatsappNumber) return;
    const phone = whatsappNumber.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  return (
    <>
      {/* WhatsApp Button */}
      <div
        onClick={openWhatsApp}
        style={{
          width: '55px',
          height: '55px',
          borderRadius: '50%',
          background: '#25D366',
          position: 'fixed',
          bottom: '20%',
          right: '1%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0px 2px 6px rgba(0,0,0,0.2)',
          zIndex: 999,
        }}
        title="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </div>

      {/* Enquiry Button */}
      <div
        onClick={() => setToggle(true)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'transparent',
          position: 'fixed',
          bottom: '3%',
          right: '1%',
          boxShadow: '0.2px 1px 3px lightgrey',
          cursor: 'pointer',
          animation: 'bounchMe 1s infinite',
          zIndex: 999,
        }}
        title="Enquiry"
      >
        <Image src="/assets/img/images.jpg" width={60} height={60} alt="Enquiry" />
      </div>
    </>
  );
};

export default EnquiryComponents;
