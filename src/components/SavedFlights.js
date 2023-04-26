import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App';
import axios from 'axios';
import { API_URL } from '../config';
import { AiOutlineRight } from 'react-icons/ai';
import Loader from '../Utils/Loader';
import notify from '../Utils/Toast';

const SavedFlights = () => {

  const { user, token, decodedToken } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false)
  const [editingFlight, setEditingFlight] = useState('')
  const [SavedFlights, setSavedFlights] = useState([])
  const [SavedUserFlights, setSavedUserFlights] = useState([])

  useEffect(() => {
    setIsLoading(true)
    switch (decodedToken.roles) {
      case 'ROLE_USER':
        axios.get(`${API_URL}/user-flight-pref/me`, {
          headers: {
            Authorization: `Bearer ${token?.accessToken}`
          }
        })
          .then(res => {
            if (res.status === 200) {
              setSavedUserFlights(res?.data)
            }
          })
          .catch(err => {
            notify(err?.message, 'e')
            console.error(err)
          })
          .finally(() => setIsLoading(false))
        break;
      case 'ROLE_ADMIN':
        axios.get(`${API_URL}/flights`, {
          headers: {
            Authorization: `Bearer ${token?.accessToken}`
          }
        })
          .then(res => {
            if (res.status === 200) {
              setSavedFlights(res?.data)
            }
          })
          .catch(err => {
            notify(err?.message, 'e')
            console.error(err)
          })
          .finally(() => setIsLoading(false))
        break;
      default:
        break;
    }

  }, [user.id, token?.accessToken, decodedToken.roles])

  const convertDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);

    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();
    const hours = dateTime.getHours();
    const minutes = (dateTime.getMinutes() < 10 ? '0' : '') + dateTime.getMinutes()

    return `${month}/${day}/${year} ${hours}:${minutes}`;
  }

  const EditHandler = (id) => {
    setEditingFlight(id)
  }

  const SaveHandler = () => {
    let flight = SavedFlights.find(i => i.id === editingFlight)
    axios.post(`${API_URL}/flights/update`, {
      "id": editingFlight,
      "departureDateTime": flight.departureDateTime,
      "arrivalDateTime": flight.arrivalDateTime
    }, {
      headers: {
        Authorization: `Bearer ${token?.accessToken}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          notify('Flight data saved successfully', 's')
        }
      })
      .catch(err => {
        notify(err?.message, 'e')
        console.error(err)
      })
      .finally(() => setEditingFlight(''))
  }

  const updateDateTimeHandler = (value, action) => {
    let d = [...SavedFlights]
    switch (action) {
      case 'departure':
        d.map(i => {
          if (i.id === editingFlight) {
            i.departureDateTime = value
          }
          return i
        })
        setSavedFlights(d)
        break;
      case 'arrival':
        d.map(i => {
          if (i.id === editingFlight) {
            i.arrivalDateTime = value
          }
          return i
        })
        setSavedFlights(d)
        break;
      default:
        break;
    }
  }

  return (
    <>
      {isLoading
        ? <div className='d-flex justify-content-center align-items-center pt-5'><Loader />&nbsp;Loading..</div>
        : SavedFlights.length >= 1 || SavedUserFlights.length >= 1
          ? <div className="container">
            <h5 className="mt-4 mb-4">Saved Flights</h5>
            {decodedToken.roles === "ROLE_USER"
              && <div className="row row-cols-1 row-cols-12 g-4">
                {SavedUserFlights.map(({ flight }) => (
                  <div className="col" key={flight.id}>
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">
                          {flight.originCode} <AiOutlineRight className='pb-1 text-muted' /> {flight.destinationCode}
                        </h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {flight.originName} - {flight.destinationName}
                        </h6>
                        <p className="card-text">
                          {convertDate(flight.departureDateTime)} &nbsp;
                          <span className="badge bg-secondary">
                            ${flight.price}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>}
            {decodedToken.roles === "ROLE_ADMIN"
              && <div className="row row-cols-1 row-cols-12 g-4">
                {SavedFlights.map((flight) => (
                  <div className="col" key={flight.id}>
                    <div className="card">
                      <div className="card-body">
                        <div className='d-flex justify-content-between'>
                          <h5 className="card-title">
                            {flight.originCode} <AiOutlineRight className='pb-1 text-muted' /> {flight.destinationCode}
                          </h5>
                          {editingFlight !== flight.id
                            ? <button className='btn btn-warning btn-sm' onClick={() => EditHandler(flight.id)}>Edit</button>
                            : <button className='btn btn-primary btn-sm' onClick={SaveHandler}>Save</button>
                          }
                        </div>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {flight.originName} - {flight.destinationName}
                        </h6>
                        {editingFlight === flight.id
                          ? <div>
                            <div className="col-4 mb-3">
                              <label htmlFor="departureDate" className="form-label">
                                Departure Date
                              </label>
                              <input
                                type="datetime-local"
                                className="form-control"
                                id="departureDate"
                                value={flight.departureDateTime}
                                onChange={({ target: { value } }) => updateDateTimeHandler(value, 'departure')}
                              />
                            </div>
                            <div className="col-4 mb-3">
                              <label htmlFor="arrivalDate" className="form-label">
                                Arrival Date
                              </label>
                              <input
                                type="datetime-local"
                                className="form-control"
                                id="arrivalDate"
                                value={flight.arrivalDateTime}
                                onChange={({ target: { value } }) => updateDateTimeHandler(value, 'arrival')}
                              />
                            </div>
                          </div>
                          : <>
                            <p className="card-text m-0">
                              Departure: {convertDate(flight.departureDateTime)}
                            </p>
                            <p className="card-text m-0">
                              Arrival: {convertDate(flight.arrivalDateTime)}
                            </p>
                          </>
                        }
                        <span className="badge bg-secondary">
                          ${flight.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>}
          </div>
          : <div className='d-flex justify-content-center align-items-center pt-5'>No saved Flights!</div>
      }
    </>
  )
}

export default SavedFlights