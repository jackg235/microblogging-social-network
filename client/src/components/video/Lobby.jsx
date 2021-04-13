import React from 'react'
import {getVideoChatToken} from "../../slices/actions/VideoActions";
import RouteProtector from "../../hoc/RouteProtector";
import {connect} from "react-redux";
import Room from './Room';
import '../../static/stylesheets/Video.css'

const Video = require('twilio-video');

class Lobby extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identity: '',
            room: null
        }
        this.inputRef = React.createRef();
        this.joinRoom = this.joinRoom.bind(this);
        this.returnToLobby = this.returnToLobby.bind(this);
        this.updateIdentity = this.updateIdentity.bind(this);
        this.removePlaceholderText = this.removePlaceholderText.bind(this);
    }

    componentDidMount() {
        console.log(this.props)
        const username = this.props.auth.username;
        this.props.getVideoToken(username, 'cool-rooms')
    }

    async joinRoom() {
        try {
            const accessToken = this.props.video.token
            console.log(accessToken)
            const room = await Video.connect(accessToken, {
                name: 'cool-room',
                audio: true,
                video: true
            });

            this.setState({room: room});
        } catch (err) {
            console.log(err);
        }
    }

    returnToLobby() {
        this.setState({room: null});
    }

    removePlaceholderText() {
        this.inputRef.current.placeholder = '';
    }

    updateIdentity(event) {
        this.setState({
            identity: event.target.value
        });
    }

    render() {
        const disabled = this.state.identity === '' ? true : false;
        return (
            <div className="lobby-outer">
                {
                    this.state.room === null
                        ? <div className="lobby">
                            <input
                                value={this.state.identity}
                                onChange={this.updateIdentity}
                                ref={this.inputRef} onClick={this.removePlaceholderText}
                                placeholder="What's your name?"/>
                            <button disabled={disabled} onClick={this.joinRoom}>Join Room</button>
                        </div>
                        : <Room returnToLobby={this.returnToLobby} room={this.state.room}/>
                }
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

const LobbyConnected = connect(mapStateToProps, mapDispatchToProps)(Lobby)
export default RouteProtector(LobbyConnected);