import React, {
    Component
} from 'react';
import {
    Redirect
} from 'react-router';
import TokenManagement from '../TokenManagement'
import {connect} from 'react-redux'
import {authenticate} from '../slices/actions/AuthenticationActions'

// PROTECTS ROUTES BY ONLY ALLOWING ACCESS IF A USER IS LOGGED IN
export default function RouteProtector(ComponentToRender) {
    class CompWrapper extends Component {

        constructor(props) {
            super(props)
            this.props.authenticate()
        }

        state = {
            redirect: false,
            isLoading: true
        }


        render() {
            const {authenticated} = this.props
            console.log(authenticated)
            if (!authenticated) {
                return <Redirect to="/"/>
            }
            return (<ComponentToRender {...this.props}/>);
        }
    };

    function mapStateToProps(state) {
        const {authenticated} = state.auth;
        console.log(state.auth)
        return {authenticated}
    }

    function mapDispatchToProps(dispatch) {
        return {
            authenticate: () => dispatch(authenticate())
        }
    }

    const Wrapper = connect(mapStateToProps, mapDispatchToProps)(CompWrapper);

    return Wrapper;
}