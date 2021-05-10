import React from 'react'
import RouteProtector from '../../hoc/RouteProtector'
import {Redirect} from 'react-router-dom'
import ProfileHeader from './ProfileHeader'
import Navbar from '../Navbar'
import Post from '../posts/Post'
import {getUser} from '../../slices/actions/UserActions'
import {getUserPosts} from '../../slices/actions/PostActions'
import {getContacts, getBlockedUsers} from '../../slices/actions/AuthenticationActions'

import {connect} from 'react-redux'

class Profile extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getProfile(this.props.profileId);
        this.props.getPosts(this.props.auth.username, this.props.profileId)
        // this.props.getContacts(this.props.auth.username)
        // this.props.getBlockedUsers(this.props.auth.username)
    }

    render() {

        const { auth, allComments, posts } = this.props

        const postElements = posts.map((post) => {
            return <Post key={post.postId} post={post}/>
        })
        return (
            <div>
                <Navbar/>

                <div className={'container'}>
                    <ProfileHeader profileId={this.props.profileId}/>
                </div>
                {postElements}
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
        getBlockedUsers: (username) => dispatch(getBlockedUsers(username)),
        getContacts: (username) => dispatch(getContacts(username)),
    })
}

const ProfileConnected = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default RouteProtector(ProfileConnected)