import React from 'react'
import RouteProtector from '../../hoc/RouteProtector'
import {Redirect} from 'react-router-dom'
import ProfileHeader from './ProfileHeader'
import Navbar from '../Navbar'
import Post from '../posts/Post'
import {getUser, getAllUsernames} from '../../slices/actions/UserActions'
import {getUserPosts} from '../../slices/actions/PostActions'

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

        const { auth, allComments, posts } = this.props

        const postElements = posts.map((post) => {
            return <Post key={post.postId} post={post}/>
        })
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