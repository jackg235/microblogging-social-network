import React from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../slices/actions/AuthenticationActions'

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            first: '',
            last: '',
            email: '',
            password: '',
            username: '',
            error: null,
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState({submitted: true})
        const {email, password, first, last, username} = this.state;
        this.props.submitForm(email, password, first, last, username)
    }

    render() {
        const {error, authenticated} = this.props;
        if (authenticated) {
            return <Redirect to="/"/>
        }
        if (error) {
            return (
                <div className='registration-form'>
                    <div className="uk-alert-danger" uk-alert="true">
                        <a className="uk-alert-close" uk-close="true"/>
                        <p>{error}</p>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <h3>Create an Account</h3>
                        <div className="row">
                            <div className="col">
                                <div className="form-group text-left">
                                    <label>First</label>
                                    <input onChange={this.handleChange} id='first' type="text" className="form-control"
                                           placeholder="First name" required/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group text-left">
                                    <label>Last</label>
                                    <input onChange={this.handleChange} id='last' type="text" className="form-control"
                                           placeholder="Last name" required/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group text-left">
                            <label>Email address</label>
                            <input onChange={this.handleChange} id='email' type="email" className="form-control"
                                   placeholder="Email" required/>
                        </div>
                        <div className="form-group text-left">
                            <label>Username</label>
                            <input onChange={this.handleChange} id='username' type="text" className="form-control"
                                   placeholder="Username" required/>
                        </div>

                        <div className="form-group text-left">
                            <label>Password</label>
                            <input onChange={this.handleChange} id='password' type="password" className="form-control"
                                   placeholder="Password" required/>
                        </div>

                        <div className="form-group text-left">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <button id="submit-btn" type="submit" className="btn btn-primary btn-block">Submit</button>
                        <p className="forgot-password text-right">
                            Already have an account? <a href="/login">Log in here.</a>
                        </p>
                    </form>
                </div>
            )
        } else {
            return (
                <div className='registration-form'>
                    <form onSubmit={this.handleSubmit}>
                        <h3>Create an Account</h3>
                        <div className="row">
                            <div className="col">
                                <div className="form-group text-left">
                                    <label>First</label>
                                    <input onChange={this.handleChange} id='first' type="text" className="form-control"
                                           placeholder="First name" required/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group text-left">
                                    <label>Last</label>
                                    <input onChange={this.handleChange} id='last' type="text" className="form-control"
                                           placeholder="Last name" required/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group text-left">
                            <label>Email address</label>
                            <input onChange={this.handleChange} id='email' type="email" className="form-control"
                                   placeholder="Email" required/>
                        </div>

                        <div className="form-group text-left">
                            <label>Username</label>
                            <input onChange={this.handleChange} id='username' type="text" className="form-control"
                                   placeholder="Username" required/>
                        </div>

                        <div className="form-group text-left">
                            <label>Password</label>
                            <input onChange={this.handleChange} id='password' type="password" className="form-control"
                                   placeholder="Password" required/>
                        </div>

                        <div className="form-group text-left">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        <p className="forgot-password text-right">
                            Already have an account? <a href="/login">Log in here.</a>
                        </p>
                    </form>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    const {authenticated, error} = state.auth;
    return {authenticated, error}
}

function mapDispatchToProps(dispatch) {
    return ({
        submitForm: (email, password, first, last, username) => dispatch(register(email, password, first, last, username))
    })
}

const Form = connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

export {Form as RegistrationForm};