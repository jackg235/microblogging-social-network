import React, {useCallback} from 'react'
import {getStreams} from "../../slices/actions/StreamActions";
import {connect} from "react-redux";
import RouteProtector from "../../hoc/RouteProtector";
import VideoChat from "./VideoChat";
import Navbar from "../Navbar";

class VideoWrapper extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.getRooms()
    }


    render() {
        return (
            <div>
                <Navbar/>
                <VideoChat/>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    rooms: state.stream.rooms
})


function mapDispatchToProps(dispatch) {
    return ({
        getRooms: () => dispatch(getStreams()),
    })
}

const VideoConnected = connect(mapStateToProps, mapDispatchToProps)(VideoWrapper)
export default RouteProtector(VideoConnected)