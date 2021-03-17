import React from 'react'
import SearchBar from './SearchBar'
import { connect } from 'react-redux'
import RouteProtector from '../hoc/RouteProtector'
import { logout } from '../slices/Authentification'
import { Redirect } from 'react-router-dom'
import Navbar from './Navbar'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            students: ['Jack', 'Tom', 'Cantwell', 'Frankel', 'John', 'James', 'Johnnie', 'Greg'],
            first : '',
            last : '',
            email : ''
        }
        this.logoutClick = this.logoutClick.bind(this)
    }

    componentDidMount() {
        
    }

    logoutClick() {
        this.props.logoutUser()
    }

    render() {
        const { first, last, email, authenticated } = this.props
        if (!authenticated) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <Navbar />
                <div>
                    <p>My first name is {first}</p>
                    <p>My last name is {last}</p>
                    <p>My email is {email}</p>
                    <button onClick={this.logoutClick}>Click me to log out</button>
                </div>
                <div>
                </div>
               
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { first, last, email } = state.auth
    console.log(first)
    return { first, last, email } 
}

function mapDispatchToProps(dispatch) {
    return ({
        logoutUser : () => dispatch(logout())
    })
}

const HomeConnected = connect(mapStateToProps, mapDispatchToProps)(Home)
export default RouteProtector(HomeConnected)