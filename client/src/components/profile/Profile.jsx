import React from 'react'
import RouteProtector from '../../hoc/RouteProtector'
import {Redirect} from 'react-router-dom'
import ProfileHeader from './ProfileHeader'
import Navbar from '../Navbar'
import Post from '../posts/Post'
import {getUser, getAllUsernames} from '../../slices/actions/UserActions'
import {getUserPosts} from '../../slices/actions/PostActions'
import Typography from '@material-ui/core/Typography';

import {connect} from 'react-redux'

class Profile extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getProfile(this.props.profileId);
        this.props.getPosts(this.props.auth.username, this.props.profileId)
        this.props.getAllUsernames();
    }

    render() {

        const { auth, allComments, posts, currUser } = this.props

        const postElements = !currUser.deactivated ? (
            posts.map((post) => {
                return <Post key={post.postId} post={post}/>
            })
        ) : null

        const deactivatedWarning = currUser.deactivated ? (
            <Typography variant="h2">{"This user has deactivated their account!"}</Typography>
        ) : null

        if (!auth.authenticated) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <Navbar/>

                <div className={'container'}>
                    <ProfileHeader profileId={this.props.profileId}/>
                </div>
                {postElements}
                {deactivatedWarning}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    currUser: state.users.profileUser,
    posts: state.posts.profileUserPosts,
    allComments: state.posts.allComments
});

function mapDispatchToProps(dispatch) {
    return ({
        getProfile: (username) => dispatch(getUser(username)),
        getPosts: (username, profileUsername) => dispatch(getUserPosts(username, profileUsername)),
        getAllUsernames: () => dispatch(getAllUsernames()),
    })
}

const ProfileConnected = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default RouteProtector(ProfileConnected)