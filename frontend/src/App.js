import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import UsersScreen from './screens/UsersScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import { USER_LOGIN, USER_LOGOUT, WAKEUP } from './constants/actionConstants'
import { AppContext } from './context'
import axios from 'axios'
import { path } from './constants/pathConstants'
import ProfileScreen from './screens/ProfileScreen'
import PostsScreen from './screens/PostsScreen'
import CreatePostScreen from './screens/CreatePostScreen'
import OtherProfileScreen from './screens/OtherProfileScreen'
import NotificationsScreen from './screens/NotificationsScreen'
import FriendsScreen from './screens/FriendsScreen'
import MessageBoard from './components/MessageBoard'
import QueryScreen from './screens/QueryScreen'
import TripsScreen from './screens/TripsScreen'
import TopUsersScreen from './screens/TopUsersScreen'

const App = () => {
  const [userInfo, setUserInfo] = useState()

  const dispatchEvents = async (action, payload) => {
    switch (action) {
      case USER_LOGIN:
        const { data } = await axios.post(`${path}/login`, payload)
        localStorage.setItem('userInfo', JSON.stringify(data))
        setUserInfo(data)
        return
      case WAKEUP:
        if (!userInfo && JSON.parse(localStorage.getItem('userInfo')) != null) {
          let user = JSON.parse(localStorage.getItem('userInfo'))
          dispatchEvents(USER_LOGIN, {
            username: user.username,
            password: user.password,
          })
        }
        return
      case USER_LOGOUT:
        setUserInfo()
        localStorage.removeItem('userInfo')
        return
    }
  }
  useEffect(() => {
    dispatchEvents(WAKEUP)
  }, [])

  return (
    <AppContext.Provider value={{ userInfo, dispatchEvents }}>
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/users' component={UsersScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/profile' component={ProfileScreen} exact />
            <Route path='/posts' component={PostsScreen} />
            <Route path='/createpost' component={CreatePostScreen} />
            <Route path='/profile/:id' component={OtherProfileScreen} exact />
            <Route path='/notifications' component={NotificationsScreen} />
            <Route path='/friends' component={FriendsScreen} />
            <Route path='/messages/:id' component={MessageBoard} />
            <Route path='/query' component={QueryScreen} />
            <Route path='/trips' component={TripsScreen} />
            <Route path='/topUsers' component={TopUsersScreen} />
          </Container>
        </main>
      </Router>
    </AppContext.Provider>
  )
}

export default App
