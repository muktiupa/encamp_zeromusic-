import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = (props) => {
  const { theme } = props;
  const [toggle, setToggle] = useState(false);
  const [collepse, setCollepse] = useState(true);
  const pattern = ["light", "dark"];
  const style = {
    themeColor:
      theme && pattern.includes(theme) && theme === "light"
        ? { color: "#ffffffb3" }
        : { color: "#00000" },
  };

  return (
    <>
      <div className={toggle ? "offcanvas-area active" : "offcanvas-area"}>
        <div className="menu-close" onClick={() => setToggle(false)}>
          <i className="fas fa-times"></i>
        </div>
        <div className="offcanvas-menu">
          <div className="main-menu">
            <ul className="d-block">
               <li>
                <Link href="/destinations">
                  <a style={style.themeColor}>Destinations</a>
                </Link>
              </li>
              
              <li>
                <Link href="/experience">
                  <a style={style.themeColor}>Experiences</a>
                </Link>
              </li>
              <li>
                <Link href="/vehicle">
                  <a style={style.themeColor}>Book & Go</a>
                </Link>
              </li> 
               <li>
                <Link href="/ziro_camping">
                  <a style={style.themeColor}>ZIRO-2025</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a style={style.themeColor}>About</a>
                </Link>
              </li>
            </ul>
            <div className="offcanvas-btn text-center">
              <Link href="/contactus">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="offcanvas-overlay"></div>

      <div className="header__area">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-6">
              <div className="header__logo">
                <Link href="/">
                  <a>
                    <div>
                      <Image
                        src="/assets/img/logo.svg"
                        object-fit="contain"
                        layout="fill"
                        alt="logo"
                      />
                    </div>
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-lg-9 col-md-9 col-6">
              <div className="header__right__blk">
                <div className="header__menu d-none d-md-block d-lg-block">
                  <ul>
                    <li>
                      <Link href="/destinations">
                        <a style={style.themeColor}>Destinations</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/experience">
                        <a style={style.themeColor}>Experiences</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/vehicle">
                        <a style={style.themeColor}>Book & Go</a>
                      </Link>
                    </li>
                     <li>
                      <Link href="/ziro_camping">
                        <a style={style.themeColor}>ZIRO-2025</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/about">
                        <a style={style.themeColor}>About</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="header__btn__blk d-none d-md-flex d-lg-flex">
                  <Link href="/contactus">
                    <a className="common__btn">Contact Us</a>
                  </Link>
                </div>
                <div className="menu-open d-block d-md-none d-lg-none">
                  <span>
                    <i
                      className="fas fa-bars"
                      onClick={() => setToggle(!toggle)}
                    ></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
