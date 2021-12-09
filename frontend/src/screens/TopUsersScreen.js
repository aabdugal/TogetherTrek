import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { path } from '../constants/pathConstants'
const TopUsersScreen = () => {
  const [info, setInfo] = useState(null)

  useEffect(async () => {
    const { data } = await axios.get(`${path}/info`)
    console.log(data)
    setInfo(data)
  }, [])
  return (
    <div>
      <h1>Interesting Facts:</h1>
      {info && (
        <>
          <h4>
            - {info[0].author_id} has most expensive plans with $
            {info[0].sum_budget} as his total posts budget!
          </h4>
          <h4>
            - {info[1].author_id} posted the most with {info[1].cnt_author}{' '}
            posts!
          </h4>
          <h4>- {info[2].city} is the most wanted city!</h4>
          <h4>- {info[3].country} is the most wanted country!</h4>
          <h4>
            - {info[4].cnt >= info[5].cnt ? info[4].user1 : info[5].user2} has
            the most friends! He has{' '}
            {info[4].cnt >= info[5].cnt ? info[4].cnt : info[5].cnt} friends!
          </h4>
        </>
      )}
    </div>
  )
}

export default TopUsersScreen
