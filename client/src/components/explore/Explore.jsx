import React from 'react';
import RouteProtector from '../../hoc/RouteProtector';
import {Redirect} from 'react-router-dom';
import Navbar from '../Navbar';
import DefaultProPic from '../../default_propic.jpg';
import User from '../user/User';
import ExploreCol from './ExploreCol';
import TextField from '@material-ui/core/TextField';
import { Divider, Grid } from '@material-ui/core';

import {connect} from 'react-redux';
import {getContacts, getSuggested} from '../../slices/actions/AuthenticationActions'

class Explore extends React.Component {
    constructor(props) {
        super(props);
    }

    getFollowers() {
        return this.props.auth.followers;
    }

    getFollowing() {
        return this.props.auth.following;
    }

    getSuggested() {
        return this.props.auth.suggestedUsers;
    }

    componentDidMount() {
        this.props.getContacts(this.props.auth.username)
        this.props.getSuggested(this.props.auth.username)
    }

    render() {

        const { auth } = this.props

        if (!auth.authenticated) {
            return <Redirect to='/'/>
        }

        return (
            <div>
                <Navbar/>
                <span>&nbsp;</span>
                <Grid container spacing={3} direction="row">
                    <Grid item xs={2}>
                        <h1>Explore</h1>        
                    </Grid>
                </Grid>
                <span>&nbsp;</span>
                <Grid container direction="row" justify="space-evenly" alignItems="stretch">
                    <ExploreCol type="followers" users={this.getFollowers()} original={this.getFollowers()} />
                    <ExploreCol type="following" users={this.getFollowing()} original={this.getFollowing()} />
                    <ExploreCol type="suggested" users={this.getSuggested()} original={this.getSuggested()} />
                </Grid>
            </div>      
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

function mapDispatchToProps(dispatch) {
    return ({
        getContacts: (username) => dispatch(getContacts(username)),
        getSuggested: (username) => dispatch(getSuggested(username))
    })
}

const ExploreConnected = connect(mapStateToProps, mapDispatchToProps)(Explore)
export default RouteProtector(ExploreConnected);