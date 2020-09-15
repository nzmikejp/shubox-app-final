import React, { Component } from 'react';
import { Router, Match } from "@reach/router"
import RouteWelcome from './RouteWelcome'
import RouteLogin from './RouteLogin'
import RouteAddUser from './RouteAddUser'
import RouteTypes from './RouteTypes'
import RouteSingleType from './RouteSingleType'
import RouteListings from './RouteListings'
import RouteListingDescription from './RouteListingDescription'
import RouteAddListing from './RouteAddListing'
import RouteUpdateListing from './RouteUpdateListing'
import RouteProfile from './RouteProfile'
import RouteUpdateUser from './RouteUpdateUser'
import Footer from './Footer'
import './assets/css/style.css';
import API from './API';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      currentUser: null
    }
  }

  setCurrentUser = (user) => {
    this.setState({currentUser: user})
  }

  componentDidMount(){
    var userId = localStorage.getItem('userId')
    if(userId){
      API.getSingleUser(userId).then(res => this.setState({currentUser:res.data}))
    }
  }


  render(){
    var footerRoutes = ['types', 'listings', 'listing/:id/description', 'listings/create', 'listings/:id/edit', 'user/profile', 'users/:id/edit', 'types/:id']
    var {currentUser} = this.state

    return (
      <div className="App">
        <Router>
          <RouteWelcome path="/" />
          <RouteLogin path="users/authenticate" setCurrentUser={this.setCurrentUser}/>
          <RouteAddUser path="users/create" />
          <RouteTypes path="types" />
          <RouteSingleType path="types/:id" />
          <RouteListings path="listings" />
          <RouteListingDescription path="listing/:id/description" />
          {currentUser ? <RouteAddListing path="listings/create" /> : null}
          {currentUser ? <RouteUpdateListing path="listings/:id/edit" /> : null}
          {currentUser ? <RouteProfile path="user/profile" currentUser={currentUser} /> : null}
          {currentUser ? <RouteUpdateUser path="users/:id/edit" /> : null}
          <RouteWelcome default />
        </Router>
        {
          footerRoutes.map(route => {
            return (
              <Match path={route}>
                {props =>
                  props.match ? (
                    <Footer currentUser={currentUser}/>
                  ) : null
                }
                </Match>
              )
            })
          }
      </div>
    );
  }
}

export default App;
