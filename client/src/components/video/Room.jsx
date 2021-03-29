import React from 'react'
import RouteProtector from "../../hoc/RouteProtector";
import {connect} from "react-redux";
import {getVideoChatToken} from '../../slices/Video'
import Video from 'twilio-video';

class Room extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        const email = this.props.email;
        this.props.getVideoToken(email, 'fakename')
    }

    render() {
        console.log(this.state)
        console.log(this.props)
        return (
            <div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    return ({
        getVideoToken: (email, room) => dispatch(getVideoChatToken(email, room))
    })
}

const RoomConnected = connect(mapStateToProps, mapDispatchToProps)(Room)
export default RouteProtector(RoomConnected);