import React from 'react'
import SearchBar from './SearchBar'
import {connect} from 'react-redux'
import RouteProtector from '../hoc/RouteProtector'
import {logout} from '../slices/actions/AuthenticationActions'
import {getAllPosts} from '../slices/actions/PostActions'
import {Redirect} from 'react-router-dom'
import Navbar from './Navbar'
import Post from './posts/Post'
import CreatePost from './posts/CreatePost';
import DefaultProPic from '../default_propic.jpg'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class Home extends React.Component {
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
        this.props.getFollowingPosts(this.props.auth.username);
    }

    logoutClick() {
        this.props.logoutUser()
    }


    render() {
        const {first, last, email, username, authenticated} = this.props.auth
        const allComments = this.props.posts.allComments
        const { allPosts } = this.props.posts

        const postElements = allPosts.map((post) => {
            const commentIds = post.comments
            let comments = []
            for (let i = 0; i < commentIds.length; i++) {
                for (let j = 0; j < allComments.length; j++) {
                    if (allComments[j]._id === commentIds[i]) {
                        comments.push(allComments[j])
                        break
                    }
                }
            }
            // console.log(comments)
            return <Post key={post.postId} post={post} postComments={comments}/>
        })

        const personalProfileLink = "/profile/" + username;

        if (!authenticated) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <Navbar/>
                <div>
                    <p>My first name is {first}</p>
                    <p>My last name is {last}</p>
                    <p>My email is {email}</p>
                    <p>My username is {username}</p>
                    <button onClick={this.logoutClick}>Click me to log out</button>
                    <Link to="/video">Click me to go to video chat</Link>
                    <Link to={personalProfileLink}>Click me to go to your own profile</Link>
                </div>

                <div>
                    <CreatePost/>
                </div>

                <div>
                    {postElements}
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    // console.log(state.auth)
    auth: state.auth,
    posts: state.posts
    // return state.auth
})

function mapDispatchToProps(dispatch) {
    return ({
        logoutUser: () => dispatch(logout()),
        getFollowingPosts: (username) => dispatch(getAllPosts(username)),
    })
}

const HomeConnected = connect(mapStateToProps, mapDispatchToProps)(Home)
export default RouteProtector(HomeConnected)