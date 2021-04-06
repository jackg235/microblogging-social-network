import React from 'react'
import ProfileHeader from './ProfileHeader'

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                first_name: "Dag",
                last_name: "Dereje",
                username: "dag1"
                // other necessary user fields
            }
            // other necessary fields needed in the component
        }
        this.handleClick = this.handleClick.bind(this)
    }

    // should have a more creative name
    handleClick() {
        // do something
    }

    render() {
        return (
            <div>
                <div className={'container'}>
                    <ProfileHeader/>
                    Other stuff. mix of HTML and more react components
                    <button onClick={this.handleClick}>Click me to do something</button>
                </div>
            </div>
        )
    }
}

export default Profile