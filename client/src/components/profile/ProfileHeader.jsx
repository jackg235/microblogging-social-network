import React from 'react'

class ProfileHeader extends React.Component {

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
    }

    render() {
        return (
            <div>
                <p>first: {this.state.user.first_name}</p>
                <p>last: {this.state.user.last_name}</p>
                <p>username: {this.state.user.username}</p>
            </div>
        )
    }
}

export default ProfileHeader