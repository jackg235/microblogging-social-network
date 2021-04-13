import React from 'react';
import {connect} from 'react-redux';
import RouteProtector from '../hoc/RouteProtector';
import {logout} from '../slices/actions/AuthenticationActions';
import {Redirect} from 'react-router-dom';
import Navbar from './Navbar';
import DefaultProPic from '../default_propic.jpg';
import User from './user/User';
import ExploreCol from './explore/ExploreCol';
import TextField from '@material-ui/core/TextField';
import { Divider, Grid } from '@material-ui/core';

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
        this.logoutClick = this.logoutClick.bind(this);
    }

    getFollowers() {
        // do something to get Arr of User
        return followersMock;
    }

    getFollowing() {
        // do something to get Arr of User
        return followersMock;
    }

    getSuggested() {
        // do something to get a suggested Arr of User
        return followersMock2;
    }

    logoutClick() {
        this.props.logoutUser();
    }

    render() {
        // if (!this.props.authenticated) {
        //     return <Redirect to='/'/>
        // }

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

// function mapStateToProps(state) {
//     const {first, last, email, username, authenticated} = state.auth;
//     return {first, last, email, username, authenticated};
// }

// function mapDispatchToProps(dispatch) {
//     return ({
//         logoutUser: () => dispatch(logout())
//     })
// }

// const ExploreConnected = connect(mapStateToProps, mapDispatchToProps)(Explore)
// export default RouteProtector(ExploreConnected);

export default Explore;