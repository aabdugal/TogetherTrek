import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { path } from '../constants/pathConstants'
import Trip from '../components/Trip'
const TripsScreen = () => {
  const [trips, setTrips] = useState([])
  useEffect(async () => {
    const { data } = await axios.get(`${path}/trips`)
    console.log(data)
    setTrips(data)
  }, [])
  return (
    <div>
      <h1>Friend Trips:</h1>
      {trips.map((el) => (
        <Trip key={el.trip_id} trip={el} />
      ))}
    </div>
  )
}

export default TripsScreen
