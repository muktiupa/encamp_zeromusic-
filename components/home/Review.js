import {useEffect} from "react";
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import Image from 'next/image';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

const Review=(props)=>{
const {AOS} = props;
useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();
var $ = require('jquery');
if (typeof window !== 'undefined') {
   window.$ = window.jQuery = require('jquery');
}
  }, []);

const responsive={
                0:{
                    items: 1
                },
                600:{
                    items: 2
                },
                1000:{
                    items: 3
                }
                }

return ( 
		
    <section className="review__area home_review" >
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="review__top__blk">
                        <div className="review__left__blk">
                            <div className="review__google__logo">
                                <span style={{position:'relative',width:'97px',height:'36px'}}><Image src="/assets/img/google.png" alt="as" object-fit='contain' layout='fill'/></span>
                                <h6>Rating</h6>
                            </div>
                            <div className="review__star__blk">
                                <h5>4.5</h5>
                                <div className="star">
                                    <span><i className="fa fa-star"></i></span>
                                    <span><i className="fa fa-star"></i></span>
                                    <span><i className="fa fa-star"></i></span>
                                    <span><i className="fa fa-star"></i></span>
                                    <span><i className="fa fa-star"></i></span>
                                </div>
                                <small>245 Reviews</small>
                            </div>
                        </div>

                        <div className="review__right__blk">
                            <div className="review__btn">
                                <a href="https://g.page/encamp-adventures?share" target = 'blank'>View all 245 reviews <i className="fa fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>

                    <div className="review__slider__inner__blk">
                         <OwlCarousel nav={false}  className="testimonial__main__slider" responsive={responsive}  loop = {true} margin={40} stagePadding={25}  responsiveClass= {true}>
                        

                            <div className="single__review__item">
                                <div className="profile__thumb">
                                    <span><Image src="/assets/img/profile_1.png" alt="profile" object-fit='contain' layout='fill'/></span>
                                    <div className="profile__review">
                                        <h5>Dennis Chowhai</h5>
                                        <div className="five__star">
                                            <div className="star">
                                                <span><i className="fa fa-star"></i></span>
                                                <span><i className="fa fa-star"></i></span>
                                                <span><i className="fa fa-star"></i></span>
                                                <span><i className="fa fa-star"></i></span>
                                                <span><i className="fa fa-star"></i></span>
                                            </div>
                                            <small>4 months ago</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="review__inner__content">
                                    <p>Well it was a great experience treking to garbhanga forest reserve and also to be a part of the Himalayan cleanup drive with the encamp adventures. Got to learn so many things about waste n all. The encamp members are so much supportive n they interact with everyone so nicely. They also organise weekend hikes/treks to make your boring Sunday into a productive one. So those who are interested in adventures n hiking/trekking should come and experience the joy with the encamp adventures.</p>
                                </div>
                                <div className="review__inner__logo">
                                    <Image src="/assets/img/google_logo.png" alt="profile" object-fit='contain' layout='fill'/>
                                </div>
                            </div>

                            <div className="single__review__item">
                                <div className="profile__thumb">
                                    <span><img src="../assets/img/profile_1.png" alt=""/></span>
                                    <div className="profile__review">
                                        <h5>CHINMOYEE BORAH</h5>
                                        <div className="five__star">
                                            <div className="star">
                                                <span><i className="fa fa-star"></i></span>
                                                <span><i className="fa fa-star"></i></span>
                                                <span><i className="fa fa-star"></i></span>
                                                <span><i className="fa fa-star"></i></span>
                                                <span><i className="fa fa-star"></i></span>
                                            </div>
                                            <small>10 months ago</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="review__inner__content">
                                    <p>A big thank you to the entire team for making our girls trip so secured, safe and enjoyable. No words are enough for the great hospitality Frank, bat and the entire team had given us. The tents were clean and hygienic as well. Also they made arrangements for bonfire which was commendable. And to brighten up the environment the Manager and his team sang songs with us and all in all we had great fun. Keep the good work guys.</p>
                                </div>
                                <div className="review__inner__logo">
                                    <Image src="/assets/img/google_logo.png" alt="logo" object-fit='contain' layout='fill'/>
                                </div>
                            </div>
                            
                            <div className="single__review__item">
                                <div className="profile__thumb">
                                    <span><Image src="/assets/img/profile_1.png" object-fit='contain' layout='fill' alt="profile"/></span>
                                    <div className="profile__review">
                                        <h5>Ritu B</h5>
                                        <div className="five__star">
                                            <div className="star">
                                                <span><i className="fa fa-star"></i></span>
                                                <span><i className="fa fa-star"></i></span>
                                                <span><i className="fa fa-star"></i></span>
                                                <span><i className="fa fa-star"></i></span>
                                                <span><i className="fa fa-star"></i></span>
                                            </div>
                                            <small>2 days ago</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="review__inner__content">
                                    <p>I have booked my Meghalaya trip with encamp adventures. Meghalaya is very beautiful and to see its beauty, we need perfect planner, none other than encamp!! Simple people, perfect planner, Value added services and finally they are available all the time during your trip. Highly recommend.</p>
                                </div>
                                 <div className="review__inner__logo">
                                    <Image src="/assets/img/google_logo.png" alt="logo" object-fit='contain' layout='fill'/>
                                </div>
                            </div>
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </div>
    </section>
	    )

}
export default Review;


    