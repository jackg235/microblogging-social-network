import React, {useState, useCallback} from 'react'
import Lobby from './Lobby'
import Room from './Room'
import {connect} from "react-redux";
import RouteProtector from "../../hoc/RouteProtector";
import {useSelector} from 'react-redux'
import {startStream, endStream} from "../../slices/actions/StreamActions";
import VideoChatScreen from "./VideoChatScreen";

const VideoChat = () => {
    const username = useSelector(state => state.auth.username)
    const rooms = useSelector(state => state.stream.rooms)
    const [roomName, setRoomName] = useState('');
    const [token, setToken] = useState(null);

    const handleRoomNameChange = useCallback(event => {
        setRoomName(event.target.value);
    }, []);

    const handleSubmit = useCallback(async event => {
        event.preventDefault();
        const data = await fetch('/universal/token', {
            method: 'POST',
            body: JSON.stringify({
                identity: username,
                room: roomName
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
        setToken(data.token);
        // add new stream to DB
        await fetch('/streams/start', {
            method: 'PUT',
            body: JSON.stringify({
                host: username,
                roomName: roomName
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }, [username, roomName]);

    const handleLogout = useCallback(async event => {
        setToken(null);
        await fetch('/streams/end', {
            method: 'DELETE',
            body: JSON.stringify({
                user: username
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }, []);

    const handleClickRoom = useCallback(async event => {
        event.preventDefault();
        const roomName = event.target.id;
        setRoomName(roomName)
        const data = await fetch('/universal/token', {
            method: 'POST',
            body: JSON.stringify({
                identity: username,
                room: roomName
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
        setToken(data.token);
    }, []);

    const roomGenerator = () => {
        return (
            <div>
                {rooms.map((val) => (
                    <div>
                        <button onClick={handleClickRoom} id={val.roomName}>{val.roomName}</button>
                    </div>
                ))}
            </div>
        );
    };

    let render;
    if (token) {
        render = (
            <div>
                <Room roomName={roomName} token={token} handleLogout={handleLogout}/>
                <VideoChatScreen roomName={roomName} token={token} handleLogout={handleLogout}/>
            </div>

        );
    } else {
        render = (
            <div>
                <Lobby
                    username={username}
                    roomName={roomName}
                    handleRoomNameChange={handleRoomNameChange}
                    handleSubmit={handleSubmit}
                />
                <h2>Join an existing stream</h2>
                {roomGenerator()}
            </div>
        );
    }
    return render;
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const VideoChatConnected = connect(mapStateToProps)(VideoChat);
export default RouteProtector(VideoChatConnected)