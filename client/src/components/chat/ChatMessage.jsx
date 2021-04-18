import React from 'react';
import Card from '@material-ui/core/Card';

class ChatMessage extends React.Component {

    render() {
        // console.log(this.props.message);
        return (
            <Card className="mb-2 mx-2" raised>
                <p>ID: {this.props.message.sid}</p>
                <p>Body: {this.props.message.state.body}</p>
                <p>Author: {this.props.message.state.author}</p>
                <p>Time: {JSON.stringify(this.props.message.state.timestamp)}</p>
                <p>ChannelName: {this.props.message.channel.channelState.uniqueName}</p>
            </Card>
        );
    }
}

export default ChatMessage;