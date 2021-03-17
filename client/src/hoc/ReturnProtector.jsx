import React, {Component} from 'react'
import {Redirect} from 'react-router'
import TokenManagement from '../TokenManagement'
import { connect } from 'react-redux'

export default function ReturnProtector(ComponentToRender) {
    class CompWrapper extends Component {
        state = {
            redirect : false,
            isLoading : true
        }

        componentDidMount() {
            const {loggedIn} = this.props
            if (loggedIn) {
                this.setState({
                    redirect : true,
                    isLoading : false
                })
            }
            else {
                this.setState({
                    redirect : false,
                    isLoading : false
                })
            }
        }
        render() {
            const { redirect } = this.state
            if (redirect) {
                return <Redirect to="/home" />
            }
            return ( <ComponentToRender {...this.props}/>);
        }
    }

    function mapStateToProps(state) {
        const { loggedIn } = state.auth
        return { loggedIn }
    }
    const Wrapper = connect(mapStateToProps)(CompWrapper)
    return Wrapper
}