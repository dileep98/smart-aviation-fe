import { useState, useContext } from 'react';
import axios from 'axios'
import { API_URL } from '../config';
import { AiOutlineRight } from 'react-icons/ai';
import { AppContext } from '../App';
import Loader from '../Utils/Loader';
import notify from '../Utils/Toast';

const Home = () => {

    const { user, token } = useContext(AppContext);

    const [searchResults, setSearchResults] = useState([]);
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const handleOriginChange = (event) => {
        setOrigin(event.target.value);
    };

    const handleDestinationChange = (event) => {
        setDestination(event.target.value);
    };

    const handleDepartureDateChange = (event) => {
        setDepartureDate(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true)
        axios.get(`${API_URL}/flights/search?origin=${origin}&destination=${destination}&departureDate=${departureDate}`, {
            headers: {
                Authorization: `Bearer ${token?.accessToken}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    setSearchResults(res?.data)
                }
            })
            .catch(err => {
                notify(err?.message, 'e')
                console.error(err)
            })
            .finally(() => setIsLoading(false))
    }

    const convertDate = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);

        const year = dateTime.getFullYear();
        const month = dateTime.getMonth() + 1;
        const day = dateTime.getDate();
        const hours = dateTime.getHours();
        const minutes = (dateTime.getMinutes() < 10 ? '0' : '') + dateTime.getMinutes()

        return `${month}/${day}/${year} ${hours}:${minutes}`;
    }

    const CheckBoxHandler = ({ target }, flightId) => {
        axios.post(`${API_URL}/user-flight-pref`, {
            "enabled": target.checked,
            "flightId": flightId,
            "userId": user.id
        }, {
            headers: {
                Authorization: `Bearer ${token?.accessToken}`
            }
        })
            .then(res => {
                if (res.status === 200) {
                    if (target.checked) {
                        notify('Saved', 's')
                    } else {
                        notify('Removed', 's')
                    }
                }
            })
            .catch(err => {
                notify(err?.message, 'e')
                console.error(err)
            })
    }

    return (
        <>
            <div className="card m-5">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-4 mb-3">
                                <label htmlFor="origin" className="form-label">
                                    Origin
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="origin"
                                    placeholder="Enter origin"
                                    value={origin}
                                    onChange={handleOriginChange}
                                />
                            </div>
                            <div className="col-4 mb-3">
                                <label htmlFor="destination" className="form-label">
                                    Destination
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="destination"
                                    placeholder="Enter destination"
                                    value={destination}
                                    onChange={handleDestinationChange}
                                />
                            </div>
                            <div className="col-4 mb-3">
                                <label htmlFor="departureDate" className="form-label">
                                    Departure Date
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="departureDate"
                                    value={departureDate}
                                    onChange={handleDepartureDateChange}
                                />
                            </div>
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-outline-primary" disabled={isLoading}>Search</button>
                        </div>
                    </form>
                </div>
            </div>
            {isLoading
                ? <div className='d-flex justify-content-center align-items-center pt-5'><Loader />&nbsp;Searching..</div>
                : searchResults.length >= 1
                && <div className="container">
                    <h5 className="mt-4 mb-4">Avilable Flights</h5>
                    <div className="row row-cols-1 row-cols-12 g-4">
                        {searchResults.map((flight, index) => (
                            <div className="col" key={flight.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {flight.originCode} <AiOutlineRight className='pb-1 text-muted' /> {flight.destinationCode}
                                        </h5>
                                        <h6 className="card-subtitle mb-2 text-muted">
                                            {flight.originName} - {flight.destinationName}
                                        </h6>
                                        <p className="card-text">{convertDate(flight.departureDateTime)} &nbsp; <span class="badge bg-secondary">${flight.price}</span></p>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" onClick={(e) => CheckBoxHandler(e, flight.id)} id={`${index}`} />
                                            <label className="form-check-label" htmlFor={`${index}`}>
                                                Enable Notifications for this flight
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}

export default Home