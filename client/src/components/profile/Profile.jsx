import React from 'react'
import ProfileHeader from './ProfileHeader'
import Navbar from '../Navbar'
import Post from '../posts/Post'

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
        //getProfileUser()
    }

    render() {

        // const postElements = posts.map((post) => <Post key={post.postId} post={post} />)

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

export default Profile