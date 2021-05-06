import React, {useCallback} from 'react'
import {getStreams} from "../../slices/actions/StreamActions";
import {connect} from "react-redux";
import RouteProtector from "../../hoc/RouteProtector";
import VideoChat from "./VideoChat";

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