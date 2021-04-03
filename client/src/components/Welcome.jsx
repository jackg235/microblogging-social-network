import React from 'react';
import {LoginForm} from './LoginForm'
import '../static/stylesheets/Welcome.css'
import {RegistrationForm} from './RegistrationForm';
import ReturnProtector from '../hoc/ReturnProtector'
import {connect} from 'react-redux'
import {logout} from '../slices/actions/AuthenticationActions'

class Welcome extends React.Component {

    callAPI() {
        fetch("http://localhost:5000/testAPI")
            .then(res => res.text())
            .then(res => {
                console.log(res)
                this.setState({apiResponse: res})
            })
            .catch(err => console.log(err));
    }

    render() {
        const props = this.props;
        if (props.page === 'Login') {
            return (
                <div className='welcome-page'>
                    <LoginForm/>
                </div>
            )
        }
        if (props.page === 'Registration') {
            return (
                <div className='welcome-page'>
                    <RegistrationForm/>
                </div>
            )
        }
    }
}

function mapDispatchToProps(dispatch) {
    console.log('dispatching')
    return ({
        logout: () => dispatch(logout())
    })
}

const welcome = connect(null, mapDispatchToProps)(Welcome)
export default welcome