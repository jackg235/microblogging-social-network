import React from 'react';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {login} from '../slices/actions/AuthenticationActions'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: null,
            submitted: false,
            authenticated: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    handleSubmit(e) {
        console.log(this.state)
        e.preventDefault()
        this.setState({submitted: true})
        this.props.submitForm(this.state.email, this.state.password)
    }

    render() {
        const {error, authenticated} = this.props;
        if (authenticated) {
            return <Redirect to="/home"/>;
        }
        if (error) {
            return (
                <div className='login-form'>
                    <div className="uk-alert-danger" uk-alert="true">
                        <a className="uk-alert-close" uk-close="true"/>
                        <p>{error}</p>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <h3>Sign In</h3>

                        <div className="form-group text-left">
                            <label>Email address</label>
                            <input onChange={this.handleChange} id='email' type="email" className="form-control"
                                   placeholder="Enter email" required/>
                        </div>

                        <div className="form-group text-left">
                            <label>Password</label>
                            <input onChange={this.handleChange} id='password' type="password" className="form-control"
                                   placeholder="Enter password" required/>
                        </div>
                        <div className="form-group text-left">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        <div class="row">
                            <div class="col">
                                <p className="register text-left">
                                    Need an account? <a href="/register">Register here</a>
                                </p>
                            </div>
                            <div class="col">
                                <p className="forgot-password text-right">
                                    <a href="#">I forgot my password</a>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
        return (
            <div className='login-form'>
                <form onSubmit={this.handleSubmit}>
                    <h3>Sign In</h3>

                    <div className="form-group text-left">
                        <label>Email address</label>
                        <input onChange={this.handleChange} id='email' type="email" className="form-control"
                               placeholder="Enter email" required/>
                    </div>

                    <div className="form-group text-left">
                        <label>Password</label>
                        <input onChange={this.handleChange} id='password' type="password" className="form-control"
                               placeholder="Enter password" required/>
                    </div>
                    <div className="form-group text-left">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <div className="row">
                        <div className="col">
                            <p className="register text-left">
                                Need an account? <a href="/register">Register here</a>
                            </p>
                        </div>
                        <div className="col">
                            <p className="forgot-password text-right">
                                <a href="#">I forgot my password</a>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {authenticated, error} = state.auth;
    return {authenticated, error}
}

function mapDispatchToProps(dispatch) {
    console.log('dispatching')
    return ({
        submitForm: (email, password) => dispatch(login(email, password))
    })
}

const Form = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export {Form as LoginForm};