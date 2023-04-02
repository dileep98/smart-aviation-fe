import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'

function Home() {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState({});
    const [searchError, setSearchError] = useState({
        error: false,
        message: ''
    });
    const [flightsData, setFlightsData] = useState([]);

    useEffect(() => {
        axios.get('/data.json')
            .then(res => {
                setFlightsData(res?.data?.response)
                console.log(res?.data?.response);
            })
            .catch(err => console.error(err))
    }, [])


    function handleSearch(event) {
        event.preventDefault();
        const data = flightsData.find(i => i.flight_number === searchTerm)
        if (data) {
            setSearchResults(data);
        } else {
            setSearchError({
                error: true,
                message: `No flights found with flight number ${searchTerm}`
            })
        }
    }

    function handleLogout() {
        navigate('/')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/home">SMART AVIATION</a>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="container my-5">
                <form onSubmit={handleSearch}>
                    <div className="input-group mb-3">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Search for flights..."
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                        <button className="btn btn-primary" type="submit">
                            Search
                        </button>
                    </div>
                </form>
                <div className="row">
                    {Object.keys(searchResults).length >= 1 &&
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{searchResults.flight_number}</h5>
                                    <p className="card-text">{searchResults.flight_icao}</p>
                                    <p className="card-text">{searchResults.flight_iata}</p>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label class="form-check-label" for="flexCheckDefault">
                                            Enable notifications for this flight
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Home;
