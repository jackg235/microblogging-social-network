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
import {getContacts} from '../../slices/actions/AuthenticationActions'

const followersMock = [
    {
        userImg: DefaultProPic,
        username: 'user1',
        firstName: 'F1',
        lastName: 'L1',
        regDate: '04/07/21',
        followers: [],
        following: [],
        blocking: [],
        hidden: [],
    },
    {
        userImg: DefaultProPic,
        username: 'user2',
        firstName: 'F2',
        lastName: 'L2',
        regDate: '04/08/21',
        followers: [],
        following: [],
        blocking: [],
        hidden: [],
    },{
        userImg: DefaultProPic,
        username: 'user3',
        firstName: 'F3',
        lastName: 'L3',
        regDate: '04/09/21',
        followers: [],
        following: [],
        blocking: [],
        hidden: [],
    },
    {
        userImg: DefaultProPic,
        username: 'user322r23r4',
        firstName: 'F4',
        lastName: 'L4',
        regDate: '04/10/21',
        followers: [],
        following: [],
        blocking: [],
        hidden: [],
    },
    {
        userImg: DefaultProPic,
        username: 'user5',
        firstName: 'F5',
        lastName: 'L5',
        regDate: '04/11/21',
        followers: [],
        following: [],
        blocking: [],
        hidden: [],
    },
];

const followersMock2 = [
    {
        userImg: DefaultProPic,
        username: 'user1',
        firstName: 'F1',
        lastName: 'L1',
        regDate: '04/07/21',
        followers: [],
        following: [],
        blocking: [],
        hidden: [],
    },
    {
        userImg: DefaultProPic,
        username: 'user2',
        firstName: 'F2',
        lastName: 'L2',
        regDate: '04/08/21',
        followers: [],
        following: [],
        blocking: [],
        hidden: [],
    },{
        userImg: DefaultProPic,
        username: 'user3',
        firstName: 'F3',
        lastName: 'L3',
        regDate: '04/09/21',
        followers: [],
        following: [],
        blocking: [],
        hidden: [],
    },
    {
        userImg: DefaultProPic,
        username: 'user322r23r4',
        firstName: 'F4',
        lastName: 'L4',
        regDate: '04/10/21',
        followers: [],
        following: [],
        blocking: [],
        hidden: [],
    },
    {
        userImg: DefaultProPic,
        username: 'user5',
        firstName: 'F5',
        lastName: 'L5',
        regDate: '04/11/21',
        followers: [],
        following: [],
        blocking: [],
        hidden: [],
    },
    {
        userImg: DefaultProPic,
        username: 'user6',
        firstName: 'bryan',
        lastName: 'Nguyen3',
        regDate: '04/11/21',
        followers: [],
        following: [],
        blocking: [],
        hidden: [],
    },
];

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
        // do something to return array of suggested users
        return [];
    }

    componentDidMount() {
        this.props.getContacts(this.props.auth.username)
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
        getContacts: (username) => dispatch(getContacts(username))
    })
}

const ExploreConnected = connect(mapStateToProps, mapDispatchToProps)(Explore)
export default RouteProtector(ExploreConnected);