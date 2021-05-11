import React from 'react'
import {connect} from 'react-redux'
import RouteProtector from '../hoc/RouteProtector'
import {Redirect} from 'react-router-dom'
import '../static/stylesheets/Navbar.css'
import SearchBar from './SearchBar'
import {logout} from "../slices/actions/AuthenticationActions";
import {getAllPosts} from "../slices/actions/PostActions";
import {getAllUsernames} from "../slices/actions/UserActions";

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.logoutClick = this.logoutClick.bind(this)
    }
    logoutClick() {
        this.props.logoutUser()
    }

    render() {
        const {
          auth: {
            username,
          }
        } = this.props;
        const userProfileLink = "/profile/" + username;

        return (
            <nav className="mb-1 navbar navbar-expand-lg navbar-dark orange lighten-1">
                <a className="navbar-brand" href="http://localhost:3000/home"><b>CIS 557 Microblogging</b></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent-555"
                        aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent-555">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/home">Home
                                <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={userProfileLink}>Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/explore">Explore</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/chat">Chat</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/video">Stream</a>
                        </li>
                        <li className="nav-item">
                            <button onClick={this.logoutClick}>Log out</button>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
        
const mapStateToProps = (state) => ({
    auth: state.auth
});

function mapDispatchToProps(dispatch) {
    return ({
        logoutUser: () => dispatch(logout()),
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);