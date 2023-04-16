import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios'


const Home = () => {

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState({});
    const [searchError, setSearchError] = useState({
        error: false,
        message: ''
    });
    const [flightsData, setFlightsData] = useState([]);
    const [showActions, setShowActions] = useState(false);

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

    const ActionNavToggleHandler = () => {
        setShowActions(!showActions)
    }

    return (
        <div className='d-flex'>
            <main className="container my-5" style={{ flex: '1', overflow: 'auto' }}>
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
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" for="flexCheckDefault">
                                            Enable notifications for this flight
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </main>
        </div>
    )
}

export default Home