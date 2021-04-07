import React from 'react'
import SearchBar from './SearchBar'
import {connect} from 'react-redux'
import RouteProtector from '../hoc/RouteProtector'
import {logout} from '../slices/actions/AuthenticationActions'
import {Redirect} from 'react-router-dom'
import Navbar from './Navbar'
import Post from './posts/Post'
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
        // this.props.getAllPosts();
    }

    logoutClick() {
        this.props.logoutUser()
    }


    render() {
        const {first, last, email, authenticated} = this.props
        
        const posts = [
            {
                postId: '0',
                posterId: 'Dag',
                title: 'My First Blog Post!',
                content: 'content of my first blog post',
                timestamp: '03:49pm 04/07/21',
                likes: 0,
                comments: 0,
            },
            {
                postId: '1',
                posterId: 'Jack',
                title: 'Jacks Blog Post',
                content: 'yoooo first post on da blog!',
                timestamp: '05:22pm 04/07/21',
                likes: 0,
                comments: 0,
            },
            {
                postId: '2',
                posterId: 'Bryan',
                title: 'Welcome to my Blog Posts',
                content: 'this is where imma post stuff',
                timestamp: '06:30pm 04/08/21',
                likes: 0,
                comments: 0,
            }
        ];

        const postElements = posts.map((post) => <Post key={post.postId} post={post} />)

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
                    <button onClick={this.logoutClick}>Click me to log out</button>
                    <Link to="/video">Click me to go to video chat</Link>
                    <Link to="/profile">Click me to go to profile</Link>
                </div>

                <div>
                    {postElements}
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const {first, last, email} = state.auth
    console.log(first)
    return {first, last, email}
}

function mapDispatchToProps(dispatch) {
    return ({
        logoutUser: () => dispatch(logout())
    })
}

const HomeConnected = connect(mapStateToProps, mapDispatchToProps)(Home)
export default RouteProtector(HomeConnected)