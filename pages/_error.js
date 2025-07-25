import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Error=({ statusCode })=>{
const router = useRouter();

useEffect(()=>{
if(statusCode === 500 || statusCode === 404){
router.push("/");  
}

},[statusCode]);
  return (
    <div style={{color:"green",fontSize: '1.8rem',height:"100vh",display:"flex",justifyContent: 'center',alignItems: 'center'}}>
      {statusCode
        ? `Page Not Found`
        : 'An error occurred on client'}
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error