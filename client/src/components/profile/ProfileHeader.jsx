import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import DefaultProPic from '../../default_propic.jpg'
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

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
    }

    render() {
        const {
            classes,
            profileId,
            auth: {
              authenticated,
              email,
            }
        } = this.props;

        const users = [
            {
                email: "jackgoettle23@gmail.com",
                first: "jack",
                last: "goettle",
                followers: ["ddereje7@gmail.com", "bryan@gmail.com"],
                following: ["bryan@gmail.com"],
                userImg: DefaultProPic,
                userSince: "04/09/21",
            },
            {
                email: "ddereje7@gmail.com",
                first: "Dag",
                last: "Dereje",
                followers: [],
                following: ["jackgoettle23@gmail.com"],
                userImg: DefaultProPic,
                userSince: "04/10/21",
            },
            {
                email: "bryan@gmail.com",
                first: "Bryan",
                last: "Nguyen",
                followers: ["jackgoettle23@gmail.com"],
                following: ["jackgoettle23@gmail.com"],
                userImg: DefaultProPic,
                userSince: "04/11/21",
            }
        ];
        let currUser = {
            email: "email@gmail.com",
            first: "first",
            last: "last",
            userImg: DefaultProPic,
        };
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === profileId) {
                currUser = users[i];
                break;
            }
        }

        const followButton = 
            currUser.email !== email ? (
                <Button 
                // onclick=followUser(userId)=
                >
                    {'Follow'}
                </Button>
            ) : null;

        const blockButton = 
            currUser.email !== email ? (
                <Button 
                // onclick=blockUser(userId)=
                >
                    {'Block'}
                </Button>
            ) : null;

        const changePasswordButton = 
            currUser.email === email ? (
                <Button 
                // onclick=changePassword(password)=
                >
                    {'Change Password'}
                </Button>
            ) : null;

        const deactivateButton = 
            currUser.email === email ? (
                <Button 
                // onclick=changePassword(password)=
                >
                    {'Deactivate Account'}
                </Button>
            ) : null;

        return (
            <div>
                <Card>
                    <CardMedia
                        image={currUser.userImg}
                        title="Profile image"
                        className={classes.image}
                        style={styles.image}
                    />
                    <CardContent>
                        {currUser.first} {currUser.last}
                    </CardContent>
                    <CardContent>
                        <Button
                        // onclick={showFollowers()}
                        > 
                            {currUser.followers.length} Followers
                        </Button>
                        <Button
                        // onclick={showFollowing()}
                        > 
                            {currUser.following.length} Following
                        </Button>
                    </CardContent>
                    <CardContent>
                        User Since {currUser.userSince}
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
    auth: state.auth
  });

  export default connect(mapStateToProps)(withStyles(styles)(ProfileHeader));