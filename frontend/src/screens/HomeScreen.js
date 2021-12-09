import { React, useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
import { AppContext } from '../context'
const HomeScreen = () => {
  const { userInfo } = useContext(AppContext)
  // console.log(JSON.parse(user))
  console.log(userInfo)
  return (
    <div>
      <Row>
        <Col>
          <div className='py-3'>
            Travelling alone while abroad is fairly standard, but it can be
            unsafe to do so. Because of this, many solo travellers have taken to
            finding people to travel with wherever they may be in their journey.
            TogetherTrek makes this process easy by offering users ways to match
            with like-minded individuals in a safe and secure way. This is done
            through creating and sharing travel itineraries or finding others
            using the service near you. While there are many other services that
            allow users to find travel partners, like Gaffl, TogetherTrek is one
            of, if not the only, one that offers real-time safety features, trip
            budgeting, and groups of more than just 2 people.
          </div>
          <div>
            If login doesn't work, backend probably crashed. You can check its
            status there: https://still-thicket-45274.herokuapp.com/
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default HomeScreen
