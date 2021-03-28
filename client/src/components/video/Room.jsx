import React from 'react'
import RouteProtector from "../../hoc/RouteProtector";
import {logout} from "../../slices/Authentification";
import {connect} from "react-redux";
import getVideoChatToken from '../../slices/Video'

class Room extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        const email = this.props.email;
        this.props.getVideoToken(email, 'fakename')
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const {first, last, email} = state.auth
    console.log(first)
    return {first, last, email}
}

function mapDispatchToProps(dispatch) {
    return ({
        getVideoToken: (email, room) => dispatch(getVideoChatToken(email, room))
    })
}

const RoomConnected = connect(mapStateToProps, mapDispatchToProps)(Room)
export default RouteProtector(RoomConnected);