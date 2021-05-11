import React from 'react'
import SearchBar from './SearchBar'
import {connect} from 'react-redux'
import RouteProtector from '../hoc/RouteProtector'
import {logout} from '../slices/actions/AuthenticationActions'
import {getAllPosts} from '../slices/actions/PostActions'
import {getAllUsernames} from '../slices/actions/UserActions'
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
    }

    componentDidMount() {
        this.props.getFollowingPosts(this.props.auth.username);
        this.props.getAllUsernames();
    }


    render() {
        const {authenticated} = this.props.auth
        if (!authenticated) {
            return <Redirect to='/'/>
        }
        const { allPosts } = this.props.posts
        const postElements = allPosts.map((post) => {
            return <Post key={post.postId} post={post} />
        })

        return (
            <div>
                <Navbar/>
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
    auth: state.auth,
    posts: state.posts
})

function mapDispatchToProps(dispatch) {
    return ({
        getFollowingPosts: (username) => dispatch(getAllPosts(username)),
        getAllUsernames: () => dispatch(getAllUsernames()),
    })
}

const HomeConnected = connect(mapStateToProps, mapDispatchToProps)(RouteProtector(Home))
export default HomeConnected