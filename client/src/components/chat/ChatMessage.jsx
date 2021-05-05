import React from 'react';
import Card from '@material-ui/core/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const styles = {
    img: {
        "width": "80%"
    }
}

class ChatMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if (this.props.message.type === 'media') {
            this.props.message.media.getContentTemporaryUrl().then(url => {
                this.setState({ mediaurl: url });
            });
        }
    }

    convertTime = (timestamp) => {
        const [date, time] = JSON.stringify(timestamp).replace(new RegExp('\"', 'g'), '').split('T');
        const [y, m, d] = date.trim().split('-');

        const year = parseInt(y) % 2000;
        const month = parseInt(m);
        const day = parseInt(d);

        const [hr, min, ...rest] = time.split(':');

        const hour = parseInt(hr) % 12;
        const amPm = parseInt(hr) > 11 ? 'PM' : 'AM';
        return `${month}/${day}/${year} ${hour}:${min} ${amPm}`;
    };

    render() {
        // might be a media message
        const media = this.state.mediaurl !== undefined ? <img style={styles.img} src={this.state.mediaurl} alt="no pic"/> : null;

        return (
            <div>
                <Button block className="mb-4 mx-1" variant="info">
                    <Row>
                        <Col xs={8}>
                            <p style={{"text-align": "left"}}>{this.convertTime(this.props.message.state.timestamp)}</p>
                        </Col>
                        <Col>
                            <p style={{"text-align": "right"}}>Idx: {this.props.message.index}</p>
                        </Col>
                    </Row>
                    <p>Author: {this.props.message.state.author}</p>
                    <p>Body: {this.props.message.state.body}</p>
                    {media}
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