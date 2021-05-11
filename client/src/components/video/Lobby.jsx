import React from 'react';

const Lobby = ({
                   roomName,
                   handleRoomNameChange,
                   handleSubmit
               }) => {
    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a new stream</h2>

            <div>
                <label htmlFor="room">Room name:</label>
                <input
                    type="text"
                    id="room"
                    value={roomName}
                    onChange={handleRoomNameChange}
                    required
                />
            </div>

            <button type="submit">Create</button>
        </form>
    );
};

export default Lobby;