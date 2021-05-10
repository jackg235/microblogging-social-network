import React from 'react';
import {LoginForm} from './LoginForm'
import '../../static/stylesheets/Welcome.css'
import {RegistrationForm} from './RegistrationForm';
import {connect} from 'react-redux'
import {logout} from '../../slices/actions/AuthenticationActions'

class Welcome extends React.Component {

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
    return ({
        logout: () => dispatch(logout())
    })
}

const welcome = connect(null, mapDispatchToProps)(Welcome)
export default welcome