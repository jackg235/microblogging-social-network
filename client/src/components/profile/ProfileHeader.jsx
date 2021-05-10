import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Button } from '@material-ui/core';
import DefaultProPic from '../../default_propic.jpg'
import axios from 'axios';
import { connect } from 'react-redux';
import ShowContacts from './ShowContacts';
import ChangePassword from './ChangePassword';

import {followToggle, blockToggle, getBlockers, getBlockedUsers, getContacts, deleteUser} from '../../slices/actions/AuthenticationActions'
import {getUser} from '../../slices/actions/UserActions'

const styles = {
    image: {
        width: 200,
        height: 200,
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
                username: "dag1"
                // other necessary user fields
            },
            img: ""
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

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
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
        let img = DefaultProPic;
        if (currUser.img.data != null) {
            const data = currUser.img.data.data
            const base64Flag = 'data:image/jpeg;base64,';
            const imageStr = this.arrayBufferToBase64(data);
            img = base64Flag + imageStr
        }

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
        const handleImageUpload = e => {
            e.preventDefault();
            let file = new FormData()
            const image = e.target.files[0];
            file.append('file', image)
            file.append('username', this.props.auth.username)
            file.append("name", "multer-image")
            console.log(file.get('file'))
            axios.post(`/changeProfilePicture`, file)
                .then((response) => {
                    if (response) {
                        console.log(response)
                        alert("Profile Image has been changed successfully");
                    }
                })
                .catch((err) => {
                    alert("Error while uploading image using multer");
                });
        };

        const changeImage =
            currUser.username === username ? (
                <div>
                    <br/>
                    <label htmlFor="image">Upload Profile Image: </label>
                    <input onChange={handleImageUpload} type="file"/>
                </div>
            ) : null;

        return (
            <div>
                <Card>
                    <CardMedia
                        image={img}
                        title="Profile image"
                        alt='uh oh no image!'
                        className={classes.image}
                        style={styles.image}
                    />
                    {changeImage}
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