import React from 'react';
import Card from '@material-ui/core/Card';
import Button from 'react-bootstrap/Button';

class ChatMessage extends React.Component {

    render() {
        const author = this.props.message.state.author;


        console.log(this.props.message);
        return (
            <div>
                <Button block className="mb-4 mx-1" variant="info">
                    <p>ID: {this.props.message.sid}</p>
                    <p>Body: {this.props.message.state.body}</p>
                    <p>Author: {this.props.message.state.author}</p>
                    <p>Time: {JSON.stringify(this.props.message.state.timestamp)}</p>
                    <p>ChannelName: {this.props.message.channel.channelState.uniqueName}</p>
                </Button>
                {/* <Card className="mb-4 mx-1" raised>
                    <p>ID: {this.props.message.sid}</p>
                    <p>Body: {this.props.message.state.body}</p>
                    <p>Author: {this.props.message.state.author}</p>
                    <p>Time: {JSON.stringify(this.props.message.state.timestamp)}</p>
                    <p>ChannelName: {this.props.message.channel.channelState.uniqueName}</p>
                </Card> */}
            </div>
            
        );
    }
}

export default ChatMessage;