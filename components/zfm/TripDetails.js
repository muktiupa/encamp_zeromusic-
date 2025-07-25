import { useState, useEffect, memo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import Moment from "moment";

const TripDetails = (props) => {
  const {
    AOS,
    toggle,
    setToggle,
    description,
    totalcf,
    totalpricetag,
    todaymrppricetag,
    tripdetails,
    isgrouptrip,
    data,
    toggles,
    setToggles,
    youtubeurl,
    durationtext,
    simillartrip,
    additionalTrips,
    camping_header,
    package_details,
    package_details_location,
    package_details_location_link,
    tripdetails_note,
    post_zfm_trip_details,
    addons
  } = props;
  const tripdate =
    data &&
    data.length > 0 &&
    data[0].tempObj[data[0].tempObj.length - 1].selectedRange;
  const [show, setShow] = useState(false);

  const readmore = () => {
    setShow(!show);
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, [AOS]);


  const styles = {
    circle: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      margin: "0 auto",
      cursor: "pointer",
      cursor: "pointer",
      padding: "3px",
    },
  };

  const groupedAddons = {
    activities: addons.filter(a => a.type === "activity" && a.s_type === "activity"),
    postZFM: addons.filter(a => a.type === "activity" && a.s_type === "experience"),
    vehicles: addons.filter(a => a.type === "vehicle"),
  };

  const addonSections = [
    {
      key: "activities",
      title: "Things To Do In Ziro",
      description: `Enrich your camping package with curated activities that allow you to explore Ziro in depth. You can add these to your camping package on the booking screen.`,
    },
    {
      key: "vehicles",
      title: "Travel To Ziro Made Easy",
      description: `Beyond the camping package, we've organized seamless travel options for your utmost convenience. You can add these to your camping package on the booking screen.`,
      note: `Transfers from Naharlagun Railway Station to Ziro will be in a Tata Sumo on a sharing basis of 9-10 passengers per vehicle. In case you need a more comfortable vehicle for transfer you can connect with our team and they will help you get a private vehicle with a driver to chauffeur you for an added cost.`,
    },
    {
      key: "postZFM",
      title: "Ziro Festival Accomodation & Tour Packages",
      description: post_zfm_trip_details,
    },
  ];


  return (
    <section id="tripdetails" className="details__area">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div
              className="details__tab__blk"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
            >
              <ul className="nav nav-tabs" id="myTab" role="tablist"></ul>

              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="trip__tab__title">
                        <h2 style={{ fontSize: "40px" }}>
                          {camping_header}
                        </h2>
                        <p
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            padding: "5px",
                            marginTop: "9px",
                            fontSize: "1.2rem",
                            margin: 0,
                          }}
                        >
                          {durationtext ?? ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="col-lg-12"
                      dangerouslySetInnerHTML={{ __html: description }}
                    ></div>
                    <div className="col-lg-12 mt-5">
                      {youtubeurl && (
                        <iframe
                          width="100%"
                          height="400"
                          src={youtubeurl}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className="details__sitebar__main"
              data-aos="fade-left"
              data-aos-delay="50"
              data-aos-duration="1000"
            >
              {totalcf ? (
                <div className="carbon__sp__wrap d-none d-lg-block">
                  <Image
                    src={`/assets/img/carbon-sp.png`}
                    alt={`carbon-sp.png`}
                    object-fit="contain"
                    layout="fill"
                  />
                  <div className="carbon__sp__content">
                    <h4>{`${totalcf}KGS`}</h4>
                    <p>Carbon Footprint</p>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="sitebar__price modified">
                <Image
                  src={`/assets/img/price_tag.svg`}
                  alt={`price_tag.svg`}
                  object-fit="contain"
                  layout="fill"
                />
                <span style={{ marginTop: "8px", fontSize: "0.7rem" }}>
                  <i className="fa fa-inr"></i>
                  <del>{todaymrppricetag}</del>
                </span>
                <span style={{ marginTop: "25px", fontSize: "0.9rem" }}>
                  <i className="fa fa-inr"></i>
                  {totalpricetag}
                </span>
              </div>
              <div className="trip__sitebar__title">
                <h2 style={{ fontSize: "1rem", marginTop: "1rem" }}>
                  Package Details
                </h2>
                <p style={{ color: "var(--bs-body-color)" }}>{tripdetails}</p>
              </div>
              <p
                style={{
                  color: "black",
                  backgroundColor: "yellow",
                  padding: "5px",
                  fontSize: "0.6rem",
                  margin: 0,
                }}
              >
                <strong>Note: </strong>
                prices are subject to rise as tent availability drops
              </p>
              {isgrouptrip && data.length > 0 ? (
                <div
                  className="mt-3 mb -3 trip__sitebar__title"
                  style={{ fontWeight: "600", fontSize: "0.8rem" }}
                >
                  Trip Date {Moment(tripdate.from).format("DD/MM/YYYY")} -{" "}
                  {Moment(tripdate.to).format("DD/MM/YYYY")}
                </div>
              ) : (
                ""
              )}
              <div
                className="trip__sitebar__locations"
                style={{ marginTop: "10px" }}
              >
                <p style={{ fontSize: "0.9rem" }}>
                  {package_details ?? ''}
                </p>
                <span>
                  <i className="fa fa-map-marker-alt"></i>
                </span>
                {package_details_location_link && <Link
                  href={`${package_details_location_link ?? '#'}`}
                  passHref
                >
                  <a target="_blank">{package_details_location ?? ''}</a>
                </Link>}
              </div>

              <div className="sitebar__btn__blk">
                <div
                  id="book_zfm"
                  className="common__btn sidebar-open"
                  style={{ width: "100%", cursor: "pointer" }}
                  onClick={() => setToggle(!toggle)}
                >
                  Book Now
                </div>
              </div>
              <div className="bg-lightGreen-300 rounded-lg p-20">
                <hr />
                <div style={{ fontSize: "0.7rem", paddingBottom: "1rem" }}>
                  {tripdetails_note ?? ''}
                  <br />
                  <br />
                  <b>Looking for BYOT option? </b>Please drop your contact
                  details and our team will get in touch with you
                </div>

                <div
                  id="enquiry_zfm"
                  className="common__btn sidebar-open"
                  style={{
                    width: "100%",
                    cursor: "pointer",
                    backgroundColor: "rgb(251, 204, 4)",
                    marginTop: "1rem",
                  }}
                  onClick={() => setToggles(!toggles)}
                >
                  Enquire Now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {addonSections.map((section, i) => {
        const items = groupedAddons[section.key];
        if (!items || items.length === 0) return null;

        return (
          <div className="container" key={section.key}>
            <div className="row">
              <div className="col-lg-8">
                <div
                  className="print__content"
                  data-aos="fade-up"
                  data-aos-delay="50"
                  data-aos-duration="1000"
                >
                  <h2 className={i === 0 ? "mt-5" : ""}>{section.title}</h2>
                  <p style={{ color: "var(--bs-body-color)" }}>{section.description}</p>

                  <div className="flex justify-center">
                    <table className="grouptable w-full text-sm border">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2 text-left">
                            {section.key === "vehicles"
                              ? "Vehicle"
                              : section.key === "postZFM"
                                ? "Tour"
                                : "Activity"}
                          </th>
                          <th className="border px-4 py-2 text-left">Price</th>
                          {section.key === "postZFM" && (
                            <th className="border px-4 py-2 text-left">Link</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr key={item.id}>
                            <td className="border px-2 py-2">{item.name}</td>
                            <td className="border px-2 py-2">₹ {item.price}</td>
                            {section.key === "postZFM" && (
                              <td className="border px-4 py-2">
                                {item.a_link ? (
                                  <span
                                    className="common__btn sidebar-open"
                                    onClick={() => window.open(item.a_link, '_blank')}
                                    style={{ width: "80px", height: "30px" , cursor:'pointer' }}
                                  >View</span>
                                ) : (
                                  "-"
                                )}
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>

                    </table>
                  </div>

                  {section.note && (
                    <div className="mt-3 text-sm text-gray-700">
                      <strong>Note:</strong> {section.note}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {simillartrip && (
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div
                className="print__content"
                data-aos="fade-up"
                data-aos-delay="50"
                data-aos-duration="1000"
              >
                <h2>ALL Incusive Ziro Valley Trip</h2>
                <div className="flex justify-center">
                  <table className="grouptable">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-4 py-2  text-left">
                          Tour
                        </th>
                        <th className="border border-gray-300 px-4 py-2  text-left">Price</th>
                        <th className="border border-gray-300 px-4 py-2  text-left">Link</th>
                      </tr>
                    </thead>
                    <tbody className="flex justify-start">
                      {simillartrip.map((tt, kk) => {
                        return (
                          <tr key={kk}>
                            <td className="border border-gray-300 px-4 py-2 text-left">
                              {tt?.name ?? ""}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-left">
                              {tt?.price ?? ""}
                            </td>
                            <td
                              className="border border-gray-300 px-4 py-2 text-left"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {tt.link && (
                                <Link href={tt.link} passHref>
                                  <a target="_blank" style={{margin:0}}> 
                                  <span
                                    className="common__btn sidebar-open"
                                    style={{ width: "80px", height: "30px", cursor: 'pointer' }}
                                  >
                                    View
                                  </span>
                                  </a>
                                </Link>
                              )}

                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {additionalTrips && (
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div
                className="print__content"
                data-aos="fade-up"
                data-aos-delay="50"
                data-aos-duration="1000"
              >
                <h2>ALL Ziro Camping Packages</h2>
                <div className="flex justify-center">
                  <table className="grouptable">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-4 py-2  text-left">
                          Tour
                        </th>
                        <th className="border border-gray-300 px-4 py-2  text-left">Price</th>
                        <th className="border border-gray-300 px-4 py-2  text-left">Link</th>
                      </tr>
                    </thead>
                    <tbody className="flex justify-start">
                      {additionalTrips.map((tt, kk) => {
                        return (
                          <tr key={kk}>
                            <td className="border border-gray-300 px-4 py-2 text-left">
                              {tt?.name ?? ""}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-left">
                              {tt?.price ?? ""}
                            </td>
                            <td
                              className="border border-gray-300 px-4 py-2 text-left"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {tt.link && (
                                <Link href={tt.link} passHref>
                                  <a target="_blank" style={{margin:0}}> 
                                  <span
                                    className="common__btn sidebar-open"
                                    style={{ width: "80px", height: "30px", cursor: 'pointer' }}
                                  >
                                    View
                                  </span>
                                  </a>
                                </Link>
                              )}

                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div
              className="print__content"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
            >
              <h2>Key Highlights of Encamp Ziro Festival Accommodation & Tour Package</h2>
              <div className="container" style={{ width: "100%" }}>
                <ul>
                  <li>
                    <strong>Starlit Skies and Bamboo Lounges:</strong> Relax in
                    our unique bamboo machang setups and gaze at the night sky
                    lit by a million stars. Perfect for catching up with friends
                    or enjoying a peaceful moment alone.
                  </li>
                  <p />
                  <li>
                    <strong>Music and Bonfires:</strong> Keep the music flowing
                    and spirits high with our nightly bonfire jams. Sing, dance,
                    or simply enjoy the warmth as you meet fellow
                    festival-goers.
                  </li>
                  <p />
                  <li>
                    <strong>Eco-Friendly Initiatives:</strong> Our
                    sustainability-focused measures and improved systems ensure
                    a sustainable and comfortable environment, even in the
                    busiest times.
                  </li>
                  <p />
                  <li>
                    <strong>Smooth Logistics:</strong> From a streamlined tent
                    allocation process to efficient transport solutions, we
                    prioritize your convenience and satisfaction.
                  </li>
                  <p />
                  <li>
                    <strong>24*7 Support:</strong> Stay connected with our
                    dedicated customer support team, ensuring your festival
                    experience is uninterrupted.
                  </li>
                  <p />
                  <li>
                    <strong>Future-Ready Parking:</strong> Coming soon—dedicated
                    caravan parking! We’re expanding to accommodate all types of
                    festival goers, ensuring everyone has a spot close to the
                    action.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div
              className="print__content"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
            >
              <h2>Camping Essentials for Ziro Festival Guests:</h2>
              <div className="container" style={{ width: "100%" }}>
                <ul>
                  <li>
                    <strong>Water Supply Concerns:</strong> Each year, we face a
                    challenge with water shortages due to the high demand from
                    campsites and vendors. Although we manage this with water
                    supply vehicles, we advise guests to use water judiciously
                    to help us maintain a sustainable environment.
                  </li>
                  <p />
                  <li>
                    <strong>Campsite Conditions:</strong> The festival is set on
                    naturally soft ground, which can become muddy in the rain.
                    We are improving drainage to enhance comfort and
                    accessibility. Guests are recommended to bring gum boots for
                    an easier experience navigating the campsite.
                  </li>
                  <p />
                  <li>
                    <strong>Transport Coordination:</strong> Arranging
                    transportation for guests at the last minute can be
                    challenging due to varying departure schedules and vehicle
                    availability, affecting our ability to operate efficiently.
                    We appreciate your cooperation and understanding as we
                    manage these logistics.
                  </li>
                  <p />
                  <li>
                    <strong>Tent Allocation:</strong> We ensure a seamless
                    check-in and check-out process with a focus on:
                    <ul>
                      <li>
                        Gender-segregated accommodations for solo travelers.
                      </li>
                      <li>
                        Efficient tent allocation to maximize usage and comfort.
                      </li>
                      <li>
                        Supervised check-outs to keep all tents ready and
                        welcoming for every guest.
                      </li>
                    </ul>
                  </li>
                  <p />
                  <li>
                    <strong>Electricity Supply:</strong> While we primarily
                    source power from the landowner&apos;s facilities, a backup
                    generator is in place to ensure that there are no
                    interruptions in charging devices or running essential
                    services.
                  </li>
                  <p />
                  <li>
                    <strong>Caravan Parking:</strong> We acknowledge the growing
                    demand for caravan parking. Plans are underway to establish
                    a designated parking area to better accommodate our caravan
                    guests in the future.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div
              className="print__content"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
            >
              <h2>Campsite Facilities</h2>
              <div className="container" style={{ width: "100%" }}>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <div className="text-center simulate ">
                    <div style={styles.circle}>
                      <Image
                        alt="encamp"
                        src="/assets/ziro/encamp/2.png"
                        layout="responsive"
                        width={80}
                        height={80}
                      />
                    </div>
                    <div>
                      <div className="my-3 text-xs">Jam Session</div>
                    </div>
                  </div>
                  <div className="text-center simulate ">
                    <div style={styles.circle}>
                      <Image
                        alt="encamp"
                        src="/assets/ziro/encamp/4.png"
                        layout="responsive"
                        width={80}
                        height={80}
                      />
                    </div>
                    <div>
                      <div className="my-3 text-xs">Bonfire</div>
                    </div>
                  </div>
                  <div className="text-center simulate ">
                    <div style={styles.circle}>
                      <Image
                        alt="encamp"
                        src="/assets/ziro/encamp/11.png"
                        layout="responsive"
                        width={80}
                        height={80}
                      />
                    </div>
                    <div>
                      <div className="my-3 text-xs">Common Chill Zone</div>
                    </div>
                  </div>

                  <div className="text-center simulate ">
                    <div style={styles.circle}>
                      <Image
                        alt="encamp"
                        src="/assets/ziro/encamp/6.png"
                        layout="responsive"
                        width={80}
                        height={80}
                      />
                    </div>
                    <div>
                      <div className="my-3 text-xs">Clothesline</div>
                    </div>
                  </div>
                  <div className="text-center simulate ">
                    <div style={styles.circle}>
                      <Image
                        alt="encamp"
                        src="/assets/ziro/encamp/10.png"
                        layout="responsive"
                        width={80}
                        height={80}
                      />
                    </div>
                    <div>
                      <div className="my-3 text-xs">Clean Drinking Water</div>
                    </div>
                  </div>
                  <div className="text-center simulate ">
                    <div style={styles.circle}>
                      <Image
                        alt="encamp"
                        src="/assets/ziro/encamp/8.png"
                        layout="responsive"
                        width={80}
                        height={80}
                      />
                    </div>
                    <div>
                      <div className="my-3 text-xs">Hygienic Washrooms</div>
                    </div>
                  </div>
                  <div className="text-center simulate ">
                    <div style={styles.circle}>
                      <Image
                        alt="encamp"
                        src="/assets/ziro/encamp/12.png"
                        layout="responsive"
                        width={80}
                        height={80}
                      />
                    </div>
                    <div>
                      <div className="my-3 text-xs">Toiletries</div>
                    </div>
                  </div>
                  <div className="text-center simulate ">
                    <div style={styles.circle}>
                      <Image
                        alt="encamp"
                        src="/assets/ziro/encamp/13.png"
                        layout="responsive"
                        width={80}
                        height={80}
                      />
                    </div>
                    <div>
                      <div className="my-3 text-xs">Zero Waste Camp</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div
              className="print__content"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
            >
              <h2>Campground Rules</h2>
              <div className="container">
                <li
                  style={{
                    textAlign: "left",
                    margin: "0 auto",
                    listStyle: "none",
                  }}
                >
                  <span className="font-bold">
                    <b>Your decency shall be our pride</b>:
                  </span>{" "}
                  We request you to not get involved in any anti-social or
                  unsolicited activities during the trip and at the campsite.
                  The organizers reserve the right to withdraw all of your
                  services in such cases with deep regrets.
                </li>
                <br />
                <li
                  style={{
                    textAlign: "left",
                    margin: "0 auto",
                    listStyle: "none",
                  }}
                >
                  <span className="font-bold">
                    <b>We (Humans) are nothing in front of Nature</b>:
                  </span>{" "}
                  The organizers are in no way obligated / responsible for any
                  refund arising out of any natural or man-made calamities which
                  are beyond our control. Rains and muddy fields are a thing at
                  Ziro. Request you to book with the right expectations set.
                </li>
                <br />

                {show ? (
                  <>
                    <li
                      style={{
                        textAlign: "left",
                        margin: "0 auto",
                        listStyle: "none",
                      }}
                    >
                      <span className="font-bold">
                        <b>Furnish documents at Check-in</b>:
                      </span>{" "}
                      Kindly carry valid ID proof and a payment receipt while on
                      the trip. We appreciate mobile receipts, so does nature.
                    </li>
                    <br />
                    <li
                      style={{
                        textAlign: "left",
                        margin: "0 auto",
                        listStyle: "none",
                      }}
                    >
                      <span className="font-bold">
                        <b>Accommodation</b>:
                      </span>{" "}
                      Tents are on a sharing basis, equipped with sleeping mats
                      and bags. In case you need anything extra, please be
                      patient with our team members.
                    </li>
                    <br />
                    <li
                      style={{
                        textAlign: "left",
                        margin: "0 auto",
                        listStyle: "none",
                      }}
                    >
                      <span className="font-bold">
                        <b>Patience is solicited</b>:
                      </span>{" "}
                      Ours is a campsite and not a resort. We request you to
                      please be patient with our team members in case you need
                      them to help out with anything. They are catering to 100+
                      guests at the campsite and someone else might be needing
                      their immediate attention as well.
                    </li>
                    <br />
                    <li
                      style={{
                        textAlign: "left",
                        margin: "0 auto",
                        listStyle: "none",
                      }}
                    >
                      <span className="font-bold">
                        <b>Damages are chargeable</b>:
                      </span>{" "}
                      In case of any damages to the camp material, the guest
                      will be liable to pay the price in full along with the
                      cost of Rs 1,000/- as a logistics fee to the organizers.
                      We know only 1 in a 100 turn out to be a nuisance and this
                      condition is explicitly mentioned for them.
                    </li>
                    <br />
                    <li
                      style={{
                        textAlign: "left",
                        margin: "0 auto",
                        listStyle: "none",
                      }}
                    >
                      <span className="font-bold">
                        <b>Respect & Love</b>:
                      </span>{" "}
                      Please be respectful of the local communities and their
                      traditions. We are their guests and any disrespect shown
                      towards them is unacceptable. People are usually sweet and
                      kind in Ziro, and we are confident you will make good
                      friends with the locals. Always remember, you get what you
                      give.
                    </li>
                    <br />
                    <li
                      style={{
                        textAlign: "left",
                        margin: "0 auto",
                        listStyle: "none",
                      }}
                    >
                      <span className="font-bold">
                        <b>Ignore at your own risk</b>:
                      </span>{" "}
                      Please read all the information carefully. You can also
                      call / mail us to understand all the Campground Rules
                      (terms and conditions.)
                    </li>
                    <br />
                    <li
                      style={{
                        textAlign: "left",
                        margin: "0 auto",
                        listStyle: "none",
                      }}
                    >
                      <span className="font-bold">
                        <b>Tourism infrastructure:</b>
                      </span>{" "}
                      The tourism infrastructure in the mentioned destinations
                      is not very developed and one should not expect or compare
                      it with the standards of plains & other developed
                      destinations. The roads to camp could be slightly muddy
                      and we recommend that you carry the right clothing and
                      shoes for this wonderful adventurous experience. If these
                      experiences are not your kind, then you might be coming to
                      the wrong place.
                    </li>
                    <br />
                    <li
                      style={{
                        textAlign: "left",
                        margin: "0 auto",
                        listStyle: "none",
                      }}
                    >
                      <span className="font-bold">
                        <b>Transportation</b>:
                      </span>{" "}
                      Transfers from Naharlagun Railway Station to Ziro will be
                      in a Tata Sumo on a sharing basis of 9-10 passengers per
                      vehicle. In case you need a more comfortable vehicle for
                      transfer you can connect with our team and they will help
                      you get a private vehicle with a driver to chauffeur you
                      for an added cost.
                    </li>
                    <br />
                    <li
                      style={{
                        textAlign: "left",
                        margin: "0 auto",
                        listStyle: "none",
                      }}
                    >
                      <span className="font-bold">
                        <b>Rare occurrences</b>:
                      </span>{" "}
                      Management has the right to alter the itinerary, and
                      further holds all rights to cancel trips in case of
                      unavoidable circumstances.
                    </li>
                    <br />
                  </>
                ) : (
                  ""
                )}
                <div
                  id="sustainability"
                  className="text-xl text-green-500"
                  style={{
                    width: "100%",
                    textAlign: "right",
                    fontWeight: "600",
                    cursor: "pointer",
                    paddingRight: "3vw",
                  }}
                  onClick={() => readmore()}
                >
                  {show ? "Read Less" : "Read More"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div
              className="print__content"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
            >
              <h2>A Pledge to sustain</h2>
              <div className="container px-1">
                <p style={{ color: "var(--bs-body-color)" }}>
                  With a focus on transforming tourism through a responsible
                  travel tech platform, which calculates carbon emission,
                  promotes conscious reduction and provides offset options to
                  make every travel itinerary nature-positive, we at Encamp,
                  stand by an environment-first approach in design and
                  operation. We subscribe to practices that benefit not only our
                  customers but also local communities and the environment.
                </p>
                <p
                  style={{ color: "var(--bs-body-color)" }}
                  id="about"
                  className="pt-3"
                >
                  We offer means to offset emissions, by supporting carbon
                  offset programs in order to make travel a low carbon footprint
                  experience. We implement measurement and reduction practices
                  using technology intervention mixed with physical projects
                  involving afforestation projects and other nature-based
                  solutions. As a strong commitment toward greener tourism, we
                  aim to enable each Encamper to leave every place better than
                  they found it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div
              className="print__content"
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1000"
            >
              <h2>Cancellation Policy</h2>
              <div className="container px-1">
                <p style={{ color: "var(--bs-body-color)" }}>
                  Non-Refundable Policy All camping reservations at Encamp Ziro Festival of Music Camping are non-refundable. This policy is in place because of the substantial preparation and logistical work needed to set up and maintain our campsite in this remote area. Our team dedicates considerable effort to ensure that every guest has a memorable experience, which involves extensive planning and resource allocation.
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default memo(TripDetails);
