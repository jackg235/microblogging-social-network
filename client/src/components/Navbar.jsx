import React from 'react'
import { connect } from 'react-redux'
import RouteProtector from '../hoc/RouteProtector'
import { Redirect } from 'react-router-dom'
import '../static/stylesheets/Navbar.css'
import SearchBar from './SearchBar'

class Navbar extends React.Component {
    constructor(props) {
      super(props)
  }


    render() {
        return (
          <nav className="mb-1 navbar navbar-expand-lg navbar-dark orange lighten-1">
            <a className="navbar-brand" href="#"><b>CIS 557 Microblogging</b></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555"
              aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent-555">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Dashboard
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Chat</a>
                </li>
              </ul>
              <div uk-dropdown="mode: click" >
                    <SearchBar  />
                </div>
            </div>
          </nav>
                  )
           }
          }
        

export default Navbar