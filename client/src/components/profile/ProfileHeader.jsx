import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Button } from '@material-ui/core';
import DefaultProPic from '../../default_propic.jpg'

import { connect } from 'react-redux';
import ShowContacts from './ShowContacts';
import ChangePassword from './ChangePassword';

import {followToggle, blockToggle, getBlockers, getBlockedUsers, getContacts, deleteUser} from '../../slices/actions/AuthenticationActions'
import {getUser} from '../../slices/actions/UserActions'

const styles = {
    image: {
        width: 100,
        height: 100,
        display: 'inline-block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}

class ProfileHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                first_name: "Dag",
                last_name: "Dereje",
                username: "dag1",
                // other necessary user fields
            }
            // other necessary fields needed in the component
        }
        this.toggleFollow = this.toggleFollow.bind(this)
        this.toggleBlock = this.toggleBlock.bind(this)
        this.deactivateAccount = this.deactivateAccount.bind(this)
    }

    componentDidMount() {
        // this.props.getBlockers(this.props.auth.username)
        this.props.getContacts(this.props.auth.username)
        this.props.getBlockedUsers(this.props.auth.username)
    }

    toggleFollow() {
        this.props.followToggle(this.props.auth.username, this.props.currUser.username)
    }

    toggleBlock() {
        this.props.blockToggle(this.props.auth.username, this.props.currUser.username)
    }

    deactivateAccount() {
        this.props.deactivateAccount(this.props.auth.username)
    }

    render() {
        const {
            classes,
            profileId,
            auth: {
              authenticated,
              username,
              blockedBy,
              blocking,
              following,
            },
            currUser
        } = this.props;

        let followUser = following.find(user => {
            return user.username === currUser.username
        })

        const followText = 
            followUser !== undefined ? (
                'Unfollow'
            ) : 'Follow'

        const followButton = 
            currUser.username !== username && !blockedBy.includes(currUser.username) ? (
                <Button 
                onClick={() => {this.toggleFollow()}}
                >
                    {followText}
                </Button>
            ) : null;

        const blockText = 
            blocking.includes(currUser.username) ? (
                'Unblock'
            ) : 'Block'

        const blockButton = 
            currUser.username !== username ? (
                <Button 
                onClick={() => {this.toggleBlock()}}
                >
                    {blockText}
                </Button>
            ) : null;

        const changePasswordButton = 
            currUser.username === username ? (
                <ChangePassword/>
            ) : null;

        const deactivateButton = 
            currUser.username === username ? (
                <Button 
                onClick={() => {this.deactivateAccount()}}
                >
                    {'Deactivate Account'}
                </Button>
            ) : null;

        return (
            <div>
                <Card>
                    <CardMedia
                        image={DefaultProPic}
                        title="Profile image"
                        className={classes.image}
                        style={styles.image}
                    />
                    <CardContent>
                        {currUser.username}
                    </CardContent>
                    <CardContent>
                        {currUser.first} {currUser.last}
                    </CardContent>
                    <CardContent>
                        <ShowContacts followers={currUser.followers} following={currUser.following}/>
                    </CardContent>
                    <CardContent>
                        User Since {currUser.registrationDate}
                    </CardContent>
                    <CardContent>
                        {followButton}
                        {blockButton}
                        {changePasswordButton}
                        {deactivateButton}
                    </CardContent>
                </Card>
            </div>

            
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    currUser: state.users.profileUser,
});

function mapDispatchToProps(dispatch) {
    console.log('dispatching')
    return ({
        getProfile: (username) => dispatch(getUser(username)),
        followToggle: (username, otherUserId) => dispatch(followToggle(username, otherUserId)),
        blockToggle: (username, userToBlock) => dispatch(blockToggle(username, userToBlock)),
        getBlockers: (username) => dispatch(getBlockers(username)),
        getBlockedUsers: (username) => dispatch(getBlockedUsers(username)),
        getContacts: (username) => dispatch(getContacts(username)),
        deactivateAccount: (username) => dispatch(deleteUser(username)),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProfileHeader));