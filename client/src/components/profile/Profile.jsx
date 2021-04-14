import React from 'react'
import RouteProtector from '../../hoc/RouteProtector'
import {Redirect} from 'react-router-dom'
import ProfileHeader from './ProfileHeader'
import Navbar from '../Navbar'
import Post from '../posts/Post'
import {getUser} from '../../slices/actions/UserActions'

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
    }

    render() {

        const { authenticated } = this.props

        // const postElements = posts.map((post) => <Post key={post.postId} post={post} />)


        if (!authenticated) {
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

                {/* {postElements} */}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    authenticated: state.auth.authenticated
});

function mapDispatchToProps(dispatch) {
    console.log('dispatching')
    return ({
        getProfile: (username) => dispatch(getUser(username))
    })
}

const ProfileConnected = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default RouteProtector(ProfileConnected)