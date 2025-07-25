import Link from "next/link";
import Image from 'next/image';

const Footer=()=>{
return(
        <>   
    <div className="footer__area">
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-4">
                    <div className="footer__first__blk">
                        <div className="footer__logo">
                            <Link href="#"><a><Image src="/assets/img/logo.svg" alt="logo" width='150' height='80'/></a></Link>
                        </div>
                       
                    </div>
                </div>
                <div className="col-lg-8 col-md-8">
                   <div className="footer__main__blk">
                        <div style={{justifyContent: 'space-between'}} className="row">
                            <div className="codex col-lg-2 col-md-4 col-6">
                                <div className="footer__single__blk trips">
                                    {/*<Link href="#"><a>Trips</a></Link>*/}
                                </div>
                            </div>
                            
                         
                            <div className="col-lg-4 col-md-4 col-6">
                                <div className="footer__single__blk">
                                    <h4>Our Policies</h4>
                                    <ul>
                                    <li><Link href="/privacy-policy" passHref><a target="_blank" rel="noopener noreferrer">Privacy Policy</a></Link></li>
                                    <li><Link href="/terms-and-conditions" passHref><a target="_blank" rel="noopener noreferrer">Terms & Conditions</a></Link></li>
                                    <li><Link href="/cancellation-policy" passHref><a target="_blank" rel="noopener noreferrer">Cancellation policy</a></Link></li>
                                    </ul>
                                </div>
                            </div>
                         
                            <div className="col-lg-2 col-md-4 col-6">
                                <div className="footer__single__blk">
                                    <h4>Follow us</h4>
                                    <div className="footer__socials">
                                        {/*<Link href="https://twitter.com/encampers" passHref><a target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></Link>*/}
                                        <Link href="https://www.facebook.com/encampadventures" passHref><a target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></Link>
                                        <Link href="https://g.page/encamp-adventures" passHref><a target="_blank" rel="noopener noreferrer"><i className="fab fa-google"></i></a></Link>
                                        <Link href="https://www.instagram.com/encampadventures/" passHref><a target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <div className="footer__copy">
                            <span>© 2023. All rights reserved</span>
         </div>
    </div>
        </>
	)

}
export default Footer