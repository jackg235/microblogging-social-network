import React from 'react';
import SearchBar from './SearchBar';
import {connect} from 'react-redux';
import RouteProtector from '../hoc/RouteProtector';
import {logout} from '../slices/actions/AuthenticationActions';
import {Redirect} from 'react-router-dom';
import Navbar from './Navbar';
import Post from './posts/Post';
import CreatePost from './posts/CreatePost';
import DefaultProPic from '../default_propic.jpg';
import User from './user/User';
import TextField from '@material-ui/core/TextField';
import { Divider, Grid, GridList } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = {
    grid: {
        // put some stuffs here
    }
};

class Explore extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            first: '',
            last: '',
            email: ''
        }
        this.logoutClick = this.logoutClick.bind(this)
    }

    componentDidMount() {
        // is this where we get the data for followers, following and suggested?
    }

    logoutClick() {
        this.props.logoutUser()
    }

    render() {
        const {first, last, email, authenticated} = this.props;

        const followers = [
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
        const following = null;
        const suggested = null;
        // should have mock data for followers, following, and suggested
        // but using the same data for now
        const followerComponents = followers.map((f) => <User user={f}/>)
        const followingComponents = null;
        const suggestComponents = null;


        function search(e, userArr) {
            if (e.keyCode === 13) {
                const query = e.target.value.trimLeft().trimRight();

                if (query === '') return;

                const splitQuery = query.split(' ');
                const matches = [];

                splitQuery.forEach(word => 
                    {
                        if (word !== '') {
                            userArr.forEach(user => {
                                if (user.firstName.includes(word) || user.lastName.includes(word) || user.username.includes(word)) {
                                    matches.push(user);
                                }
                            });
                        }
                    }
                );
                
                const matchesUserComponents = matches.map((user) => <User user={user}/>)
                console.log(matches);
                // now matches has the users searched for, re-render?
            }
        }
        // if (!authenticated) {
        //     return <Redirect to='/'/>
        // }

        return (
            <div>
                <Navbar/>
                <h1>Explore</h1>
                <Grid container style={styles.grid} direction="row" justify="space-evenly" alignItems="center">
                    <div>
                        <Grid container spacing={1} style={styles.grid} direction="column" justify="space-evenly" alignItems="center">
                            <Grid item>
                                <TextField onKeyDown={(e) => search(e, followers)} value={this.state.value} size="small" label="Search followers" type="search" variant="outlined" />
                            </Grid>
                            {followerComponents}
                        </Grid>
                    </div>
                    <div>
                        <Grid container spacing={1} style={styles.grid} direction="column" justify="space-evenly" alignItems="center">
                            <Grid item>
                                <TextField size="small" label="Search followers" type="search" variant="outlined" />
                            </Grid>
                            {followerComponents}
                        </Grid>
                    </div>
                    <div>
                        <Grid container spacing={1} style={styles.grid} direction="column" justify="space-evenly" alignItems="center">
                            <Grid item>
                                <TextField size="small" label="Search followers" type="search" variant="outlined" />
                            </Grid>
                            {followerComponents}
                        </Grid>
                    </div>
                </Grid>
            </div>      
        )

    }
}

export default Explore;