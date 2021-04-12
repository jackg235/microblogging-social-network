import React from 'react';
import SearchBar from './SearchBar';
import {connect} from 'react-redux';
import RouteProtector from '../hoc/RouteProtector';
import {logout} from '../slices/actions/AuthenticationActions';
import {matchPath, Redirect} from 'react-router-dom';
import Navbar from './Navbar';
import Post from './posts/Post';
import DefaultProPic from '../default_propic.jpg';
import User from './user/User';
import TextField from '@material-ui/core/TextField';
import { Divider, Grid, GridList } from '@material-ui/core';

const styles = {
    grid: {
        // put some stuffs here
    }
};

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

class Explore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            followers: this.getFollowers(),
            following: this.getFollowing(),
            suggested: this.getSuggested()
        }
        this.logoutClick = this.logoutClick.bind(this);
    }

    logoutClick() {
        this.props.logoutUser()
    }

    getFollowers() {
        // do something to get Arr of User
        // dummy data below
        return followersMock;
    }

    getFollowing() {
        // do something to get Arr of User
        return followersMock;
    }

    getSuggested() {
        // do something to get a suggested Arr of User
        return followersMock;
    }

    logoutClick() {
        this.props.logoutUser()
    }

    search(query, userArr) {

        const splitQuery = query.split(' ');
        const matches = [];

        splitQuery.forEach(word => 
            {
                if (word !== '') {
                    userArr.forEach(user => {
                        if (user.firstName.includes(word) || user.lastName.includes(word) || user.username.includes(word)) {
                            if (!matches.includes(user)) {
                                matches.push(user);
                            }
                            else {
                                console.log(user.firstName);
                            }
                        }
                    });
                }
            }
        );
        
        const matchesUserComponents = matches.map((user) => <User user={user}/>)
        console.log(matches);
        return matches;
        // now matches has the users searched for, re-render with matchesUserComponents?
    }

    render() {
        if (!this.props.authenticated) {
            return <Redirect to='/'/>
        }

        return (
            <div>
                <Navbar/>
                <Grid container spacing={3} direction="row">
                    <Grid item xs={2}>
                        <h1>Explore</h1>        
                    </Grid>
                </Grid>
                <Divider/>
                <Grid container style={styles.grid} direction="row" justify="space-evenly" alignItems="center">
                    <div>
                        <Grid container spacing={1} style={styles.grid} direction="column" justify="space-evenly" alignItems="center">
                            <Grid item>
                                <h3>Followers</h3>
                            </Grid>
                            <Grid item>
                                <TextField
                                    size="small" 
                                    label="Search followers" 
                                    type="search" 
                                    variant="outlined"
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 13) {
                                            const query = e.target.value.trimLeft().trimRight();
                                            if (query === '') {
                                                this.setState(prevState => ({
                                                    followers: this.getFollowers(),
                                                    following: prevState.following,
                                                    suggested: prevState.suggested
                                                }));
                                            }
                                            else {
                                                this.setState(prevState => ({
                                                    followers: this.search(query, this.getFollowers()),
                                                    following: prevState.following,
                                                    suggested: prevState.suggested
                                                }));
                                            }
                                        }
                                    }} />
                            </Grid>
                            {this.state.followers.map((f) => <User user={f}/>)}
                        </Grid>
                    </div>
                    
                    {/* following  */}
                    <div>
                        <Grid container spacing={1} style={styles.grid} direction="column" justify="space-evenly" alignItems="center">
                            <Grid item>
                                <h3>Following</h3>
                            </Grid>
                            <Grid item>
                                <TextField
                                    size="small" 
                                    label="Search following" 
                                    type="search" 
                                    variant="outlined"
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 13) {
                                            const query = e.target.value.trimLeft().trimRight();
                                            if (query === '') {
                                                this.setState(prevState => ({
                                                    followers: prevState.followers,
                                                    following: this.getFollowing(),
                                                    suggested: prevState.suggested
                                                }));
                                            }
                                            else {
                                                this.setState(prevState => ({
                                                    followers: prevState.followers,
                                                    following: this.search(query, this.getFollowing()),
                                                    suggested: prevState.suggested
                                                }));
                                            }
                                        }
                                    }} />
                            </Grid>
                            {this.state.following.map((f) => <User user={f}/>)}
                        </Grid>
                    </div>

                    {/* suggested  */}
                    <div>
                        <Grid container spacing={1} style={styles.grid} direction="column" justify="space-evenly" alignItems="center">
                            <Grid item>
                                <h3>Suggested</h3>
                            </Grid>
                            <Grid item>
                                <TextField
                                    size="small" 
                                    label="Press enter to search" 
                                    type="search" 
                                    variant="outlined"
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 13) {
                                            const query = e.target.value.trimLeft().trimRight();
                                            if (query === '') {
                                                this.setState(prevState => ({
                                                    followers: prevState.followers,
                                                    following: prevState.following,
                                                    suggested: this.getSuggested()
                                                }));
                                            }
                                            else {
                                                this.setState(prevState => ({
                                                    followers: prevState.followers,
                                                    following: prevState.following,
                                                    suggested: this.search(query, this.getSuggested())
                                                }));
                                            }
                                        }
                                    }} />
                            </Grid>
                            {this.state.suggested.map((f) => <User user={f}/>)}
                        </Grid>
                    </div>
                </Grid>
            </div>      
        )

    }
}

function mapStateToProps(state) {
    const {first, last, email, username, authenticated} = state.auth;
    return {first, last, email, username, authenticated};
}

function mapDispatchToProps(dispatch) {
    return ({
        logoutUser: () => dispatch(logout())
    })
}

const ExploreConnected = connect(mapStateToProps, mapDispatchToProps)(Explore)
export default RouteProtector(ExploreConnected);