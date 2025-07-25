import { useEffect, useState } from 'react';
import adminapi from '../../api/adminapi';
import Loading from '../common/Loading';
import Select from 'react-select';


const Home = ({ setOrderbooking, orderbooking, toggle, setToggle, setEnquiry, togglex, setTogglex }) => {
    const [loading, setLoading] = useState(false);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [pricing, setPricing] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedDrive, setSelectedDrive] = useState('With Driver');
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [numPassengers, setNumPassengers] = useState(1);
    const [pickupLocation, setPickupLocation] = useState('');
    const [city, setCity] = useState('Guwahati');
    const [state, setState] = useState('Assam');
    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');


    // Fetch states and cities
    const fetchStatesAndCities = async () => {
        try {
            const res = await adminapi.get('/getstates');
            const data = res.data || [];
            setStateOptions(data);

            if (data.length) {
                setState(data[0].state);
                setCityOptions(data[0].cities);
                setCity(data[0].cities[0]);
            }
        } catch (error) {
            console.error('Error fetching states and cities:', error);
        }
    };

    // Fetch vehicle types
    const fetchVehicleTypes = async () => {
        try {
            const res = await adminapi.get('/vehiclebytype');
            const types = res.data || [];
            setVehicleTypes(types);

        } catch (error) {
            console.error('Error fetching vehicle types:', error);
        }
    };

    // Fetch vehicle list
    const fetchVehicleList = async (type) => {
        try {
            const res = await adminapi.get(`/vehiclecarlist/${type}`);
            setVehicles(res.data || []);
        } catch (error) {
            console.error('Error fetching vehicle list:', error);
        }
    };

    // Fetch vehicle pricing
    const fetchVehiclePricing = async () => {
        if (!selectedType || !selectedVehicle || !city || !state || !startDate || !endDate || !numPassengers) {
            setPricing(null);
            return;
        }

        const tripDays = getTripDays();

        try {
            setLoading(true);
            const res = await adminapi.get('/getvehicleprice', {
                params: {
                    vehicletype: selectedType.vehicletype,
                    typeofcar: selectedVehicle,
                    driveType: selectedDrive,
                    city,
                    state,
                    numPassengers,
                    tripDays
                }
            });

            setPricing(res.data?.[0] || null);
        } catch (error) {
            console.error('Error fetching pricing:', error);
        } finally {
            setLoading(false);
        }
    };

    const getTripDays = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        return diff > 0 ? diff : 1;
    };


    // Effects
    useEffect(() => {
        fetchVehicleTypes();
        fetchStatesAndCities();
    }, []);

    useEffect(() => {
        const selected = stateOptions.find(s => s.state === state);
        setCityOptions(selected?.cities || []);
        setCity((selected?.cities || [])[0] || '');
    }, [state]);

    useEffect(() => {
        if (selectedType?.vehicletype) {
            fetchVehicleList(selectedType.vehicletype);
            setSelectedVehicle('');
        }
    }, [selectedType]);

    useEffect(() => {
        fetchVehiclePricing();
        if (toggle) {
            setOrderbooking({ ...orderbooking, finalSummary: {} });
            setToggle(false);
        }
    }, [selectedType, selectedVehicle, selectedDrive, city, state, startDate, endDate, numPassengers]);

    const validBooking =
        pricing &&
        selectedType &&
        selectedVehicle &&
        city &&
        state &&
        startDate &&
        endDate &&
        parseInt(numPassengers) > 0;

    const finalSummary = {
        vehicleType: selectedVehicle,
        vehiclecategory: pricing?.vehicletype ?? '',
        driveType: selectedDrive,
        passengers: numPassengers,
        basePrice: pricing?.cost || 0,
        gst: pricing?.taxAmount || 0,
        carboncess: pricing?.carbonCessAmount || 0,
        totalPrice: pricing?.grandTotal || 0,
        discount: 0,
        taxlabel: pricing?.taxlabel || 'GST',
        carboncesslabel: pricing?.carboncesslabel || 'Carbon Cess',
        startDate,
        endDate,
        city,
        state,
        pickupLocation,
        noofdays: getTripDays(),
        pricingId: pricing?.pricingId ?? null,
    };
    const callbooking = () => {
        setOrderbooking({ ...orderbooking, finalSummary: finalSummary });
        setToggle(!toggle);
    }

    const callEnquiry = () => {
        if (!city || !state || !selectedType || !startDate || !endDate || !numPassengers) {
            setError('Please fill all the required fields city, state, vehicletype,  startdate, enddate, number of passangers to submit an enquiry.');
            return;
        }

        setError('');
        setEnquiry(finalSummary);
        setTogglex(true);
    };

    const vehicleOptions = vehicleTypes.map(type => ({
        value: type,
        label: `${type.vehicletype} (${type.capacity || 1} pax)`,
        isDisabled: numPassengers > (type.capacity || 1),
    }));

    return (
        <>
            <Loading forceloading={loading} />
            <section id="book-now" className="trip__hero__area">
                <div
                    className="trip__hero__slide_vehicle"
                    style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: pricing?.image
                            ? `url(${pricing.image})`
                            : 'url(assets/img/vehiclebanner.png)'
                    }}
                >
                    <div className="trip__hero__content p-5">
                        <h6 className="text-white small fw-bold">Eco-friendly Transport</h6>
                        <h2 style={{ marginTop: '-12px' }}>Book Your Perfect Ride</h2>
                        <p className="text-white">Choose from a wide range of vehicles and enjoy a smooth booking experience.</p>
                    </div>
                </div>
            </section>
            <div className="container-fluid mt-2 p-2 p-lg-5">
                <div className="row">

                    <div className="col-lg-8">
                        <div className="row">
                            {/* Number of Passengers - left column */}
                            <div className="col-12 col-md-6 mb-3">
                                <label className="form-label">Number of Passengers</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    min="1"
                                    style={{ width: '100%' }}
                                    value={numPassengers}
                                    onChange={e => {
                                        setNumPassengers(e.target.value);
                                        setSelectedType(null);
                                    }}
                                />
                                {vehicleTypes.some(type => numPassengers > (type.capacity || 1)) && (
                                    <p className="text-danger mt-1 small" style={{ fontSize: '0.7rem' }}>
                                        Change the number of passengers to check available vehicle types.
                                    </p>
                                )}
                            </div>

                            {/* Vehicle Type Select - right column */}
                            <div className="col-12 col-md-6 mb-3">
                                <label className="form-label">Select Vehicle Type</label>
                                <Select
                                    options={vehicleOptions}
                                    value={vehicleOptions.find(option => option.value?.vehicletype === selectedType?.vehicletype)}
                                    onChange={option => {
                                        setSelectedType(option.value);
                                        setNumPassengers(option.value.capacity || 1);
                                        setSelectedVehicle('');
                                    }}
                                    isOptionDisabled={option => option.isDisabled}
                                    classNamePrefix="select"
                                    placeholder="Choose vehicle type..."
                                />
                            </div>
                        </div>

                        {/* Drive Type Selector */}
                        <div className="mb-4">
                            <label className="form-label">Drive Type</label>
                            <div className="btn-group w-100">
                                {['With Driver', 'Self Drive'].map(option => (
                                    <button
                                        key={option}
                                        className={`btn ${selectedDrive === option ? 'btn-success' : 'btn-outline-primary'}`}
                                        onClick={() => setSelectedDrive(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* State, City, Pickup */}
                        <div className="row mb-4">
                            <div className="col-md-4 mb-4">
                                <label className="form-label">State</label>
                                <select className="form-select" value={state} onChange={e => setState(e.target.value)}>
                                    {stateOptions.map((s) => (
                                        <option key={s.state} value={s.state}>{s.state}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4 mb-4">
                                <label className="form-label">City</label>
                                <select className="form-select" value={city} onChange={e => setCity(e.target.value)}>
                                    {cityOptions.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4 mb-4">
                                <label className="form-label">Pickup Location</label>
                                <input type="text" className="form-control" value={pickupLocation} onChange={e => setPickupLocation(e.target.value)} />
                            </div>
                        </div>
                        {/* Trip Dates and Vehicle Selector - Responsive in one row on desktop, stacked on mobile */}
                        <div className="row mb-3 g-3">
                            <div className="col-6 col-md-4">
                                <label className="form-label">Trip Start Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={startDate}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={e => {
                                        const selected = e.target.value;
                                        setStartDate(selected);
                                        if (!endDate || new Date(selected) > new Date(endDate)) {
                                            setEndDate(selected);
                                        }
                                    }}
                                    style={{ width: '100%' }}
                                />
                            </div>
                            <div className="col-6 col-md-4">
                                <label className="form-label">Trip End Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={endDate}
                                    min={startDate || new Date().toISOString().split('T')[0]}
                                    onChange={e => setEndDate(e.target.value)}
                                    style={{ width: '100%' }}
                                />
                            </div>

                            <div className="col-6 col-md-4">
                                <label className="form-label">Select Vehicle</label>
                                <select
                                    className="form-select"
                                    value={selectedVehicle}
                                    onChange={(e) => setSelectedVehicle(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    {vehicles.map(v => (
                                        <option key={v} value={v}>{v}</option>
                                    ))}
                                </select>
                            </div>
                        </div>


                    </div>

                    {/* Booking Summary */}
                    <div className="col-lg-4">
                        <div className="details__sitebar__main">
                            <div className="p-3 mt-1 bg-light rounded">
                                <h5 style={{ fontSize: '1.5rem' }}>Booking Summary</h5>
                                {finalSummary.totalPrice > 0 && <p>Vehicle Type: {finalSummary.vehicleType}</p>}
                                {finalSummary.totalPrice > 0 && <p>Passengers: {finalSummary.passengers}</p>}
                                <p>Base Price: ₹{finalSummary.basePrice.toFixed(2)}</p>
                                <p>{finalSummary?.carboncesslabel ?? ""}: ₹{finalSummary?.carboncess?.toFixed(2) ?? 0}</p>
                                <hr />
                                <p>{finalSummary?.taxlabel ?? "GST"}: ₹{finalSummary?.gst?.toFixed(2) ?? 0}</p>
                                <p>Discount: ₹{finalSummary.discount.toFixed(2)}</p>
                                <h5 style={{ fontSize: '1.5rem' }}>Grand Total: ₹{finalSummary.totalPrice.toFixed(2)}</h5>

                                {validBooking ? (
                                    <button onClick={callbooking} className="btn btn-success w-100">Book Now</button>
                                ) : (
                                    <>
                                        <button className="btn btn-secondary w-100" disabled>Book Now</button>
                                        <button onClick={callEnquiry} className="btn btn-outline-warning w-100 mt-2">Enquiry</button>
                                        {error && (
                                            <p className="text-danger mt-2 text-center" style={{ fontSize: '0.85rem' }}>
                                                {error}
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
