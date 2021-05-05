import React from 'react'
import RouteProtector from '../../hoc/RouteProtector'
import {Redirect} from 'react-router-dom'
import ProfileHeader from './ProfileHeader'
import Navbar from '../Navbar'
import Post from '../posts/Post'
import {getUser} from '../../slices/actions/UserActions'
import {getUserPosts} from '../../slices/actions/PostActions'

import {connect} from 'react-redux'

class Profile extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     user: {
        //         first_name: "Dag",
        //         last_name: "Dereje",
        //         username: "dag1"
        //         // other necessary user fields
        //     }
        //     // other necessary fields needed in the component
        // }
        this.handleClick = this.handleClick.bind(this)
    }

    // should have a more creative name
    handleClick() {
        // do something
    }

    componentDidMount() {
        this.props.getProfile(this.props.profileId);
        this.props.getPosts(this.props.auth.username, this.props.profileId)
    }

    // componentDidUpdate() {
    //     this.props.getPosts(this.props.profileId)
    // }

    render() {

        const { auth, allComments, posts } = this.props

        const postElements = posts.map((post) => {
            // const commentIds = post.comments
            // let comments = []
            // for (let i = 0; i < commentIds.length; i++) {
            //     for (let j = 0; j < allComments.length; j++) {
            //         if (allComments[j]._id === commentIds[i]) {
            //             comments.push(allComments[j])
            //             break
            //         }
            //     }
            // }

            return <Post key={post.postId} post={post}
            //  postComments={comments} 
             />
        })

        if (!auth.authenticated) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <Navbar/>

                <div className={'container'}>
                    <ProfileHeader profileId={this.props.profileId}/>
                    {/* Other stuff. mix of HTML and more react components.
                    <button onClick={this.handleClick}>Click me to do something</button> */}
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
    console.log('dispatching')
    return ({
        getProfile: (username) => dispatch(getUser(username)),
        getPosts: (username, profileUsername) => dispatch(getUserPosts(username, profileUsername))
    })
}

const ProfileConnected = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default RouteProtector(ProfileConnected)