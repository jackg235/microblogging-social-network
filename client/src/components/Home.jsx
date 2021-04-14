import React from 'react'
import SearchBar from './SearchBar'
import {connect} from 'react-redux'
import RouteProtector from '../hoc/RouteProtector'
import {logout} from '../slices/actions/AuthenticationActions'
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
            students: ['Jack', 'Tom', 'Cantwell', 'Frankel', 'John', 'James', 'Johnnie', 'Greg'],
            first: '',
            last: '',
            email: ''
        }
        this.logoutClick = this.logoutClick.bind(this)
    }

    componentDidMount() {
        // this.props.getFollowingPosts();
    }

    logoutClick() {
        this.props.logoutUser()
    }


    render() {
        const {first, last, email, username, authenticated} = this.props
        
        const posts = [
            {
                postId: '3',
                posterId: 'jackgoettle23@gmail.com',
                first: 'jack',
                userImg: DefaultProPic,
                title: 'Goal of my Blog',
                content: 'I think Im gonna make this a sports blog',
                timestamp: '06:49pm 04/07/21',
                numLikes: 0,
                comments: [
                    {
                        commentId: '3',
                        commenterId: 'dagmawi@seas.upenn.edu',
                        postId: '3',
                        first: 'Dag',
                        userImg: DefaultProPic,
                        content: 'Go ravens!',
                        timestamp: '07:12pm 04/07/21',
                    },
                ],
            },
            {
                postId: '2',
                posterId: 'dagmawi@seas.upenn.edu',
                first: 'Dag',
                userImg: DefaultProPic,
                title: 'My Second Blog Post!',
                content: 'Im blue, da boo dee da boo da, bu da bu dee da bu da',
                timestamp: '06:30pm 04/07/21',
                numLikes: 0,
                comments: [
                    {
                        commentId: '2',
                        commenterId: 'dagmawi@seas.upenn.edu',
                        postId: '2',
                        first: 'Dag',
                        userImg: DefaultProPic,
                        content: 'Commenting on my own post!',
                        timestamp: '06:39pm 04/07/21',
                    },
                    {
                        commentId: '1',
                        commenterId: 'jackgoettle23@gmail.com',
                        postId: '2',
                        first: 'jack',
                        userImg: DefaultProPic,
                        content: 'jack is commenting on dags post',
                        timestamp: '06:35pm 04/07/21',
                    },
                ],
            },
            {
                postId: '1',
                posterId: 'jackgoettle23@gmail.com',
                first: 'jack',
                userImg: DefaultProPic,
                title: 'Jacks Blog Post',
                content: 'yoooo first post on da blog!',
                timestamp: '05:22pm 04/07/21',
                numLikes: 0,
                comments: [
                    {
                        commentId: '0',
                        commenterId: 'dagmawi@seas.upenn.edu',
                        postId: '1',
                        first: 'Dag',
                        userImg: DefaultProPic,
                        content: 'nice blog post jack!',
                        timestamp: '05:30pm 04/07/21',
                    },
                ],
            },
            {
                postId: '0',
                posterId: 'dagmawi@seas.upenn.edu',
                first: 'Dag',
                userImg: DefaultProPic,
                title: 'Welcome to my Blog Posts',
                content: 'this is where imma post stuff',
                timestamp: '03:49pm 04/07/21',
                numLikes: 0,
                comments: [],
            }
        ];

        const postElements = posts.map((post) => <Post key={post.postId} post={post} />)

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
                    <CreatePost />
                </div>

                <div>
                    {postElements}
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const {first, last, email, username} = state.auth
    console.log(first)
    return {first, last, email, username}
}

function mapDispatchToProps(dispatch) {
    return ({
        logoutUser: () => dispatch(logout())
    })
}

const HomeConnected = connect(mapStateToProps, mapDispatchToProps)(Home)
export default RouteProtector(HomeConnected)