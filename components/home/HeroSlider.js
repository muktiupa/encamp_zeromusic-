import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import One from "./firstlook/One";
import Two from "./firstlook/Two";
import Three from "./firstlook/Three";
import Four from "./firstlook/Four";

const HeroSlider = (props) => {
  const { AOS } = props;
  const [RandomComponent, setRandomComponent] = useState(null);

  const rendtrend = (props) => {
    const allComponents = [One, Two, Three, Four];
    const randomIndex = Math.floor(Math.random() * allComponents.length);
    setRandomComponent(React.createElement(allComponents[randomIndex], props));
  };
  useEffect(() => {
    rendtrend({ AOS: AOS });
  }, []);

  useEffect(() => {
    AOS.init({
      disable: "mobile",
    });
    AOS.refresh();
  }, [AOS]);

  return (
    <>
      {RandomComponent ? RandomComponent : ""}
      <section className="hero__area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="hero__main__blk"
                data-aos="fade-up"
                data-aos-delay="50"
                data-aos-duration="1000"
              >
                <div className="hero__title__blk">
                  <h1>Where will your next vacation be?</h1>

                  {/*<p>Let’s begin with a place or activity.</p>*/}
                </div>
                {/* <div className="hero__search__blk">
                                <img className="search_ico" src="assets/img/search.svg" alt=""/>
                                <input type="text" placeholder="Type an activity or place you have on mind"/>
                                <div className="hero__search__wrap">
                                    <div className="hero__search__activities margin">
                                        <div className="hero__search__title">
                                            <h4>ACTIVITIES</h4>
                                            <p><img src="assets/img/rope.svg" alt=""/><span>Bungee jumping</span> in all
                                                locations</p>
                                            <Link href="#"><a className="common__btn">View all activiities<i
                                                    className="fal fa-long-arrow-right"></i></a></Link>
                                        </div>
                                    </div>
                                    <div className="hero__search__activities">
                                        <div className="hero__search__title">
                                            <h4>Places</h4>
                                            <p><img src="assets/img/map3.svg" alt=""/><span>Bungadong</span> in Meghalaya
                                            </p>
                                            <p><img src="assets/img/map3.svg" alt=""/><span>Bunisara</span> in Assam</p>
                                            <Link href="#"><a className="common__btn">View all activiities<i
                                                    className="fal fa-long-arrow-right"></i></a></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>*/}
                {/*              <div className="hero__service__wrap">
                                <div className="hero__service__single position-relative">
                                    <div className="hero__service__img">
                                        <img src="assets/img/h1.svg" alt=""/>
                                    </div>
                                    <Link href="#"><a className="stretched-link">Dawki Island</a></Link>
                                </div>
                                <div className="hero__service__single position-relative">
                                    <div className="hero__service__img">
                                        <img src="assets/img/h2.svg" alt=""/>
                                    </div>
                                    <Link href="#"><a className="stretched-link">Mawsynram</a></Link>
                                </div>
                                <div className="hero__service__single position-relative">
                                    <div className="hero__service__img">
                                        <img src="assets/img/h3.svg" alt=""/>
                                    </div>
                                    <Link href="#"><a className="stretched-link">Bungee Jumping</a></Link>
                                </div>
                                <div className="hero__service__single position-relative">
                                    <div className="hero__service__img">
                                        <img src="assets/img/h4.svg" alt=""/>
                                    </div>
                                    <Link href="#"><a className="stretched-link">Cherrapunji</a></Link>
                                </div>
                                <div className="hero__service__single position-relative">
                                    <div className="hero__service__img">
                                        <img src="assets/img/h5.svg" alt=""/>
                                    </div>
                                    <Link href="#"><a className="stretched-link">River rafting</a></Link>
                                </div>
                            </div>*/}
                <div className="hero__break__blk">
                  <div className="hero__line"></div>
                  {/*<span>OR</span>*/}
                  <div className="hero__line .hero__line2"></div>
                </div>
                <div className="hero__btn__blk">
                  <Link href="/experience">
                    <a className="common__btn">View All Experiences</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default HeroSlider;
