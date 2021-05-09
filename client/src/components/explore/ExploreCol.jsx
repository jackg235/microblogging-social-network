import React from 'react';
import {logout} from '../../slices/actions/AuthenticationActions';
import {Redirect} from 'react-router-dom';
import Navbar from '../Navbar';
import DefaultProPic from '../../default_propic.jpg';
import User from '../user/User';
import TextField from '@material-ui/core/TextField';
import { Divider, Grid } from '@material-ui/core';

import {connect} from 'react-redux';

class ExploreCol extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: this.props.users,
        }
    }

    search(splitQuery) {
        const matches = [];

        splitQuery.forEach(word => 
            {
                if (word !== '' && !Number.isInteger(parseInt(word))) {
                    this.props.original.forEach(user => {
                        if (user.firstName.toLowerCase().includes(word) || user.lastName.toLowerCase().includes(word) || user.username.toLowerCase().includes(word)) {
                            if (!matches.includes(user)) {
                                matches.push(user);
                            }
                        }
                    });
                }
            }
        );
        return matches;
    }

    submit(event) {
        const query = event.target.value.trimLeft().trimRight().toLowerCase();
        if (query === '') {
            this.setState({ users: this.props.original });
        }
        else {
            this.setState({ users: this.search(query.split(' ')) });
        }
    }

    componentDidMount() {
        // if (this.props.colType === 'followers') {
        //     this.setState({
        //         users: this.props.auth.followers
        //     })
        //     console.log('set followers')
        // } else if (this.props.colType === 'following') {
        //     this.setState({
        //         users: this.props.auth.following
        //     })
        // } else if (this.props.colType === 'suggested') {
        //     this.setState({
        //         users: []
        //     })
        // }
    }

    render() {

        const { auth } = this.props

        const userList = 
            this.props.type === 'followers' ? (
                <Grid>
                    {auth.followers.map((user) => <User username={user.username}/>)}
                </Grid>
            ) : this.props.type === 'following' ? (
                <Grid>
                    {auth.following.map((user) => <User username={user.username}/>)}
                </Grid>
            ) : <Grid>
                    {[]}
                </Grid>;

        return (
            <div>
                <Grid container spacing={1} direction="column" justify="space-evenly" alignItems="stretch">
                    <Grid item>
                        <h3>{`${this.props.type.charAt(0).toUpperCase() + this.props.type.slice(1)}`}</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            size="small"
                            label={`Search ${this.props.type}`}
                            type="search" 
                            variant="outlined"
                            onChange={(e) => this.submit(e)} />
                    </Grid>
                    {/* <Grid>
                        {auth.followers.map((username) => <User username={username}/>)}
                    </Grid> */}
                    {userList}
                </Grid>
            </div>  
        )

    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(ExploreCol);