import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App';
import axios from 'axios';
import { API_URL } from '../config';
import { AiOutlineRight } from 'react-icons/ai';
import Loader from '../Utils/Loader';
import notify from '../Utils/Toast';

const SavedFlights = () => {

  const { user, token } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false)
  const [SavedFlights, setSavedFlights] = useState(
    [
      {
        "id": "14385-2307131200--32090-0-9828-2307131305",
        "originName": "Munich",
        "originCode": "MUC",
        "destinationName": "Berlin Brandenburg",
        "destinationCode": "BER",
        "stopCount": 0,
        "departureDateTime": [
          2023,
          7,
          13,
          12,
          0
        ],
        "arrivalDateTime": [
          2023,
          7,
          13,
          13,
          5
        ],
        "carrierName": "Lufthansa",
        "price": 113.05,
        "userId": null
      },
      {
        "id": "14385-2307131400--32090-0-9828-2307131505",
        "originName": "Munich",
        "originCode": "MUC",
        "destinationName": "Berlin Brandenburg",
        "destinationCode": "BER",
        "stopCount": 0,
        "departureDateTime": [
          2023,
          7,
          13,
          14,
          0
        ],
        "arrivalDateTime": [
          2023,
          7,
          13,
          15,
          5
        ],
        "carrierName": "Lufthansa",
        "price": 98.36,
        "userId": null
      },
      {
        "id": "14385-2307130900--32090-0-9828-2307131005",
        "originName": "Munich",
        "originCode": "MUC",
        "destinationName": "Berlin Brandenburg",
        "destinationCode": "BER",
        "stopCount": 0,
        "departureDateTime": [
          2023,
          7,
          13,
          9,
          0
        ],
        "arrivalDateTime": [
          2023,
          7,
          13,
          10,
          5
        ],
        "carrierName": "Lufthansa",
        "price": 102.88,
        "userId": null
      },
      {
        "id": "14385-2307132000--32090-0-9828-2307132105",
        "originName": "Munich",
        "originCode": "MUC",
        "destinationName": "Berlin Brandenburg",
        "destinationCode": "BER",
        "stopCount": 0,
        "departureDateTime": [
          2023,
          7,
          13,
          20,
          0
        ],
        "arrivalDateTime": [
          2023,
          7,
          13,
          21,
          5
        ],
        "carrierName": "Lufthansa",
        "price": 120.97,
        "userId": null
      },
      {
        "id": "14385-2307132130--32090-0-9828-2307132235",
        "originName": "Munich",
        "originCode": "MUC",
        "destinationName": "Berlin Brandenburg",
        "destinationCode": "BER",
        "stopCount": 0,
        "departureDateTime": [
          2023,
          7,
          13,
          21,
          30
        ],
        "arrivalDateTime": [
          2023,
          7,
          13,
          22,
          35
        ],
        "carrierName": "Lufthansa",
        "price": 113.05,
        "userId": null
      },
      {
        "id": "14385-2307130700--32090-0-9828-2307130805",
        "originName": "Munich",
        "originCode": "MUC",
        "destinationName": "Berlin Brandenburg",
        "destinationCode": "BER",
        "stopCount": 0,
        "departureDateTime": [
          2023,
          7,
          13,
          7,
          0
        ],
        "arrivalDateTime": [
          2023,
          7,
          13,
          8,
          5
        ],
        "carrierName": "Lufthansa",
        "price": 98.36,
        "userId": null
      },
      {
        "id": "14385-2307131700--32090-0-9828-2307131805",
        "originName": "Munich",
        "originCode": "MUC",
        "destinationName": "Berlin Brandenburg",
        "destinationCode": "BER",
        "stopCount": 0,
        "departureDateTime": [
          2023,
          7,
          13,
          17,
          0
        ],
        "arrivalDateTime": [
          2023,
          7,
          13,
          18,
          5
        ],
        "carrierName": "Lufthansa",
        "price": 183.15,
        "userId": null
      },
      {
        "id": "14385-2307130800--32090-0-9828-2307130905",
        "originName": "Munich",
        "originCode": "MUC",
        "destinationName": "Berlin Brandenburg",
        "destinationCode": "BER",
        "stopCount": 0,
        "departureDateTime": [
          2023,
          7,
          13,
          8,
          0
        ],
        "arrivalDateTime": [
          2023,
          7,
          13,
          9,
          5
        ],
        "carrierName": "Lufthansa",
        "price": 98.36,
        "userId": null
      },
      {
        "id": "14385-2307131045--32090-0-9828-2307131150",
        "originName": "Munich",
        "originCode": "MUC",
        "destinationName": "Berlin Brandenburg",
        "destinationCode": "BER",
        "stopCount": 0,
        "departureDateTime": [
          2023,
          7,
          13,
          10,
          45
        ],
        "arrivalDateTime": [
          2023,
          7,
          13,
          11,
          50
        ],
        "carrierName": "Lufthansa",
        "price": 98.36,
        "userId": null
      },
      {
        "id": "14385-2307131800--32090-0-9828-2307131905",
        "originName": "Munich",
        "originCode": "MUC",
        "destinationName": "Berlin Brandenburg",
        "destinationCode": "BER",
        "stopCount": 0,
        "departureDateTime": [
          2023,
          7,
          13,
          18,
          0
        ],
        "arrivalDateTime": [
          2023,
          7,
          13,
          19,
          5
        ],
        "carrierName": "Lufthansa",
        "price": 131.14,
        "userId": null
      }
    ])

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${API_URL}/flights/user/${user.id}`, {
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
  }, [])

  const convertDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);

    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const day = dateTime.getDate();
    const hours = dateTime.getHours();
    const minutes = (dateTime.getMinutes() < 10 ? '0' : '') + dateTime.getMinutes()

    return `${month}/${day}/${year} ${hours}:${minutes}`;
  }

  return (
    <>
      {isLoading
        ? <div className='d-flex justify-content-center align-items-center pt-5'><Loader />&nbsp;Loading..</div>
        : SavedFlights.length >= 1
          ? <div className="container">
            <h5 className="mt-4 mb-4">Saved Flights</h5>
            <div className="row row-cols-1 row-cols-12 g-4">
              {SavedFlights.map((flight) => (
                <div className="col" key={flight.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">
                        {flight.originCode} <AiOutlineRight className='pb-1 text-muted' /> {flight.destinationCode}
                      </h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {flight.originName} - {flight.destinationName}
                      </h6>
                      <p className="card-text">{convertDate(flight.departureDateTime)} &nbsp; <span className="badge bg-secondary">${flight.price}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          : <div className='d-flex justify-content-center align-items-center pt-5'>No saved Flights!</div>
      }
    </>
  )
}

export default SavedFlights